<?php

// THE VARIABLES

$text = rawurldecode($_POST['txt']);
$cmd = $_POST['cmd'];
$lttr = $_POST['lttr'];
$word = $_POST['word'];
$url = $_POST['geturl'];

// DECODE/ENCODE TEXT AS APPROPRIATE

$text = addslashes($text);

// MAKE TEMP FILE

$filename = "scratch/".substr(md5(rand()),0,4);
$file = fopen($filename,"w");
		fwrite($file,$text);
		fclose($file);

// MAKE TEXT BLOCKS

//$words = explode(" ",$text);
//$chunks = array_chunk($words,1000);

//for($i=0;$i<=count($chunks);$i++){

// COMMAND HANDLING

	//$text = join(' ', $chunks[$i]);

	if($cmd == 'tautogram' || $cmd == 'lipogram' || $cmd == 'isolate' || $cmd == 'beaupresente' || $cmd == 'univocalism' || $cmd == 'nthword' || $cmd == 'belleabsente' || $cmd == 'powerball' || $cmd == 'regexp' || $cmd == 'strlen' || $cmd == 'birthdate' || $cmd == "alternator" || $cmd == 'tollfree' || $cmd == 'dialer' || $cmd == 'snowball') 
	{ 
		//$cmd_line = 'python python/'.$cmd.'.py -t """'.$text.'""" -l "'.$lttr.'"';
		$cmd_line = 'python python/'.$cmd.'.py -t /var/www/html/'.$filename.' -l "'.$lttr.'"';
	} elseif ($cmd == 'partsofspeech') {
		$cmd_line = 'python python/'.$cmd.'.py "/var/www/html/'.$filename.'" "'.$lttr.'"';
	} elseif ($cmd == 'concordance') {
		$cmd_line = 'python python/'.$cmd.'.py -t /var/www/html/'.$filename.' -l '.$lttr.' -w "'.$word.'"';
	} elseif ($cmd == 'texturl') {
		$cmd_line = 'python python/'.$cmd.'.py -t "'.$url.'"';
	} else { 
		$cmd_line = 'python python/'.$cmd.'.py -t /var/www/html/'.$filename.''; 
	}

	// OUTPUT & TRACE

	//$cmd_line = escapeshellcmd($cmd_line);
	//$cmd_line = str_replace('!','\! ',$cmd_line);
	$out = shell_exec($cmd_line);
	$out = stripslashes($out);

//}

//$out = utf8_decode($out);
//$out = trim(preg_replace('/\s+/', ' ', $out));

echo rtrim($out);
//echo $cmd_line;
//echo $text;

?>