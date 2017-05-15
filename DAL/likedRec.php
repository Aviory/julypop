<?php
require_once 'config.php';
$stmt = $pdo->query('SELECT * FROM recipes where liked="true"');
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
$stmt = null;
$pdo = null;