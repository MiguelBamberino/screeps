const https = require('https');
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
                console.log(Object.keys(response));


    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});