<?php
/**
 * Created by PhpStorm.
 * User: Кудесник
 * Date: 22.05.2016
 * Time: 12:51
 */
require_once 'config.php';
$stmt = $pdo->query('SELECT * FROM julypop_data_broad WHERE id = 1');
while ($row = $stmt->fetch())
{
    $img = $row['img'];
}
echo $img;

$stmt = null;
$pdo = null;