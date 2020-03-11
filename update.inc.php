<?php

require "smapi.php";
global $_G;

$lastname = $_FILES['smfile']['tmp_name'];
$path = './smms_imglist/'.$_FILES['smfile']['name'];

mkdir ('./smms_imglist/',0777,true);
copy($lastname,$path);
unlink($lastname);

$auth = $_G["cache"]["plugin"]["smms_image"]["secret"];
$smapi = new SMApi($auth);
$result = $smapi->Upload($path);

if($result["code"] == "image_repeated"){
    $result['data']['url'] = $result["images"];
}

header('Content-Type:application/json; charset=utf-8');
echo json_encode($result);

?>