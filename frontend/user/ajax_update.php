<?php
require_once '../dbcon.php';
$correct = secureStr($_GET['correct']);
$incorrect = secureStr($_GET['incorrect']);
$query = "UPDATE users SET correct = correct + '{$correct}', incorrect = incorrect + '{$incorrect}' WHERE id='{$user->id}'";
$db->query($query);
?>