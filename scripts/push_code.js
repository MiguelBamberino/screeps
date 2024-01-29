
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');


function pushCodeToServer(){

    const path = './scripts/servers.json';

    if(!process.argv || process.argv.length<3){
        console.log("ERROR: arg 1 must be a push location, such as mmo|swc|season...");
        return;
    }
    if (!fs.existsSync(path)) {
        console.log('ERROR: server config does not exist at /scripts/servers.json');
        return;
    }
    let servers={};
    try{

        let json = fs.readFileSync(path,'utf8');
        servers = JSON.parse(json);
    }catch (e) {
        console.log("ERROR: parsing config file from json.")
        return;
    }
        let serverRef = process.argv[2];
        let config = servers[ serverRef ];
        let branch = process.argv[3]?process.argv[3]:'default';
        let apiPath = config.path?config.path:'/api/user/code'
        console.log("-------------------------------------------");
        console.log("Server:",serverRef);
        console.log("host:",config.hostname,"port:",config.port);
        console.log("path:",apiPath);
        console.log("branch:",branch);
        if(config.token)
            console.log("Auth: with token");
        else
            console.log("Auth: email + password");
        console.log("-------------------------------------------");
        let data = {
                branch: branch,
                modules: buildModuleObject()
            };
        let serverConfFilePath = './serverConfigs/'+serverRef+'.js';
        //console.log(data)
    try{
        data.modules['_server_config'] = fs.readFileSync(serverConfFilePath,'utf8');
    }catch (e){
        console.error("ERROR: no _server_config file for ",serverRef," at ",serverConfFilePath)
        return;
    }
    console.log("-------------------------------------------");
        let options = {
            hostname: config.hostname,
            port: config.port,
            path: apiPath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
        if(config.token){
            //options.path += config.token;
            options.headers['X-Token'] = config.token;
        }else{
            options.auth= config.email + ':' + config.password;
        }

        console.log("SENDING....");
        //return;
        const proto = config.protocol==='http' ? http : https;
        let req = https.request(options, function(res) {
            res.setEncoding('utf8');
            console.log("Response Code:",res.statusCode);

            if(res.statusCode < 200 || res.statusCode >= 300) {
                console.error('Screeps server returned error code ' + res.statusCode);
                return;
            }
            res.on('data', (d) => {
                process.stdout.write(d);
            });

        });
        // Handle request error
        req.on('error', (error) => {
            console.error(error);
        });
        req.write(JSON.stringify(data));
        req.end();

        console.log("-------------------------------------------");





}


pushCodeToServer();
function buildModuleObject(){
    let directoryPath = './src'
    let modules = {};
    try {
        const files = fs.readdirSync(directoryPath);
        console.log("Reading : ",directoryPath,"...")
        files.forEach(fileName => {
            let filePath =  path.join(directoryPath, fileName)
            try {
                let modeName = fileName.replace('.js','')
                modules[modeName] = fs.readFileSync(filePath,'utf8');
                console.log(fileName,'... \x1b[32m','Read', '\x1b[0m');
            } catch (err) {
                console.error(fileName,'... \x1b[31m','Error:', '\x1b[0m',err);
            }

        });
    } catch (err) {
        console.error('ERROR: reading directory:',directoryPath, err);
        return false;
    }
    return modules;
}