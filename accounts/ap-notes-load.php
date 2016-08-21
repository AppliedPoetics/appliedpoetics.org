	<?php
	
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
	
	$query = $dbconn->query("SELECT * FROM usernotes WHERE u_id = '$user'");
	echo "<div id = 'fileList'>";
	while($rows=mysqli_fetch_array($query)){
		$id = stripslashes($rows['id']);
		$file = stripslashes($rows['filename']);
		$cmmt = stripslashes($rows['filecomment']);
		echo "<div class = 'saved-text'>";
		echo "<div class = 'glyphicon glyphicon-file' style = 'margin-bottom: 5px;'></div>";
		echo "<div class = 'filename' id = '$file'>".$file."</div>";
		echo "<div class = 'comment'>".$cmmt."</div>";
		echo "<div id = 'file-opts'> <div class = 'file-opt'> <div class = 'glyphicon glyphicon-download-alt' data-dismiss='modal' onclick = 'javascript:loadFile(\"$file\");' ></div> </div> <div class = 'file-opt'> <div id = 'trashSelectedFile' class = 'glyphicon glyphicon-trash' onclick = 'javascript: delFile(\"$file\"); loadNotes();'></div> </div> </div>";
		echo "</div>";
	}
	echo "</div>";
	
	$dbconn->close();
	
?>