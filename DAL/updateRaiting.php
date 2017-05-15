<?php
require_once 'config.php';
require_once 'objrecipe.php';

$id;
$rait;
if(isset($_POST['id'])){
    $id = $_POST['id'];
}
if(isset($_POST['rait'])){
    $rait= $_POST['rait'];
}

$stmt = $pdo->prepare("UPDATE recipes SET raiting = :checked where id = :id");
$stmt->execute(array(':id' => $id, ':checked' => $rait));
$stmt = null;
$pdo = null;