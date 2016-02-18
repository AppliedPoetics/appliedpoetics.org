$(document).ready(function(){
	
	var lines = 205;
	setInterval(function(){
    //$('#editContent').keydown(function(e) {
		var newLines = $('#editContent').val().split("\n").length;
		
        if(newLines >= lines) {
			sweepLines();
			console.log("Warning: sweeping extra lines...");
            //return false;
        }
        else {
			//document.getElementById("entryContent-warning").style.visibility = "hidden";
			document.getElementById("entryContent-warning").style.opacity = 0;
        }
    },3500);
	
	function sweepLines(){
	
	var linesWritten = $('#editContent').val().split("\n").length;
	var cutLines = lines;
	
		if(linesWritten>cutLines)
		{
			trimLines = $('#editContent').val().split("\n");
			$('#editContent').val(trimLines.slice(0,cutLines-5).join("\n"));	
			//document.getElementById("entryContent-warning").style.visbility = "visible";
			document.getElementById("entryContent-warning").style.opacity = 1;
		} else {
			
		}
	}
	
});
   