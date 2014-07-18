<?php
$username = 'test';
switch($_POST['type']) {
    case('new'):
        if(isset($_POST['name'])) {
            if(preg_match("/[^a-z0-9_-]/i", $POST['name'])) {
                failAndBack('Invalid name');
            } else {
                $name = $_POST['name'];
                $filename = 'userdata/'.$username.'/'.$name.'.txt';
                if(file_exists($filename)) {
                    failAndBack('File already exists');
                } else {
                    $file = fopen($filename, 'x');
                    fclose($file);
                    header("Location: http://www.cademons.org/incufridge/experiment.php?file=".$name);
                }
            }
        }
        break;
    default:
        failAndBack('Unknown processing instruction');
}

/**
 * Alert message and go back. Only to be used for unexpected failure.
 * @param string $message Message to alert user
 */
function failAndBack($message) {
    echo '<!DOCTYPE HTML><html>';
    echo '<body onload="alert(\''.$message.'\'); history.back();">';
    echo '</body></html>';
}
?>