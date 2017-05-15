<?php
require_once 'config.php';
require_once 'objrecipe.php';

if(isset($_POST['id'])){
    $id = $_POST['id'];
}

$stmt = $pdo->prepare('SELECT * FROM recipes WHERE id = :id');
$stmt->execute(array(':id' => $id));
while ($row = $stmt->fetch())
{
    $rec              = array(
        "id"          => $row['id'],
        "name"        => $row['rec_name'],
        "category"    => $row['category'],
        "podcategory" => $row['podcategory'],
        "ingridients" => $row['ingridients'],
        "cooking"     => $row['cooking'],
        "image"       => $row['image'],
        "liked"       => $row['liked'],
        "raiting"     => $row['raiting']
    );
}
$stmt = null;
$pdo = null;

echo json_encode($rec);
