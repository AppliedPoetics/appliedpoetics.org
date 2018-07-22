<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<html>
<head>
<script src="https://use.typekit.net/vwg0vgf.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>
<script>
	function referral() {
		referrer = document.referrer;
		window.location.href = referrer;
		if(!referrer){
			window.location.href = "http://www.appliedpoetics.org";
		}
	}
</script>
<style>
	a { color: #FFCC11; text-decoration: none; }
	a:hover { border-bottom: 1px #FFCC11 dashed; }
	h1 { font-family: 'proxima-nova',sans-serif; color: #fff; text-transform: uppercase; text-shadow: 1px 1px #222; text-align: center; font-size: 50px; }
	body { height: 100%; width: 100%; overflow: hidden; }
	#bg { position: absolute; top: 0; left: 0; background-image: url('http://www.appliedpoetics.org/img/ap-404-beaker.jpg'); background-size: 100%; width: 100%; height: 100%; z-index: 1000;}
	#scrim { position: absolute; top: 0; left: 0; background: #222; opacity: .8; width: 100%; height: 100%; z-index: 1001;}
	#msg { position: absolute; top: 20%; margin-left: 25%; margin-right: auto; z-index: 1002; width: 50%;}
	#body-text { font-family: 'sax-mono',fixed width; color: #fff; font-size: 14px; text-shadow: 1px 1px #222;}
</style> 	
</head>
<body>
<div id = "bg"></div>
	<div id = "msg">
		<center><img src = "http://www.appliedpoetics.org/img/ap-type-flask.png"></center>
		<h1>Oh no! You really borked it this time!</h1>
			<div id = "body-text">
				Somehow an experiment went awry. It happens. Just head <a href = "#" onclick = "javascript: referral();">back a step</a> and try again!
			</div>
	</div>
<div id = "scrim"></div>
</body>
</html>