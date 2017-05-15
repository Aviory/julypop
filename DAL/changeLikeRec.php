<?php
require_once 'config.php';
require_once 'objrecipe.php';

$id;
$check;
if(isset($_POST['id'])){
    $id = $_POST['id'];
}
if(isset($_POST['check'])){
    $check= $_POST['check'];
}

$stmt = $pdo->prepare("UPDATE recipes SET liked = :checked where id = :id");
$stmt->execute(array(':id' => $id, ':checked' => $check));
$stmt = null;
$pdo = null;