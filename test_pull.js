const https = require('https');
const fs = require('fs');
const path = require('path');

https.get('https://screeps.com/api/user/code?_token=c8bb2547-cb51-4f0a-b475-213cd12c3705', (resp) => {
    let rawData = '';
    process.stdout.write("Receiving chunk")
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        process.stdout.write(".")
        rawData += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log("All data received.");
        let response = JSON.parse(rawData);
        if(response['ok']===undefined){ console.error("ERROR: Could not JSON.parse() response."); return}
        if(!response['ok']){ console.error("ERROR: response->OK = false"); return}
        if(response['branch']===undefined){ console.error("ERROR: response->branch = undefined"); return}
        if(response['modules']===undefined){ console.error("ERROR: response->modules = undefined"); return}

        console.log("Branch:",response.branch);
        console.log("Files:",Object.keys(response.modules).length);
        console.log("--------------------------------")
        console.log("Deleting old files...")
        deleteExistingFiles(path.join(__dirname, 'src'))
        console.log("--------------------------------")
        console.log("Saving new files...")
        for(let fileName in response.modules){
            writeNewFile(path.join(__dirname, 'src'),fileName+'.js',response.modules[fileName])
        }




    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
function writeNewFile(directoryPath,fileName,content){
    let filePath =  path.join(directoryPath, fileName)
    try {
        fs.writeFileSync(filePath, content);
        console.log(fileName,'... \x1b[32m','Written', '\x1b[0m');
    } catch (err) {
        console.error(fileName,'... \x1b[31m','Error:', '\x1b[0m',err);
    }
}
function deleteExistingFiles(directoryPath){

    try {
        const files = fs.readdirSync(directoryPath);
        files.forEach(fileName => {
            let filePath =  path.join(directoryPath, fileName)
            try {
                fs.unlinkSync(filePath);
                console.log(fileName,'... \x1b[32m','deleted', '\x1b[0m');
            } catch (err) {
                console.error(fileName,'... \x1b[31m','Error:', '\x1b[0m',err);
            }

        });
    } catch (err) {
        console.error('Error reading directory', err);
    }


}