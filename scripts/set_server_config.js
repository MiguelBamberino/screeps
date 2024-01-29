const fs = require('fs');
const path = require('path');

function copyServerConfig(){

    if(!process.argv || process.argv.length<3){
        console.log("ERROR: arg 1 must be a server name, such as mmo|swc|season...");
        return;
    }
    let serverRef = process.argv[2];
    let serverConfFilePath = './serverConfigs/'+serverRef+'.js';
    if (!fs.existsSync(serverConfFilePath)) {
        console.error("ERROR: no _server_config file for ",serverRef," at ",serverConfFilePath)
        return;
    }

    try{
        console.log('---------------------------------------------')
        if (fs.existsSync('./src/_server_config.js')) {
            console.log("File exists. Deleting old file...")
            fs.unlinkSync('./src/_server_config.js');
        }
        console.log("Reading template file...")
        let configFileCode = fs.readFileSync(serverConfFilePath,'utf8');
        console.log("Writing new config file...")
        fs.writeFileSync('./src/_server_config.js', configFileCode);
        console.log("DONE")
        console.log('---------------------------------------------')
    }catch (e){
        console.error("ERROR: failed to write new config from ",serverConfFilePath)
        return;
    }
}
copyServerConfig();