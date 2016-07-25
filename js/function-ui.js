var backStack = [];
var fwdStack = [];
var stackPointer = 0;
var step = 1;
var preHelpText = "";

$(document).on('click', function(event){
	$('.dropdown-content').not(this).popover('toggle');
	$(event.target).popover('toggle');
	try{
		var width = $(event.target).popover().width();
		var id = $(event.target).context.id;
		var parentid = $('#'+id).last().parent().prop('id');
		if(parentid){
			var offsetleft = $('#'+parentid).offset();
			if( (width+offsetleft.left) >= ($(window).width() - 150) ){
				var popoverID = $(event.target).attr('aria-describedby');
				$('#'+popoverID).attr('class','popover fade left in');
				$('#'+popoverID).css({left: offsetleft.left*-.25});
				console.log(popoverID + ": Outside screen size...");
			} else {
				//alert((width + offsetleft.left) + " " + ($(window).width() - 150) );
			}
		}
	}
	catch(err) {
		console.log(err.toString());
	}
});

$(document).ready( function () {
	$('#undoCtrl').popover('hide');
	$('#redoCtrl').popover('hide');
	$('#scrollTop').popover('hide');
	$('#scrollBottom').popover('hide');
	$('#loading img').css({marginLeft: ($(document).width() - 101)/2 + "px", marginTop: ($(document).height()/2.5) +"px"});
});

$(document).ready( function () {
	$('.dropdown-content a').each(function(){
		var fxID = $(this).attr('id');
		if(fxID !== "wordCount" && fxID !== "charCount"){
			var popoverID = $(this).attr('aria-describedby');
			if($('#' + popoverID + '.share').length < 1){
				$(this).attr('data-content',$(this).attr('data-content') + '<div class = "share">Share this function: <a href = "#" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=http%3A//www.appliedpoetics.org/?ref='+fxID+'\',\'apshare\',\'width = 550, height = 250\'); return false"><img src = "img/ap-facebook-ico.png">to Facebook</a><a href = "#" onclick="window.open(\'https://twitter.com/home?status=http%3A//www.appliedpoetics.org/?ref='+fxID+'\',\'apshare\',\'width = 550, height = 250\'); return false"><img src = "img/ap-twitter-ico.png">to Twitter</a></div>');
			}
		}
	});
});

function expandMenu(menuName){
	var menus = ["oulipo-menu","grammar-menu","number-menu","pop-menu","algo-menu","stat-menu","text-menu","share-menu"]
	if(menuName == "all")
	{
		
	} else {
		var index = menus.indexOf(menuName+"-menu");
		menus.splice(index,1);
		$('#'+menuName+'-menu').show();
		document.getElementById(menuName+'-menu').style.visibility = "visible";
	}
		for(i=0;i<menus.length;i++)
		{
			collapseMenu(menus[i]);
		}
}

function collapseMenu(menuName){
	if(menuName != "share-menu"){
		document.getElementById(menuName).style.visibility = "hidden";
		$('#share-menu').popover('hide');
	}
	//$('#'+menuName+' .popover').toggle();
	$('#'+menuName+' .popover').popover('hide');
}

function prettyText() {
	var currentText = $("#editContent").val();
	var sanitizeText = currentText
		.replace(/[\u2018\u2019]/g, "'")
		.replace(/[\u201C\u201D]/g, '"')
		.replace(/[\u2026]/g,"...")
		.replace(/[\u2012-\u2014]/g,"-");
		$("#editContent").val(sanitizeText);
	console.log('Sanitizing UTF-8...');
}

function clearScreen(form){
	$('#editContent').val('');
	$('.popover').popover('hide');
	expandMenu('all');
}

function execUndo() {
	if(stackPointer > 0) {
		$('#editContent').val(unescape(backStack[stackPointer-1]));
		stackPointer--;
	} else {
		
	}
}

function execRedo() {
	if(stackPointer < fwdStack.length) {
		stackPointer++;
		if(stackPointer <= fwdStack.length){
			$('#editContent').val(unescape(fwdStack[stackPointer-1]));
		}
	} else {
		
	}
	
}

function tosPopover() {
	if($('#tos-popover').is(":visible")){
		$('#tos-popover').hide();
		$('#scrim').hide();
	} else {
		$('#tos-popover img').css({marginLeft: ($('#tos-popover').width()/2)/$('#text-console').width() + "%", marginTop: ($('#tos-popover').height()/2)/$(document).height() +"%" });
		$('#tos-text').css({marginTop: ((($('#tos-popover').height()/2)/$(document).height()/3) * 100) -2.3 + "%" });
		$('#tos-popover').show();
		$('#scrim').show();
	}
}

function stackMe(inc_text) {
	if(backStack.length > 4) {
		backStack.splice(backStack.length,-1);
		stackPointer--;
	}
	backStack.push(inc_text);
	stackPointer++;
}
function unstackMe(inc_text) {
	if(fwdStack.length > 4) {
		fwdStack.splice(fwdStack.length,-1);
	}
	fwdStack.push(inc_text);
}

function firstTime() {
	if(step==1){
		preHelpText = $('#editContent').val();
	}
	$('#startup-scrim').show();
	$('#startup-scrim').css('opacity','.4');
	$('#firstTimeImg').hide();
	firstTimeSteps(step);
	step += 1;
	if(step>5){
		step = 1;
	}
}

function firstTimeSteps(step) {
	if(step==1){
		$('#editContent').val('MR. UTTERSON the lawyer was a man of a rugged countenance, that was never lighted by a smile; cold, scanty and embarrassed in discourse; backward in sentiment; lean, long, dusty, dreary, and yet somehow lovable. At friendly meetings, and when the wine was to his taste, something eminently human beaconed from his eye;something indeed which never found its way into his talk, but which spoke not only in these silent symbols of the after-dinner face, but more often and loudly in the acts of his life. He was austere with himself; drank gin when he was alone, to mortify a taste for vintages; and though he enjoyed the theatre, had not crossed the doors of one for twenty years. But he had an approved tolerance for others; sometimes wondering, almost with envy, at the high pressure of spirits involved in their misdeeds; and in any extremity inclined to help rather than to reprove.');
		expandMenu('oulipo');
		$('#step-one').show();
	} else if (step==2) {
		$('#step-one').hide();
		$('#belleabsente').click();
		$('#lttr').val('Hyde');
		$('#step-two').show();
	} else if (step==3) {
		$('#step-two').hide();
		$('#step-three').show();
	} else if (step==4) {
		$('#step-three').hide();
		$.ajax({
			url: 'ap-py.php',
			type: 'POST',
			timeout: 50000,	
			data: { cmd: $('#cmd').val(), txt: $('#editContent').val(), lttr: $('#lttr').val() }, 
			dataType: 'text',
			success: function(data) { $('#editContent').val(data);},
			error: function(xhr,ajaxOptions,thrownError) { console.log(xhr.status + " " + xhr.responseText); }
		});
		$('#step-four').show();
		collapseMenu('oulipo-menu');
	} else {
		collapseMenu('oulipo-menu');
		$('#step-four').hide();
		$('#step-three').hide();
		$('#step-two').hide();
		$('#step-one').hide();
		$('#editContent').val(preHelpText);
		$('#startup-scrim').hide();
	}
}

function functionLink(fx) {
	$('#'+fx).click(); 
}

function shareTool(shareForm) {
	var tool = $('#util').val();
	$('#shareFld').val('http://www.appliedpoetics.org/?ref='+tool);
	return false;
}

function restrictNumberKeys(formElement) {
	var input = $(formElement);
	input.on('keydown', function(event) {
		var key = event.charCode || event.keyCode;
		if(key >= 48 &&  key <= 57 || key == 8 || key == 46 || key == 37 || key == 39 || key >= 96 && key <= 105 || key ==9){
			return key;
		} else {
			return false;
		}
	});
}

function saveNote(){
	if( $('#userID').val() ){
		$.ajax({
				url: '../accounts/ap-notes.php',
				type: 'POST',
				data: { user: $('#userID').val(), name: $('#saveName').val(), comment: $('#saveCmmt').val(), txt: $('#editContent').val() },
				dataType: 'text',
				success: function(data) {$('#entryContent-warning').html($('#saveName').val() + " saved to user file."); document.getElementById("entryContent-warning").style.opacity = 1;},
				error: function(xhr,ajaxOptions,thrownError) { console.log(xhr.status + " " + xhr.responseText); }
			});
		$('#saveCtrl').html("<span class = 'glyphicon glyphicon-floppy-saved'></span>");
		setInterval(function(){ 
			document.getElementById("entryContent-warning").style.opacity = 0;
			$('#saveCtrl').html("<span class = 'glyphicon glyphicon-save-file'></span>");
		},3500);
	} else {
		$('#entryContent-warning').html("Cannot save file—you haven't connected your Facebook account!"); 
		document.getElementById("entryContent-warning").style.opacity = 1;
		setInterval(function(){ 
			document.getElementById("entryContent-warning").style.opacity = 0;
			$('#saveCtrl').html("<span class = 'glyphicon glyphicon-save-file'></span>");
		},3500);
	}
}

function loadNotes(){
	$.ajax({
		url: '../accounts/ap-notes-load.php',
		type: 'POST',
		data: { user: $('#userID').val() },
		dataType: 'text',
		success: function(data) { $('#loadModal-body').html(data); },
		error: function(xhr,ajaxOptions,thrownError) { console.log(xhr.status + " " + xhr.responseText); }
	});
}

function loadFile(filename){
	$.ajax({
		url: '../accounts/' + $('#userID').val() + '/' + filename,
		type: 'GET',
		success: function(data) { $('#editContent').val(data.replace(new RegExp("\\\\", "g"), "")); }
	});
}

function delFile(filename){
	$.ajax({
		url: '../accounts/ap-notes-mgmt.php',
		type: 'POST',
		data: { user: $('#userID').val(), file: filename, act: 'rm' },
		success: function(data) { $('#entryContent-warning').html(filename + " deleted successfully.") },
		error: function(xhr,ajaxOptions,thrownError) { console.log(xhr.status + " " + xhr.responseText); } 
	});
}