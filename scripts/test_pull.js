const http = require('http');
const https = require('https');

const email = 'real@acme.com';
const password = 'pasword123';

https.get({
    hostname: 'https://screeps.com/',
    //hostname: 'screeps.newbieland.net',
   // port: 443,
    //port: 21025,
    path: 'api/user/code?_token=27cf3e7d-6b2a-4ee6-9a2a-e930acb457cf',
    method: 'GET',
    //auth: email + ':' + password,
    /* headers: {
         'Content-Type': 'application/json; charset=utf-8'
     }*/
}, (resp) => {

    resp.on('end', () => {
        console.log("All data received.");
        let response = JSON.parse(rawData);
        console.log("code:",Object.keys(response));
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});