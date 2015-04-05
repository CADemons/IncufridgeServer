<?php
if(!empty($_POST['data'])){
	$data = $_POST['data'];
	$fname = $_POST['filename'];

	$file = fopen("Programs/" . $fname, 'w');
	fwrite($file, $data);
	fclose($file);
}
?>
