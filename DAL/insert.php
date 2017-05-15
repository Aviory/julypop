<?php
require_once 'config.php';
require_once 'objrecipe.php';
$rec = new recipe();
if(isset($_POST['recname'])){
    $rec->rec_name = $_POST['recname'];
}
if(isset($_POST['categoryes'])){
    $rec->category = $_POST['categoryes'];
}
if(isset($_POST['podcategoryes'])){
    $rec->podcategory = $_POST['podcategoryes'];
}
if(isset($_POST['ingridients'])){
    $rec->ingridients = $_POST['ingridients'];
}
if(isset($_POST['cookings'])){
    $rec->cooking = $_POST['cookings'];
}
$uploadsdir = "/home/julypop/web/julypop.pp.ua/public_html/res/";
foreach ($_FILES["images"]["error"] as $key => $error){
    if ($error == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["images"]["tmp_name"][$key];
        $size = $_FILES["images"]["size"][$key];
        $name = $_FILES["images"]["name"][$key];
        move_uploaded_file($tmp_name, $uploadsdir . $size ."_julypop.jpg");
        $rec->image .= "res/" .$size ."_julypop.jpg"."\n\r";
    }
}

$stmt = $pdo->prepare("INSERT into recipes (rec_name, category, podcategory, ingridients, cooking, image) VALUES (:rec_name, :category, :podcategory, :ingridients, :cooking, :image)");
$stmt->execute(array(':rec_name' => $rec->rec_name, ':category'=>$rec->category, ':podcategory' => $rec->podcategory, ':ingridients' =>$rec->ingridients, ':cooking'=>$rec->cooking, ':image' => $rec->image));
$stmt = null;
$pdo = null;

header('Location: http://julypop.pp.ua/'); exit;