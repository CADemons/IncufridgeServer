<!DOCTYPE HTML>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" type="text/css" href="css/common.css"/>
        <link rel="stylesheet" type="text/css" href="css/newexperiment.css"/>
        <script type="text/javascript" src="js/common.js"></script>
        <script type="text/javascript" src="js/newexperiment.js"></script>
        <script type="text/javascript">incufridge.exists = new Array(<?php
$username = 'test';
$list = scandir('userdata/'.$username);
for($i = 2; $i<count($list)-1; $i++) {
    echo '"'.$list[$i].'", ';
}
echo '"'.$list[count($list)-1].'"';
?>);</script>
    </head>
    <body>
        <?php include 'navbar.php'; ?>
        <div id="main-content">
            <h3 id="title">New Experiment</h3>
            <div id="input">
                <form id="form" action="process.php" method="POST">
                    <input name="name" type="text" onblur="check(this)" data-type="name"/><span class="warn"></span>
                    <input type="hidden" name="type" value="new" />
                </form>
            </div>
            <button id="submit" onclick="submit()">Create and Edit</button>
        </div>
    </body>
</html>