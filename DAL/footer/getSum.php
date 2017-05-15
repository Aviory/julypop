<?php
require_once 'config.php';
$stmt = $pdo->query('SELECT COUNT(*) as col FROM recipes');

while ($row = $stmt->fetch())
{
    $col  = $row['col'];
}

echo $col;
$stmt = null;
$pdo = null;