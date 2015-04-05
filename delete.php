<?php
if(!empty($_POST['filename'])){
	$fname = "Programs/" . $_POST['filename'];
	if (file_exists($fname)) {
		unlink($fname);
	}
}
?>
