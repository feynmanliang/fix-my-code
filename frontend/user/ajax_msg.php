<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../dbcon.php';

$result = $db->query("SELECT * FROM msg");

$out = "";
while($fetch = $result->fetch_object()) {
  if ($out != "") $out .= ",";

  $out .= '{"Input":"'  . $fetch->input . '",';
  $out .= '"Output":"'  . $fetch->output . '"}';
}
$out ='{"records":['.$out.']}';

echo($out);
?> 