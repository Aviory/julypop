<?php
require_once 'config.php';
if(isset($_POST['podcategoryes'])){
    $podcateg = $_POST['podcategoryes'];
    $stmt = $pdo->prepare('SELECT * FROM recipes WHERE podcategory = :podcategoryes');
    $stmt->execute(array(':podcategoryes' => $podcateg));
}
if(isset($_POST['categoryes'])){
    $categ = $_POST['categoryes'];
    $stmt = $pdo->prepare('SELECT * FROM recipes WHERE category = :categoryes');
    $stmt->execute(array(':categoryes' => $categ));
}
$reclist = array();
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
    $reclist[] = $rec;
}
echo json_encode($reclist);
//echo $row['name'] . "<br>" ;
$stmt = null;
$pdo = null;
?>