<?php
require_once 'config.php';
require_once 'objrecipe.php';

$rec = new recipe();

if(isset($_POST['id'])){
    $rec->id = $_POST['id'];
}
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
$rec->image = "";
if(isset($_POST['images'])){
    $rec->image .= "\n\r";
}
$uploadsdir = "/xampp/htdocs/git/Jul/res/";
foreach ($_FILES["images"]["error"] as $key => $error){
    if ($error == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["images"]["tmp_name"][$key];
        $size = $_FILES["images"]["size"][$key];
        $name = $_FILES["images"]["name"][$key];
        copy($tmp_name, $uploadsdir . $size ."_julypop.jpg");
        $rec->image .= "res/" .$size ."_julypop.jpg"."\n\r";
    }
}

$stmt = $pdo->prepare("UPDATE recipes SET rec_name = :rec_name, category = :category, podcategory = :podcategory, ingridients = :ingridients, cooking = :cooking, image = CONCAT(image, :image)  where id = :id");
$stmt->execute(array(':id' => $rec->id, ':rec_name' => $rec->rec_name, ':category'=>$rec->category, ':podcategory' => $rec->podcategory, ':ingridients' =>$rec->ingridients, ':cooking'=>$rec->cooking, ':image' => $rec->image));
$stmt = null;
$pdo = null;

header('Location: http://julypop.pp.ua/'); exit;