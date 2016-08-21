<?php
	
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	$username = $_POST["user"];
	$medialoc = $_POST["media"];
	$email = $_POST["email"];
	
		if($medialog = ''){
			$medialoc = " ";
		}
		
		if($email =''){
			$email = " ";
		}
	
	$server = "localhost";
	$dbuser = "labassistant";
	$dbpass = "0x3nfr33";
	$dbname = "users";
	$dbconn = mysqli_connect($server,$dbuser,$dbpass,$dbname);
	
	if($dbconn->connect_error) {
		die("Connection failed: ".$dbconn->connect_error);
		exit;
	}
	
	function create_user($username,$email,$medialoc,$dbconn){
		$query = $dbconn->query("INSERT INTO usernames (u_id, email, medium) VALUES ('".$username."','".$email."','".$medialoc."')");
		if(!$query){
			
		} else {
			mkdir($username,0775);
		}
	}
	
	function query_users($username,$email,$medialoc,$dbconn){
		$query = mysqli_query($dbconn,"SELECT * FROM usernames WHERE u_id = '$username'");
		if( mysqli_num_rows($query) > 0 ) {
			exit;
		} else{
			create_user($username,$email,$medialoc,$dbconn);
		}
	}

	query_users($username,$email,$medialoc,$dbconn);
	
	$dbconn->close();
	
?>
