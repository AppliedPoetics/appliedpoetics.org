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