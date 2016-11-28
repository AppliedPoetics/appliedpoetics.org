<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<html>
<head>
<title>Applied Poetics: the Lab Report</title>
<script src="https://use.typekit.net/vwg0vgf.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-social.css">
<script src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<meta property="og:image" content="http://www.appliedpoetics.org/img/ap-og-img.png"></meta>
<meta property="og:site_name" content="Applied Poetics"></meta>
<meta property="og:url" content="http://www.appliedpoetics.org"></meta>
<meta property="og:description" content="The constrained writing platform where something's always bubbling up!"></meta>
<meta property="og:title" content = "Applied Poetics"></meta>
<link rel="icon" href="../img/favicon.ico" type="image/x-icon" />
</head>
<body>
<div id = "menu">
		<div id = "masthead">
			<div id = "logo"><img src = "http://appliedpoetics.org/img/ap-type-flask-ico-sm.png"></div>
			<div id = "option-container">
				<div class = "dropdown" tabindex = "0">
				<button class = "drop-btn" onclick = "location.href= 'http://www.appliedpoetics.org'">Return to AP.org</button>
				</div>
			</div>
		</div>
</div>
<div id = "container">
<div id = "content">
<div id = 'header-img'></div>
<?php
	//POSTS
	$cmd = shell_exec('sh contentful.sh');
	$entries = json_decode($cmd);
	$count = $entries->total;
	for($i=0; $i<=$count-1; $i++) {
		$entry = $entries->items[$i]->fields;
		echo "<div class = 'post-title'><h1>";
		echo $entry->platformUpdate;
		echo "</h1></div>";
		echo "<hr/>";
		echo "<div class = 'post-meta'>";
		$date = new DateTime($entries->items[$i]->sys->createdAt);
		echo "Posted @ ".$date->format('U');
		echo "</div><br/>";
		echo "<div class = 'post-content'>";
		$lines = explode("\n",$entry->platformNote);
		for($j=0; $j<count($lines);$j++){
			$info = $lines[$j];
			preg_match("/!\[(.*?)\](.*?)\)/", $info, $images);
			if($images){
				$img = $images[2];
				$img = preg_replace("/\(/", "", $img);
				$info = preg_replace("/!\[(.*?)\](.*?)\)/", "<img src = '".$img."' width = 12>", $info);
			}
			preg_match("/\[(.*?)\)/", $info, $links);
			if($links){
				$link = $links[0];
				preg_match("/\[(.*?)\]/", $info, $text);
				$link = preg_replace("/\[(.*?)\]/", "", $link);
				$link = preg_replace("/\(|\)/", "", $link);
				$info = preg_replace("/\[(.*?)\)/", "<a href ='".$link."' target = '_new'>".$text[1]."</a>", $info);
			}
			echo $info."<br/>";
		}
		echo "</div>";
	}
	//POSTS
?>
</div>
</div>
</body>
</html>
