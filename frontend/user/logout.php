<?php
include '../dbcon.php';

if (!isset($_SESSION['id'])) {
  header ("Location: index.php");
  die();
}

session_destroy();
echo 'You have successfully logged out.<meta http-equiv="refresh" content="1;url=../index">';
?>