<?php

use GuzzleHttp\Utils;

include __DIR__."/vendor/autoload.php";

$client = new \GuzzleHttp\Client();
$options = [
    'headers' => ['Accept' => 'application/json','Content-Type'=>'application/json'],
    'query' => ['_token'=>'c8bb2547-cb51-4f0a-b475-213cd12c3705'],
];




$files = scandir("src");
$data = ["branch"=>"V19.1","modules"=>[]];
$fileData=[];
if(is_array($files)) {
    echo "======================\n";
    echo "Building Post Data... \n";
    echo "======================\n";
    echo "reading \e[36m" . count($files) . "\e[0m files ...";
    foreach ($files as $filename) {
        $diskName = 'src/'.$filename;
        $keyName = str_replace('.js','',$filename);
        if ($filename == '.' || $filename == '..') continue;
        echo "reading $diskName >> $keyName ...";
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
    echo "sending...\n";
    //return;
    //$options['body']='{"branch":"V18.5","modules":{"main":"require(\"hello\");","hello":"console.log(\"Hello World!\");"}}';
    $options['body'] = Utils::jsonEncode($data);
   // $options['json'] = $data;
   // $request = new \GuzzleHttp\Psr7\Request('POST', 'https://screeps.com/api/user/code');
  // var_dump($data);
  // return;
    $response = $client->post('https://screeps.com/api/user/code',$options);
    echo "Response code: ".$response->getStatusCode()."\n";
    $body = Utils::jsonDecode($response->getBody(), true);
    echo "Body: ".print_r($body,true)."\n";
    echo "======================\n";
}else{
    echo "<< No code in src to push >>\n";
}