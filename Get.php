<?php
header("Content-type:application/json");
$myfile = fopen("output.txt", "r") or die("Unable to open file!");
$var = fread($myfile,filesize("test.txt"));
$arr = json_decode($var, true);
$array = [];

for ($i=0; $i < 10; $i++) { 
    $rand = rand(0, sizeof($arr)-1);
    array_push($array, $arr[$rand]);
    
}

echo json_encode($array);

fclose($myfile);

?>

