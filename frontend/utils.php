<?php
function isValidEmail($email) {
  return !filter_var($email, FILTER_VALIDATE_EMAIL) === false;
}

function isStrLenCorrect($string, $min, $max) {
  $len = mb_strlen($string);
  return $len >= $min && $len <= $max;
}

// Password encryption
/*$options = array(
    'salt' => "a93d92454321l3p09o6009"
);*/
function hashPass($pass) {
  //password_hash uses a random salt, so no need to set one
  return password_hash($pass, PASSWORD_BCRYPT);
}

//ekko is echo but supports undeclared variables
function ekko(&$str) {
  if (!isset($str)) echo "";
  echo $str;
}

function setAndEquals(&$a, &$b) {
  return isset($a) && isset($b) && $a == $b;
}

//bootstrap functions
function errorMessage($msg) {
  return "<div class='alert alert-danger' role='alert'>{$msg}</div>";
}

function successMessage($msg) {
  return "<div class='alert alert-success' role='alert'>{$msg}</div>";
}
?>