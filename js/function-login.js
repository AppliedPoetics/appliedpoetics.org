//FACEBOOK

function fbLogin() {
	FB.login(function(response) {
		FB.api('/me', function(response) { 
			$('#login-btn').html('<img src = "http://graph.facebook.com/' + response.id + '/picture?type=normal" height: 39px;> Hi there, ' + response.name);
			$('#saveCtrl').show();
			$('#loadCtrl').show();
				$.ajax({
					url: '../accounts/ap-users.php',
					type: 'POST',
					data: { user: response.id, email: response.email, media: 'Facebook' },
					dataType: 'text'
				});
		$('#userID').val(response.id);
		});
	}, {scope: 'email'});
}
function fbLogout() {
	$('#saveCtrl').hide();
	$('#loadCtrl').hide();
	FB.logout(function(response) {
	  $('#userID').val("");
	  $('#login-btn').html("Log In")	
	});
}
function startFBLogin() {
	FB.getLoginStatus(function(response) {
		getFBLogin(response)
	});
}
function getFBLogin(response) {	
	if (response.status === 'connected') {
      // Logged into your app and Facebook.
		FB.api('/me', function(response) { 
			$('#login-btn').html('<div style = "display: inline-block;"><a class="btn btn-social-icon btn-xs btn-facebook"><span class="fa fa-facebook"></span><img src = "http://graph.facebook.com/' + response.id + '/picture?type=normal" height: 22px;></a>');
			$('#saveCtrl').show();
			$('#loadCtrl').show();
			$('#userID').val(response.id);
		});
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
	  $('#userID').val("");
	  fbLogin();
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
	  fbLogin();
    }
}

//FACEBOOK

//TWITTER

function startTWLogin(){
	try{
		$.get('../accounts/ap-twitter-auth.php', function(data){
			var id = data.ID; 
			var imgURL = data.PICTURE; 
			var email = data.EMAIL;
				$.ajax({
					url: '../accounts/ap-users.php',
					type: 'POST',
					data: { user: id, email: email, media: 'Twitter' },
					dataType: 'text'
				});
		$('#login-btn').html('<div style = "display: inline-block;"><a class="btn btn-social-icon btn-xs btn-twitter"><span class="fa fa-twitter"></span><img src = "'+ imgURL +'" height: 22px;></a>');
			$('#saveCtrl').show();
			$('#loadCtrl').show();
			$('#userID').val(id);
		},"json");
	} catch(err) {
	}
}

//TWITTER

//GOOGLE

function startGoogleLogin(id,email,imgURL){
	$.ajax({
				url: '../accounts/ap-users.php',
				type: 'POST',
				data: { user: id, email: email, media: 'Google' },
				dataType: 'text'
			});
	$('#login-btn').html('<div style = "display: inline-block;"><a class="btn btn-social-icon btn-xs btn-google"><span class="fa fa-google"></span><img src = "'+ imgURL +'" height: 22px;></a>');
		$('#saveCtrl').show();
		$('#loadCtrl').show();
		$('#userID').val(id);
}

//GOOGLE

//MSFT

//function startMSFTLogin(){
	WL.Event.subscribe("auth.login", startMSFTLogin);
    WL.init({
        client_id: '000000004C19EC80',
		redirect_uri: 'http://dev.appliedpoetics.org/accounts/ap-account-rest.php',
		scope: "wl.signin", 
		response_type: "token"
    });
    function startMSFTLogin() {
		session = WL.getSession();
        if (session === null) {
			WL.login({scope: "wl.signin"});
		} else {
			
		}
        WL.api({
            path: "me",
            method: "GET"
        }).then(
        function (response) {
            console.log(response.first_name);
        },
        function (responseFailed) {
            console.log('failure');
        }
        );
}
//}

//MSFT

//OPENID

//OPENID

//EMAIL

//EMAIL

//ROUTING

function chooseLogin(loginSrc){
	$('#login-btn').html('<img src = "/img/ap-menu-loading.gif" style = "margin-right: 5px; height: 4px;">');
	if(loginSrc=="Facebook"){
		startFBLogin();
	}
	if(loginSrc=="Twitter"){
		startTWLogin();
	}
	if(loginSrc=="Google"){
		
	}
	if(loginSrc=="Windows"){
		startMSFTLogin();
	}
	if(loginSrc=="OpenID"){
		
	}
}

//ROUTING