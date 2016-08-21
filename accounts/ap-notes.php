<?php

	$user = $_POST["user"];
	$file = $_POST["name"];
	$cmmt = $_POST["comment"];
	$text = $_POST["txt"];
	
		$text = addslashes($text);
		$cmmt = addslashes($cmmt);

	$server = "localhost";
	$dbuser = "labassistant";
	$dbpass = "0x3nfr33";
	$dbname = "users";
	$dbconn = mysqli_connect($server,$dbuser,$dbpass,$dbname);
	
	if($dbconn->connect_error) {
		die("Connection failed: ".$dbconn->connect_error);
		exit;
	}
	
	$fileHandle = fopen(	$user."/".$file,'w');
		fwrite($fileHandle,$text);
		fclose($fileHandle);
	
	$query = $dbconn->query("INSERT INTO usernotes (u_id, filename, filecomment) VALUES ('".$user."','".$file."','".$cmmt."')");
	
?>