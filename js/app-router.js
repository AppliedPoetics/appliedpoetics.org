function prepareText(incText){
    return escape(incText.replace(/"/g,"'"));
}

function parseForm(incForm){
    var fields = {};
    //OPTION FORM FIELDS
    for(var i=0;i<=incForm.elements.length-1;i++){
        var elem  = incForm.elements[i];
        switch(elem.type){
            case 'submit':
                break;
            default:
                fields[elem.id] = elem.value;
        }
    }
    //THE TEXT
    fields['text'] = prepareText($('#editContent').val());
    return fields;
}
function processForm(incForm){
    var globalTimeout = 600000;
    var fields = parseForm(incForm);
    console.log(fields);
    $('#loading').show();
    $.ajax({
        url: 'php/Processor.php',
        type: 'POST',
        timeout: globalTimeout,
        data: fields,
        dataType: 'text',
        success: function(data){
            $('#editContent').val(data);
            $('#loading').hide();
        },
        error: function(xhr,ajaxOptions,thrownError){
            console.log(xhr.status + " " + xhr.responseText);
        }
    });
    return false;
}