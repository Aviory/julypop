<?php
require_once 'config.php';

if(isset($_POST['day'])){
    $day = $_POST['day'];
}
if(isset($_POST['month'])){
    $month = $_POST['month'];
}
if(isset($_POST['year'])){
    $year = $_POST['year'];
}
if(isset($_POST['h'])){
    $h = $_POST['h'];
}
if(isset($_POST['m'])){
    $m = $_POST['m'];
}
if(isset($_POST['s'])){
    $s = $_POST['s'];
}

$stmt = $pdo->prepare("UPDATE julypop_date_update SET day = :day, month = :month, year = :year, h = :h, m = :m, s = :s where dates = dates");
$stmt->execute(array(':day' => $day, ':month' => $month, ':year'=>$year, ':h'=>$h, ':m' => $m, ':s' =>$s));
$stmt = null;
$pdo = null;
