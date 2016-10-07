<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	$data = array();
	if(isset($_GET['files'])){
		$error = false;
		$files = array();
		$dir = 'scratch/img/';
		foreach($_FILES as $file){
			$filename = preg_replace('/\s+/', '', basename($file['name']));
			if(move_uploaded_file($file['tmp_name'],$dir.$filename))
			{
				$files[] = $dir.$file['name'];
				$data = array('success'=>$filename);
			}
		}
	} else {
		$data = ($error) ? array('error'=>'Error.'):array('files'=>$files);
	}
	echo json_encode($data);
?>