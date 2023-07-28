<?php

use GuzzleHttp\Utils;

include __DIR__."/vendor/autoload.php";

$client = new \GuzzleHttp\Client(['base_uri' => 'https://screeps.com/season/', 'http_errors' => false]);
$options = [
   // 'headers' => ['Accept' => 'application/json'],
    'query' => ['_token'=>'c8bb2547-cb51-4f0a-b475-213cd12c3705'],
    //'form_params' => $this->postData,
];

$response = $client->get('api/user/code',$options);
$data = Utils::jsonDecode($response->getBody(), true);
var_dump(array_keys($data));
if(is_array($data)){
    echo "======================\n";
    echo "Connection: Success \n";
    echo "======================\n";
    $oldFiles = scandir("src");
    echo "deleting \e[36m".count($oldFiles)."\e[0m old files ...";
    foreach ($oldFiles as $filename){
        if($filename=='.' || $filename=='..')continue;
        echo "deleting $filename ...";
        unlink("src/".$filename);
        if(!file_exists("src/".$filename.".js")){
            echo "\e[32msuccess\e[0m \n";
        }else{
            echo "\e[31mfailed\e[0m \n";
        }
    }
    echo "======================\n";
    echo "Branch name: [ ".$data['branch']." ] \n";
    echo "======================\n";
    echo "saving \e[36m".count($data['modules'] )."\e[0m new files ...";
    foreach ($data['modules'] as $filename=>$file_contents) {
        echo "writing $filename ...";
        if ($file_contents){
            file_put_contents("src/" . $filename . ".js", $file_contents);
            if(file_exists("src/".$filename.".js")){
                echo "\e[32m success\e[0m \n";
            }else{
                echo "\e[31m failed\e[0m \n";
            }
        }else{
            echo "\e[33m empty\e[0m \n";
        }

    }
    echo "======================\n";
}