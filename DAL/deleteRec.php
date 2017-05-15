<?php
require_once 'config.php';
require_once 'objrecipe.php';

$rec = new recipe();
if(isset($_POST['id'])){
    $rec->id = $_POST['id'];
}

$stmt = $pdo->prepare('SELECT category, podcategory FROM recipes WHERE id = :id');
$stmt->execute(array(':id' => $rec->id));
while ($row = $stmt->fetch())
{
    $rec->category = $row['category'];
    $rec->podcategory = $row['podcategory'];
}//добавить удаление картинки --------------------------------------

$stmt = $pdo->prepare("DELETE FROM recipes WHERE id = :id");
$stmt->execute(array(':id' => $rec->id));

$stmt = null;
$pdo = null;

if ($rec->podcategory != ""){
    echo "podcategoryes=".$rec->podcategory;
}
else{
    echo "categoryes=".$rec->category;
}