function runTool(inc_form) {
	$('#loading').show();
	// PRE-RUN FUNCTIONS
		prettyText();
	// GET VALUES
	var inc_text = $('#editContent').val();
	var lttr = $('#lttr').val();
	var cmd = $('#cmd').val();
	var granular = $('#granular').val();
	var outwords = $('#outwords').val();
	var nwords = $('#nwords').val();
	var word = $('#word').val();
	inc_text = inc_text.replace(/"/g, "'");
	inc_text = escape(inc_text);
	// UNDO STACK
		stackMe(inc_text);
	if(cmd == 'powerball')
	{
		lttr = $('#powerball').text();
	}
	if(cmd == 'regexp')
	{
		lttr = '"'+$('#lttr').val()+'"';
	}
	if(cmd == 'travesty' || cmd == 'markov')
	{
		//PERL
		$.ajax({
			url: 'ap-pl.php',
			type: 'POST',
			timeout: 120000,	
			data: { cmd: cmd,txt: inc_text, granular: granular, outwords: outwords }, 
			dataType: 'text',
			success: function(data) { $('#editContent').val(data); unstackMe(data); $('#loading').hide();},
			error: function(xhr,ajaxOptions,thrownError) { console.log(xhr.status + " " + xhr.responseText); }
		});
	} else if (cmd == 'concordance') {
		// THREE-PARAMETER PYTHON
		$.ajax({
			url: 'ap-py.php',
			type: 'POST',
			timeout: 120000,
			data: { cmd: cmd, txt: inc_text, lttr: nwords, word: word },
			dataType: 'text',
			success: function(data) { $('#editContent').val(data); unstackMe(data); $('#loading').hide();},
			error: function(xhr,ajaxOptions,thrownError) { console.log(xhr.status + " " + xhr.responseText) }
		});
    } else if (cmd == 'quotes' || cmd == 'reverser') {
		// ONE-PARAMETER PYTHON
		$.ajax({
			url: 'ap-py.php',
			type: 'POST',
			timeout: 120000,
			data: { cmd: cmd, txt: inc_text },
			dataType: 'text',
			success: function(data) { $('#editContent').val(data); unstackMe(data); $('#loading').hide();},
			error: function(xhr,ajaxOptions,thrownError) { console.log(xhr.status + " " + xhr.responseText); }
		});
	} else {
		// REGULAR TWO-PARAMETER PYTHON
		$.ajax({
			url: 'ap-py.php',
			type: 'POST',
			timeout: 120000,	
			data: { cmd: cmd, txt: inc_text, lttr: lttr }, 
			dataType: 'text',
			success: function(data) { $('#editContent').val(data); unstackMe(data); $('#loading').hide();},
			error: function(xhr,ajaxOptions,thrownError) { console.log(xhr.status + " " + xhr.responseText); }
		});
	}
	$('.dropdown-content').hide();
	// REDO STACK
	expandMenu('all');
	return false;
}