<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<html>
<head>
<title>Applied Poetics</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css">
<link rel="stylesheet" type="text/css" href= "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-social.css">
<script src="https://use.typekit.net/vwg0vgf.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script type="text/javascript" src="//js.live.net/v5.0/wl.js"></script>
<script src="https://apis.google.com/js/api:client.js"></script>
<meta property="og:image" content="http://www.appliedpoetics.org/img/ap-og-img.png"></meta>
<meta property="og:site_name" content="Applied Poetics"></meta>
<meta property="og:url" content="http://www.appliedpoetics.org"></meta>
<meta property="og:description" content="The constrained writing platform where something's always bubbling up!"></meta>
<meta property="og:title" content = "Applied Poetics"></meta>
<meta name="description" content="The constrained writing platform where something's always bubbling up!" />
<meta name="google-signin-client_id" content="appliedpoetics-1378.apps.googleusercontent.com">
<script src = "js/line-numbers.js"></script>
<script src = "js/form-functions.js"></script>
<script src = "js/text-stats.js"></script>
<script src = "js/function-json.js"></script>
<script src = "js/function-ui.js"></script>
<script src = "js/function-login.js"></script>
<link rel="icon" href="img/favicon.ico" type="image/x-icon" />
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-72820302-1', 'auto');
  ga('send', 'pageview');
</script>
<?php header('Content-Type: text/html; charset=utf-8'); ?>
<?php $firstTimeUser = !isset($_COOKIE["FirstTime"]); setcookie("FirstTime",1,2000000000); ?>
</head>
<body>
<!-- LOGIN SCRIPTS -->
	<!-- FACEBOOK SDK -->
<script>
  window.fbAsyncInit = function() {
	  FB.init({
		appId      : '1785071761712564',
		cookie     : true,  // enable cookies to allow the server to access 
							// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.5' // use graph api version 2.5
	  });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>
	<!-- GOOGLE SDK -->
<script>
  var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '643712538601-c6p38mgn1rm2n94neibiag290n37fbug.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('googleBtn'));
    });
  };

  function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function(googleUser) {
				var id = googleUser.getBasicProfile().getId();
				var email = googleUser.getBasicProfile().getEmail();
				var imgURL = googleUser.getBasicProfile().getImageUrl();
				startGoogleLogin(id,email,imgURL);
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
  </script>
	<!-- MICROSOFT SDK -->
<script type="text/javascript">
function appLoaded(appLoadedEventArgs) {
    alert('app tag initialized');
}
</script>
<!-- LOGIN SCRIPTS -->
<?php 
	$ref = rawurldecode($_GET['ref']);
	if(!$firstTimeUser && $ref){
		echo "<form><input type = 'hidden' name='referral' id = 'referral' value = '".$ref."'></form>";
	} else
	{
	}
?>
<?php  if( $firstTimeUser ) {
	echo "<div id = 'startup-scrim' style = 'display: block;' onclick = 'javascript: firstTime();'><img src = 'img/ap-first-time-overlay.png' style = 'position: absolute; width: 100%;' id = 'firstTimeImg'><img src = 'img/ap-first-time-overlay-step1.png' style = 'display: none; position: absolute; width: 60%; right:0; bottom: 0;' id = 'step-one'><img src = 'img/ap-first-time-overlay-step2.png' style = 'display: none; position: absolute; width: 60%; right:0; bottom: 0;' id = 'step-two'><img src = 'img/ap-first-time-overlay-step3.png' style = 'display: none; position: absolute; width: 60%; right:0; bottom: 0;' id = 'step-three'><img src = 'img/ap-first-time-overlay-step4.png' style = 'display: none; position: absolute; width: 60%; right:0; bottom: 0;' id = 'step-four'></div>";
}
?>
<script>
</script>
<script>$(document).ready(function () {var ref = $('#referral').val(); if(ref){ $( '#'+ref.toLowerCase() ).click(); } });</script>
<div id = "menu">
		<div id = "masthead">
			<div id = "logo" onclick = "javascript: tosPopover();"><img src = "img/ap-type-flask-ico-sm.png"></div>
			<div id = "option-container">
				<div class = "dropdown" tabindex = "0" id = "oulipo" onclick = 'javascript: expandMenu("oulipo");'>
					<button class = "drop-btn">Oulipean</button>
					<div class = "dropdown-content" id = "oulipo-menu">
						<a href = "#" id = "tautogram" data-toggle="popover" data-html="true" title = "Tautogram" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><div class = 'styled-select'><select name = 'lttr' id = 'lttr'><option value = 'a'>a</option><option value = 'b'>b</option><option value = 'c'>c</option><option value = 'd'>d</option><option value = 'e'>e</option><option value = 'f'>f</option><option value = 'g'>g</option><option value = 'h'>h</option><option value = 'i'>i</option><option value ='j'>j</option><option value = 'k'>k</option><option value = 'l'>l</option><option value = 'm'>m</option><option value = 'n'>n</option><option value = 'o'>o</option><option value = 'p'>p</option><option value = 'q'>q</option><option value = 'r'>r</option><option value = 's'>s</option><option value = 't'>t</option><option value = 'u'>u</option><option value= 'v'>v</option><option value = 'w'>w</option><option value = 'x'>x</option><option value = 'y'>y</option><option value='z'>z</option></select></div><input type = 'hidden' name = 'cmd' value = 'tautogram' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>The tautogram is a constraint which sorts out all words beginning with a selected letter.</div></form>">Tautogram</a>
						<a href = "#" id = "lipogram" data-toggle="popover" data-html="true" title = "Lipogram" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><div class = 'styled-select'><select name = 'lttr' id = 'lttr'><option value = 'a'>a</option><option value = 'b'>b</option><option value = 'c'>c</option><option value = 'd'>d</option><option value = 'e'>e</option><option value = 'f'>f</option><option value = 'g'>g</option><option value = 'h'>h</option><option value = 'i'>i</option><option value ='j'>j</option><option value = 'k'>k</option><option value = 'l'>l</option><option value = 'm'>m</option><option value = 'n'>n</option><option value = 'o'>o</option><option value = 'p'>p</option><option value = 'q'>q</option><option value = 'r'>r</option><option value = 's'>s</option><option value = 't'>t</option><option value = 'u'>u</option><option value= 'v'>v</option><option value = 'w'>w</option><option value = 'x'>x</option><option value = 'y'>y</option><option value='z'>z</option></select></div><input type = 'hidden' name = 'cmd' value = 'lipogram' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Somewhat the opposite of a tautogram, the lipogram is a constraint which erases all words from a text that contain a selected letter.</div></form>">Lipogram</a>
						<a href = "#" id = "homoconsonant" data-toggle="popover" data-html="true" title = "Homoconsonantism" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'homoconsonant' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Ever wondered what a text would look like without vowels? Here's your chance.</div></form>">Homoconsonantism</a>
						<a href = "#" id "fibonnaci" data-toggle="popover" data-html="true" title = "Fibonacci Seq." data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'fibonacci' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>This generator reads through a text picking out words of a text correlating to the procession of the Fibonacci Sequence. For example, the beginning of the sequence returns the first (1), first, (1), second (2), then fifth (5) words and continues through the text following the Fibonacci pattern.</div></form>">Fibonnaci Seq.</a>
						<a href = "#" id = "prisoners" data-toggle="popover" data-html="true" title = "Prisoner's Constraint" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'prisoners' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Imagine you are a prisoner who is attempting to write letters to the outside conserving both ink and paper. To do so, you would write only the letters which take the smallest amount of space—those without ascenders or descenders (such as j, h, t, et al.). This generator removes all words which contain the offending letters.</div></form>">Prisoner's Constraint</a>
						<a href = "#" id = 'belleabsente' data-toggle="popover" data-html="true" title = "Belle Absente" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'text' id = 'lttr'><input type = 'hidden' name = 'cmd' value = 'belleabsente' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>The Belle Absente, or 'Absent Beloved' is a constraint in which words featuring letters in a selected name or phrase are removed from the text. Terms and letters should not be comma separated.</div></form>">Belle Absente</a>
						<a href = "#" id = "beaupresente" data-toggle="popover" data-html="true" title = "Beau Presente" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'text' id = 'lttr'><input type = 'hidden' name = 'cmd' value = 'beaupresente' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>O, happy day—the beloved has returned! This constraint is one in which words can only be made up of letters in a given name or phrase. Terms and letters should not be comma separated.</div></form>">Beau Presente</a>
						<a href = "#" id = "univocalism" data-toggle="popover" data-html="true" title = "Univocalism" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><div class = 'styled-select'><select name = 'lttr' id = 'lttr'><option value = 'a'>a</option><option value = 'e'>e</option><option value = 'i'>i</option><option value = 'o'>o</option><option value = 'u'>u</option></select></div><input type = 'hidden' name = 'cmd' value = 'univocalism' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Returns only words containing a selected vowel. If selecting 'I', words such as 'big' or 'bin' would appear; selecting 'O' would mean words such as 'bone' or 'boat' would not be allowed, but 'bog' would.</div></form>">Univocalism</a>
						<a href = "#" id = "snowball" data-toggle="popover" data-html="true" title = "Snowball" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><div class = 'styled-select'><select name = 'lttr' id = 'lttr'><option value = 'melt'>Melt</option><option value = 'freeze'>Standard</option></select></div><input type = 'hidden' name = 'cmd' value = 'snowball' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Sorts words in a text by length returning the list in descending order (melt) or ascending order (standard).</div></form>">Snowball</a>
					</div>
				</div>
				<div class = "dropdown" tabindex = "0" onclick = 'javascript: expandMenu("grammar");'>
					<button class = "drop-btn">Grammar/Syntax</button>
					<div class = "dropdown-content" id = "grammar-menu">
						<a href = "#" id = "punctuator" data-toggle="popover" data-html="true" title = "Punctuator" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'punctuator' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Removes all words from a text, leaving only the punctuation behind, preserving the text's original spacing.</div></form>">Punctuator</a>
						<a href = "#" id = "isolate" data-toggle="popover" data-html="true" title = "Isolate Sentence" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><div class = 'styled-select'><select name = 'punct' id = 'lttr'><option value = '!'>!</option><option value = '?'>?</option><option value = '.'>.</option></select></div><input type = 'hidden' name = 'cmd' value = 'isolate' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Returns only sentences that end with a punctuation mark of your choosing.</div></form>">Isolate Sentences</a>
						<a href = "#" id = "quotation" data-toggle="popover" data-html="true" title = "Quotes" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'quotes' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Returns all quoted material from the source text.</div></form>">Quotations</a>
						<a href = "#" id = "partsofspeech" data-toggle="popover" data-html="true" title = "Parts of Speech" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><div class = 'styled-select'><select name = 'lttr' id = 'lttr'><option value = 'JJ'>Adjectives</option><option value = 'RB'>Adverbs</option><option value = 'FW'>Foreign Words</option><option value = 'NN'>Nouns</option><option value = 'VB'>Verbs</option></select></div><input type = 'hidden' name = 'cmd' value = 'partsofspeech' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>All words classified as a given part of speech are filtered and returned. This is an implementation of the Penn Treebank from the Python NLTK toolkit. There may be a short lag time between submission of the request and results.</div></form>">Parts of Speech</a>
						<a href = "#" id = "concordance" data-toggle="popover" data-html="true" title = "Concordance" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label># words before/after:</label><input type = 'text' id = 'nwords' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 8 || event.charCode == 46'><br/><br/><label>Word(s) to search:</label><input type = 'text' id = 'word'><input type = 'hidden' name = 'cmd' value = 'concordance' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Though not a true substitute for a concordance, this function will search for a word in a text and pull the corresponding number of words specified on either side of it.</div></form>">Concordance</a>
						<a href = "#" id = "regex" data-toggle="popover" data-html="true" title = "Regular Expr." data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'regexp' id = 'cmd'><input type = 'text' id = 'lttr'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Enter any regular expression to search a text and return all matches. This requires some knowledge of programmable 'regular expressions.'</div></form>">Regular Expr.</a>
						<a href = "#" id = "abecedarian" data-toggle="popover" data-html="true" title = "Abecedarian" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'abecedarian' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Searches a text for the first word matching each letter of the alphabet, continuing from the position that the last letter was found.</div></form>">Abecedarian</a>
						<a href = "#" id = "abcquence" data-toggle="popover" data-html="true" title = "ABC-quence" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'alphabetron' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Discovers all the words in a text spelt from letters which appear in alphabetical order such as 'effort' or 'abbey'.</div></form>">ABC-quence</a>
						<a href = "#" id = "chainreaction" data-toggle="popover" data-html="true" title = "Chain Reaction" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'chainreaction' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Grabs the first word in a text, using the last letter to find the next consecutive word starting with that letter, using that word's last letter to continue the search.</div></form>">Chain Reaction</a>
						<!--<a href = "#" data-toggle="popover" data-html="true" title = "Anagram" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'anagram' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Attempts a best-fit anagram for the given text. As of yet, it's imperfect, but it's getting better.</div></form>">Anagram</a>-->
						<a href = "#" id = "synonymizer" data-toggle="popover" data-html="true" title = "Synonymizer" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'synant' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Searches a predefined dictionary for synonyms of all words 3 characters and greater, substituting a random synonym from a contextual list.</div></form>">Synonymizer</a>
						<a href = "#" id = "alternator" data-toggle="popover" data-html="true" title = "Alternator" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><div class = 'styled-select'><select name = 'lttr' id = 'lttr'><option value = 'c'>Consonant-Vowel</option><option value = 'v'>Vowel-Consonant</option></select></div><input type = 'hidden' name = 'cmd' value = 'alternator' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Search for words which have alternating patterns of consonants and vowels, such as 'bones' or 'agog'.</div></form>">Alternator</a>
						<a href = "#" id = "hexwords" data-toggle="popover" data-html="true" title = "Hexwords" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'hexwords' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>This generator translates your text into spellings which only contain characters in the base 16 alphabet (0-9, a-f). Routine is adapted from code written by Ned Batchelder.</div></form>">Hexwords</a>
					</div>
				</div>
				<div class = "dropdown" tabindex = "0" onclick = 'javascript: expandMenu("algo");'>
					<button class = "drop-btn">Algorithmic</button>
					<div class = "dropdown-content" id = "algo-menu">
						<a href = "#" id = "travesty" data-toggle="popover" data-html="true" title = "Travesty" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label># of chars. to output</label><input type = 'text' id = 'outwords' onkeypress='restrictNumberKeys(this)'><br/><br/><label>Granularity</label><input type = 'text' id = 'granular' onkeypress='restrictNumberKeys(this)'><input type = 'hidden' name = 'cmd' value = 'travesty' id = 'cmd'><input type ='Submit' value = 'Run'><br/><div class = 'tool-explain'>Travesty is a tool which examines a text's letter frequency and returns a scrambled version of the original. Granularity is the number of words to use as a model. This is a slightly modified version of the PERL Travesty script by Ron Starr.</div></form>">Travesty</a>
						<a href = "#" id = "markov" data-toggle="popover" data-html="true" title = "Markov" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label># of chars. to output</label><input type = 'text' id = 'outwords' onkeypress='restrictNumberKeys(this)'><br/><br/><label>Granularity</label><input type = 'text' id = 'granular' onkeypress='restrictNumberKeys(this)'><input type = 'hidden' name = 'cmd' value = 'markov' id = 'cmd'><input type ='Submit' value = 'Run'><br/><div class = 'tool-explain'>The Markov utility is a tool which examines a text's word frequency and returns a scrambled version of the original. Granularity is the number of words to use as a model. Higher numbers generate relatlively bettter fluency.</div></form>">Markov</a>
						<a href = "#" id = "proofofwork" data-toggle="popover" data-html="true" title = "Proof of Work" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'proofofwork' id = 'cmd'><input type ='Submit' value = 'Run'><br/><div class = 'tool-explain'>Inspired by Bitcoin and Hashcash transactions, this routine 'solves' each line of a poem as if part of a transaction, providing each line's solution to the challenge issued by the line through a SHA256 hash.</div></form>">Proof of Work</a>
						<a href = "#" id = "blockchain" data-toggle="popover" data-html="true" title = "Blockchain" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'blockchain' id = 'cmd'><input type ='Submit' value = 'Run'><br/><div class = 'tool-explain'>Another routine sourced from the mechanics of Bitcoin, the 'Blockchain' generator encodes a text in a SHA256 hash ready for transmission/insertion into a real blockchain.</div></form>">Blockchain</a>
						<a href = "#" id = "colorfield" data-toggle="popover" data-html="true" title = "Color Field" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'colorfield' id = 'cmd'><input id='filename' placeholder='Choose file.' disabled='disabled' /><div class = 'fileupload btn btn-primary'>Choose Image<input type = 'file' class = 'upload' id = 'uploadbtn' accept = 'image/*' /></div><br/><br/><div class = 'styled-select'><select name = 'lttr' id = 'lttr'><option value = 'sentences'>Containing</option><option value = 'letters'>Spelled By</option><option value = 'anagrams'>Anagrams</option><option value = 'list'>List Colors</option></select></div><hr/><input type ='Submit' value = 'Run'><br/><div class = 'tool-explain'>'Color Field' scans through an uploaded image to find all of the distinct colors present.<br/><Br/> The 'Containing' option pulls out sentences containing colors found in that image; the 'Spelled By' image finds all words spelled from the letters which make up these colors. 'Anagram' returns anagrams of the web-safe color names contained in the image. 'List Colors' simply lists web-safe colors in the image.</div></form>">Color Field</a>
					</div>
				</div>
				<div style = 'display: none;' tabindex = "0" class = "dropdown" onclick = 'javascript: expandMenu("form");'>
					<button class = "drop-btn">Formic</button>
					<div class = "dropdown-content" id = "form-menu">
						<!--<a href = "#" id = "sestina" data-toggle="popover" data-html="true" title = "Sestina" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'sestina' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Creates a random sestina from a given text.</div></form>">Sestina</a>-->
					</div>
				</div>
				<div tabindex = "0" class = "dropdown" onclick = 'javascript: expandMenu("number");'>
					<button class = "drop-btn">Numerology</button>
					<div class = "dropdown-content" id = "number-menu">
						<a href = "#" id = "nthword" data-toggle="popover" data-html="true" title = "N<sup>th</sup> Word" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label>N<sup>TH</SUP> word to take:</label><input type = 'text' id = 'lttr' onkeypress='restrictNumberKeys(this)'><input type = 'hidden' name = 'cmd' value = 'nthword' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Begins counting from the start of a text and takes every n<sup>th</sup> word. For example, entering '9' takes the 9<sup>th</sup>, 18<sup>th</sup>, 27<sup>th</sup> word, continuing until the entire text has been read.</div></form>">Nth Word</a>
						<a href = "#" id = "pithon" data-toggle="popover" data-html="true" title = "Pi-thon" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'pi' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Calculates π to the number of decimals as there are words in the text, starting from the first digit of π, taking the third word, then the first after that, then the fourth, and so on.</div></form>">Pi-thon</a>
						<a href = "#" id = "atlength" data-toggle="popover" data-html="true" title = "At Length" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label># of letters:</label><input type = 'text' id = 'lttr' onkeypress='restrictNumberKeys(this)'><br/><input type = 'hidden' name = 'cmd' value = 'strlen' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Searches for words of a given length, retrieving only words of that number of letters.</div></form>">At Length</a>
						<a href = "#" id = "birthdate" data-toggle="popover" data-html="true" title = "Birthdate" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label>Enter a date:</label><input type = 'date' id = 'lttr' onkeypress='restrictNumberKeys(this)' placeholder = 'MM/DD/YYYY'><input type = 'hidden' name = 'cmd' value = 'birthdate' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Enter a date in MM/DD/YYYY format.</div></form>">Birthdate</a>
						<a href = "#" id = "phonewords" data-toggle="popover" data-html="true" title = "Phonewords" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label>Input digits to 'spell' (up to 7 without dashes):</label><input type = 'tel' id = 'lttr' onkeypress='restrictNumberKeys(this)' placeholder = '8675309' maxlength=7><input type = 'hidden' name = 'cmd' value = 'tollfree' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>'Spells' through a text using the part of an American toll-free number usually reserved to spell phrases such as '1800ireallyenjoycarpeting'—except that's too many letters, man.</div></form>">Phonewords</a>
						<a href = "#" id = "dialatext" data-toggle="popover" data-html="true" title = "Dial-a-Text" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label>Input a phone number (without dashes):</label><input type = 'tel' id = 'lttr' onkeypress='restrictNumberKeys(this)' placeholder = '5558675309' maxlength=20><input type = 'hidden' name = 'cmd' value = 'dialer' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Cycles through a text picking out words which match the 'n<sup>th</sup>' position. For example, '8675309' would look for word 8, 6, 7, 5 and so on.</div></form>">Dial-a-Text</a>
					</div>
				</div>
				<div class = "dropdown"tabindex = "0" onclick = 'javascript: expandMenu("pop");'>
					<button class = "drop-btn">Pop Culture</button>
					<div class = "dropdown-content" id = "pop-menu">
						<a href = "#" id = "powerball" data-toggle="popover" data-html="true" title = "Powerball" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label>The latest numbers are:</label><div id = 'powerball_numbers' class = 'numbers'></div><input type = 'hidden' name = 'cmd' value = 'powerball' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>This routine uses the latest Powerball numbers to read a text, taking each non-Powerball number as the n<sup>th</sup> number in the text, cycling once it reaches the end of the sequence, with the Powerball as the title. The latest numbers are courtesy of the New York state lottery API.</div></form>" onclick = "javascript: powerball();">Powerball</a>
						<a href = "#" id = "lost" data-toggle="popover" data-html="true" title = "The LOST Numbers" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><label>The Numbers are unlucky.</label><br/><div class = 'numbers'>4 8 15 16 23 42</div><input type = 'hidden' name = 'cmd' value = 'lost' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>This function cycles through the text taking each subsequent n<sup>th</sup> word, and making a text. While these numbers only brought misfortune to the characters in the television show LOST, may you find poetry through them.</div></form>">The LOST Numbers</a>
						<a href = "#" id = "weather" data-toggle="popover" data-html="true" title = "Weather Forecast" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'weather' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Using a predefined (and periodically updated) list of weather-related terms, the 'Weather Forecast' searches a text for these terms, returning full sentences containing them.</div></form>">Weather Forecast</a>
						<a href = "#" id = "coloring" data-toggle="popover" data-html="true" title = "Coloring Book" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'color' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Using a predefined (and periodically updated) list of names for colors, the 'Coloring Book' function retrieves all sentences containing colors.</div></form>">Coloring Book</a>
						<a href = "#" id = "sartorialize" data-toggle="popover" data-html="true" title = "Sartorializer" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'fashion' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Using a predefined (and periodically updated) list of fashion terms, the 'Sartorializer' function retrieves all sentences containing terms related to dress and clothing.</div></form>">Sartorializer</a>
					</div>
				</div>
				<div class = "dropdown" tabindex = "0"	onclick = 'javascript: expandMenu("stat"); wordCount(); charCount(); lineCount();'>
					<button class = "drop-btn">Statistics</button>
					<div class = "dropdown-content" id = "stat-menu">
						<a href = "#" id = "wordCount">Word Count</a>
						<a href = "#" id = "charCount">Char. Count</a>
						<!--<a href = "#" id = "lineCount">Line Count</a>-->
					</div>
				</div>
				<div class = "dropdown" tabindex = "0" onclick = 'javascript: expandMenu("text");'>
					<button class = "drop-btn file-opts">Text Ops.</button>
					<div class = "dropdown-content" id = 'text-menu'>
					<a class = "file-opts" id = "clear" href = '#' data-toggle = "popover" data-html = "true" title = "Really Clear Screen?" data-content = "<form onsubmit = 'return clearScreen(this)'><input type = 'Submit' value = 'Clear Screen'><div class = 'tool-explain'></div></form>"style = "width: inherit;">Clear Screen</a>
					<a class = "file-opts" id = "dedupe" href = "#" data-toggle="popover" data-html="true" title = "De-duplicate" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'dedupe' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Removes duplicate words from a text or list.</div></form>">De-duplicate</a>
					<a class = "file-opts" id = "sort" href = "#" data-toggle="popover" data-html="true" title = "Sort List" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><div class = 'styled-select'><select name = 'lttr' id = 'lttr'><option value = 'asc'>Ascending</option><option value = 'desc'>Descending</option></select></div><input type = 'hidden' name = 'cmd' value = 'listsort' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Sort a list or text in ascending or descending alphabetical order.</div></form>">Sort List</a>
					<a class = "file-opts" id = "unique" href = "#" data-toggle="popover" data-html="true" title = "List Unique Letters" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'listchars' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Returns a string containing list of unique letters in a text.</div></form>">Unique Letters</a>
					<a class = "file-opts" id = "reverse" href = "#" data-toggle="popover" data-html="true" title = "Reverse Text" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'reverser' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Reverses the entire text.</div></form>">Reverse Text</a>
					<a class = "file-opts" id = "default" href = "#" data-toggle="popover" data-html="true" title = "Default Text" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'defaulttext' id = 'cmd'><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Don't have a text in mind? Use one of our favorites: Robert Louis Stevenson's <i>The Strange Case of Dr. Jekyll and Mr. Hyde</i>.</div></form>">Default Text</a>
					<a class = "file-opts" href = "#" id = "wiki" data-toggle="popover" data-html="true" title = "Wikipedia" data-content = "<form onsubmit = 'return runTool(this)' action = '#'><input type = 'hidden' name = 'cmd' value = 'wiki' id = 'cmd'><input type = 'text' id = 'lttr' placeholder = 'Article topic'><br/><br/><div class = 'styled-select'><select name = 'word' id = 'word'><option value = 'single'>Single Topic Page</option><option value = 'pageref'>Page + Linked Topics</option><option value = 'refonly'>Only Linked Topics</option><option value = 'list'>List Topics Only</option></select></div><hr/><input type ='Submit' value = 'Run'><div class = 'tool-explain'>Fetches a Wikipedia page and (optionally) all of its references as a source text. Depending on how many links there are in the topic, this can take a fair amount of time.</div></form>">Wikipedia</a>
					</div>
				</div>
				<div class = "dropdown" tabindex = "0" onclick = ''>
					<button class = "drop-btn file-opts" id = 'login-btn' data-toggle="modal" data-target="#loginModal" name = 'login-btn'>Log In</button>
				</div>
				<div class = "dropdown" tabindex = "0"	onclick = ''>
					<button class = "drop-btn file-opts" onclick = 'location.href="/labreports";'>LAB REPORTS</button>
				</div>
			</div>
		</div>
<div id = "page-wrapper">
	</div>
	<div id = "text-console">
		<form>
			<textarea name = "editContent" id = "editContent" rel = "popover" onclick = "expandMenu('all');"></textarea>
		</form>
		<script type="text/javascript">
			createTextAreaWithLines('editContent');
			$("#lineNumbers").prop("disabled", true);
		</script>	
	</div>
</div>
<div id = "entryContent-warning"></div>
<script>
	$(window).resize(function() {
		createTextAreaWithLines('editContent');
	});
</script>
<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});
</script>
<script>
function backToTop() { $('#editContent').animate({scrollTop: 0},800);}
</script>
<script>
function backToBttm() { var scrollBottom = document.getElementById('editContent').scrollHeight; $('#editContent').animate({scrollTop: scrollBottom},800);}
</script>
<script>
$('[data-toggle=popover]').popover({
  trigger:"click"
});

$('[data-toggle=popover]').on('click', function (e) {
   $('[data-toggle=popover]').not(this).popover('hide');
});
</script>
<script>
$(document).ready(function () {
	$(document).on('focus',':input', function(){
		$(this).attr('autocomplete','off');
	});
});
</script>
<script>
$('.dropdown').mousedown( function () {
	$('.dropdown').focus();
});
</script>
<?php
if(!$firstTimeUser && !$ref){
	//echo "<script> $(document).ready(function() { var update = Date.parse($('#lastUpdate').val()); var expire = new Date(); expire.setTime = (expire.getTime()*24*60*60*1000); updatePointer(update,expire);});</script>";
}
?>
<div id = "scrollCtrl">
<div id = "saveCtrl"><span class="glyphicon glyphicon-save-file" data-toggle="modal" data-target="#saveModal" style = "background: none; border: none;" ></span></div>
<div id = "loadCtrl" onclick = "javascript:loadNotes();"><span class = "glyphicon glyphicon-level-up" data-toggle="modal" data-target="#loadModal" style = "background: none; border: none;" ></span></div>
<div id = "undoCtrl" onclick = "javascript: execUndo();"><span class = "glyphicon glyphicon-step-backward"></span></div>
<div id = "redoCtrl" onclick = "javascript: execRedo();"><span class = "glyphicon glyphicon-step-forward"></span></div>
<div id = "helpCtrl" onclick = "javascript: firstTime();"><span class = "glyphicon glyphicon-question-sign"></span></div>
<div id = "scrollTop" onclick = "javascript: backToTop();"><span class = "glyphicon glyphicon-triangle-top"></span></div><div id = "scrollBottom" onclick = "javascript: backToBttm();"><span class = "glyphicon glyphicon-triangle-bottom"></span></div>
</div>
<div id = "tos-popover">
	<div id = "tos-img">
		<center><img src = "img/ap-type-flask.png"></center>
	</div>
	<div id = "tos-text" onclick = "javsacript: tosPopover();">
		<center>Applied Poetics ver 1.<?php echo date("y.m.d:Hi", filemtime('index.php')); ?><br/>Concocted in Bethesda, Maryland<br/><br/></center>
		Source texts are briefly logged to the server, and are deleted immediately upon processing—that is, unless you choose to save them, in which case they are stored by an id number in a folder specific to your login account. There is also a cookie written on your first visit; it is not a tracking cookie, it just lets me know if I need to show the— brief orientation sequence (which is always accessible from the question mark menu in the bottom right). If you have questions, I invite you to email me: admin [at] appliedpoetics.org. My name is Doug Luman. You can find more about me <a href = "http://www.douglasjluman.com" target = "_new">here</a>.
		<br/><br/>
		Thanks are in order to far too many people to list here, but particularly Misky Braendeholm, E. Kristen Anderson, James Moore, Margo Roby, Roxanna Bennett, Josh Medsker, Nancy Chen Long, Matt Trease, Ed Bremson, Beth Ayer, and everyone who participates/d in the <a href ="http://www.foundpoetryreview.com/oulipost/" target = "_new">Oulipost</a> project and various <A href = "http://foundpoetryreview.com">Found Poetry Review</a> events and groups. Your feedback, interests, and encouragement are indispensible. And a much-more-than-thank-you to Jenni without whose support and feedback none of the visions and aspirations behind AppliedPoetics would be more than scattered bits of code.
		<Br/><Br/>
		This page is typeset in Proxima Nova (Mark Simonsen), Filson Pro (Olivier Gourvat), and saxMono (s.a.x. Software).
		<br/><br/>
		AppliedPoetics is coded using Python, PERL, and PHP. It is hosted on a droplet at <a href = "https://www.digitalocean.com/" target = "_new">Digital Ocean</a>. The server reboots every week on Sunday mornings at 05:00 A.M. Eastern Standard Time and may be briefly unresponsive.
		<br/><br/>
		<center>
		Want to help feed the hamster? 
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id = "donate-form">
		<input type="hidden" name="cmd" value="_s-xclick">
		<input type="hidden" name="hosted_button_id" value="A8Q7TCE829B3U">
		<input type="image" src="http://www.appliedpoetics.org/img/ap-donate-btn.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" class = "donate-form-input">
		<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
		</form>
		Click anywhere to close this notice.</center>

	</div>
</div>
<div id = "scrim" onclick = "javascript: tosPopover();"></div>
<!-- SAVE MODAL -->
<div id="saveModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="popover-title">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="popover-title" style = "border-bottom: none;">Save Text</h4>
      </div>
      <div class="modal-body">
		<P><input type = 'text' id = 'saveName' placeholder = 'Name this text.' style = "border: none; border-bottom: #222 1px solid; box-shadow: none;"></input></p>
		<p><input type = 'text' id = 'saveCmmt' placeholder = 'Leave a comment about this text.' style = "border: none; border-bottom: #222 1px solid; box-shadow:none; "></input></p>
      </div>
      <div class="modal-footer">
		<button type="button" class = "btn btn-default" data-dismiss="modal" onclick = "javascript: saveNote();">Save</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
<!-- SAVE MODAL -->

<!-- LOAD MODAL -->
<div id="loadModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="popover-title">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="popover-title" style = "border-bottom: none;">Load Text</h4>
      </div>
      <div class="modal-body" id = "loadModal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
<!-- LOAD MODAL -->

<!-- LOGIN MODAL -->
<div id="loginModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="popover-title">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="popover-title" style = "border-bottom: none;">Choose your login method</h4>
      </div>
		  <div class="modal-body" id = "loginModal-body" style = 'text-align: center;'>
			<div class = "login-type">
				<a href = "#" class="btn btn-block btn-social btn-facebook" onclick = "javascript: chooseLogin('Facebook');" data-dismiss = "modal">
					<span class="fa fa-facebook"></span>Facebook
				</a>
			</div>
			<div id = "googleBtn" class = "login-type">
				<a class="btn btn-block btn-social btn-google" onclick = "javascript: chooseLogin('Google');" data-dismiss = "modal" data-dismiss="modal">
					<span class="fa fa-google"></span>Google
				</a>
			</div>
		  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
<!-- LOGIN MODAL -->

<!-- LOGIN MODAL -->
<div id="updateModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="popover-title">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="popover-title" style = "border-bottom: none;">New Features!</h4>
      </div>
		  <div class="modal-body" id = "updateModal-body">
			<div style = "text-align: center;">
				<div><img src = "/img/ap-menu-loading.gif"></div>
			</div>
		  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
<!-- LOGIN MODAL -->                                                                                                                                            
<script>startApp();</script>
<input type = 'hidden' value = '' id = 'userID'></input>
<div id = "loading"><img src = 'img/ap-type-loading.gif' width="101" height="159"></div>
<div id = 'startup-scrim' style = 'display: none;' onclick = 'javascript: firstTime();'><img src = 'img/ap-first-time-overlay.png' style = 'position: absolute; width: 100%;' id = 'firstTimeImg'><img src = 'img/ap-first-time-overlay-step1.png' style = 'display: none; position: absolute; width: 60%; right:0; bottom: 0;' id = 'step-one'><img src = 'img/ap-first-time-overlay-step2.png' style = 'display: none; position: absolute; width: 60%; right:0; bottom: 0;' id = 'step-two'><img src = 'img/ap-first-time-overlay-step3.png' style = 'display: none; position: absolute; width: 60%; right:0; bottom: 0;' id = 'step-three'><img src = 'img/ap-first-time-overlay-step4.png' style = 'display: none; position: absolute; width: 60%; right:0; bottom: 0;' id = 'step-four'></div>
<?php echo "<input type = 'hidden' value = '".date("Y/m/d H:i:s", filemtime('majorupdate.php'))."' id = 'lastUpdate'>"; ?>
</body>
</html>