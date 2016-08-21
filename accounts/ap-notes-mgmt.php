<?php

	$user = $_POST['user'];
	$file = $_POST['file'];
	$action = $_POST['act'];
	
	$user = $_POST["user"];
	
	$server = "localhost";
	$dbuser = "labassistant";
	$dbpass = "0x3nfr33";
	$dbname = "users";
	$dbconn = mysqli_connect($server,$dbuser,$dbpass,$dbname);
	
	if($dbconn->connect_error) {
		die("Connection failed: ".$dbconn->connect_error);
		exit;
	}
	
	if($action == "rm"){
		$fileHandle = $user."/".$file;
		$query = $dbconn->query("DELETE FROM usernotes WHERE filename = '$file';");
		unlink($fileHandle);
	}
	
	$dbconn->close();
	
?>