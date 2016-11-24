function wordCount()
{
	var count;
		try{
			var count = $('#editContent').val().match(/\S+/g).length;
		} catch(err) {
			count = 0;
		}
		if(!count){
			count = 0;
		} else {
			
		}
		$('#wordCount').text("Word Count: " + count.toString());
}
function charCount()
{
	var count = $('#editContent').val().length;
	if(!count){
		count = 0;
	} else {
	
	}
	$('#charCount').text("Char. Count: " + count.toString() );
}
function lineCount()
{
	var chunk = parseInt(.12 * parseInt($('#editContent').width()));
	var regex = new RegExp('\\b.{1,'+chunk+'}\\b|\\s?.{1,'+chunk+'}[\r\n](.*?)|(.*?)[\r\n]\\b','g');
	try{
		var count = $('#editContent').val().match(regex);
	} catch(err){
		count = 0;
	}
	$('#lineCount').text("Line Count: " + (count.length+1).toString());
}