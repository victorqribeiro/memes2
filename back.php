<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$url = "https://www.memedroid.com";

if (isset($_GET['ts']) && is_numeric($_GET['ts']))
  $url .= "/memes/latest?ts=".$_GET['ts'];

$data = file_get_contents($url);

echo json_encode($data);

