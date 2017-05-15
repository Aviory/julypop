<?php
require_once 'config.php';

$from_query;
$from_category;
$from_podcategory;
$exec_array;
$sql_query = "SELECT * FROM recipes ";

if(isset($_POST['from_query'])){
    $from_query = $_POST['from_query'];
}
if(isset($_POST['from_category'])){
    $from_category = $_POST['from_category'];
    if($from_category!="по всему сайту"){
        if(isset($_POST['from_podcategory'])){
            $from_podcategory = $_POST['from_podcategory'];
            if($from_podcategory != "все подкатегории"){
                $sql_query .= "WHERE podcategory = :from_podcategory ";
                $exec_array = array(':from_query' => '%'.$from_query.'%', ':from_podcategory' => $from_podcategory);
            }
            else{
                $sql_query .= "WHERE category = :from_category ";
                $exec_array = array(':from_query' => '%'.$from_query.'%', ':from_category' => $from_category);
            }
        }
        else{
            $sql_query .= "WHERE category = :from_category ";
            $exec_array = array(':from_query' => '%'.$from_query.'%', ':from_category' => $from_category);
        }
    }
    else{
        $exec_array = array(':from_query' => '%'.$from_query.'%');
    }
}

if(isset($_POST['form_objectSelect'])){
    if($from_category == "по всему сайту"){
        $sql_query .= "WHERE ";
    }
    else{
        $sql_query .= "AND ";
    }
    $form_objectSelect = $_POST['form_objectSelect'];
    if($form_objectSelect == "from_name"){
        $sql_query .= "rec_name LIKE :from_query";
    }
    if($form_objectSelect == "from_ingridient"){
        $sql_query .= "ingridients LIKE :from_query";
    }
}

$stmt = $pdo->prepare($sql_query);
$stmt->execute($exec_array);
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
