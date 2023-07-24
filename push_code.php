<?php

use GuzzleHttp\Utils;

include __DIR__."/vendor/autoload.php";

$client = new \GuzzleHttp\Client(['base_uri' => 'https://screeps.com/', 'http_errors' => false]);
$options = [
   // 'headers' => ['Accept' => 'application/json'],
    'query' => ['_token'=>'c8bb2547-cb51-4f0a-b475-213cd12c3705'],
    //'form_params' => $this->postData,
];

$response = $client->get('api/user/code',$options);
$data = Utils::jsonDecode($response->getBody(), true);


$files = scandir("src");
$data = ["branch"=>"18.5","modules"=>[]];
$fileData=[];
if(is_array($files)) {
    echo "======================\n";
    echo "Building Post Data... \n";
    echo "======================\n";
    echo "reading \e[36m" . count($files) . "\e[0m files ...";
    foreach ($files as $filename) {
        $diskName = 'src/'.$filename;
        $keyName = str_replace($diskName,'.js','');
        if ($filename == '.' || $filename == '..') continue;
        echo "reading $diskName ...";
        $data['modules'][ $keyName ] = file_get_contents($diskName);
        if ($data['modules'][ $keyName ]) {
            echo "\e[32msuccess\e[0m \n";
        } else {
            echo "\e[31mfailed\e[0m \n";
        }
    }
    echo "======================\n";
    echo "Branch name: [ " . $data['branch'] . " ] \n";
    echo "======================\n";
    echo "saving \e[36m" . count($data['modules']) . "\e[0m new files ...";
    foreach ($data['modules'] as $filename => $file_contents) {
        echo "writing $filename ...";
        file_put_contents("src/" . $filename . ".js", $file_contents);
        if (file_exists("src/" . $filename . ".js")) {
            echo "\e[32msuccess\e[0m \n";
        } else {
            echo "\e[31mfailed\e[0m \n";
        }
    }
    echo "======================\n";
}else{
    echo "<< No code in src to push >>\n";
}