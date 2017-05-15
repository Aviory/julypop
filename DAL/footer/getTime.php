<?php
require_once 'config.php';
$stmt = $pdo->query('SELECT * FROM julypop_date_update WHERE dates = dates');
while ($row = $stmt->fetch())
{
    $time             = array(
        "day"          => $row['day'],
        "month"        => $row['month'],
        "year"         => $row['year'],
        "h"            => $row['h'],
        "m"            => $row['m'],
        "s"            => $row['s'],
    );
}
echo json_encode($time);

$stmt = null;
$pdo = null;