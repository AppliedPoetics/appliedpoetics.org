$(document).ready(function () {
    $('.dropdown-content a').each(function(){
        var fxID = $(this).attr('id');
        if(fxID !== "wordCount" && fxID !== "charCount" && fxID !== "lineCount"){
            var popoverID = $(this).attr('aria-describedby');
            if($('#' + popoverID + '.share').length < 1){
                $(this).attr('data-content',$(this).attr('data-content') + '<hr><div class = "share">Share this function: <a href = "#" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=http%3A//www.appliedpoetics.org/?ref='+fxID+'\',\'apshare\',\'width = 550, height = 250\'); return false"><img src = "img/ap-facebook-ico.png">to Facebook</a><a href = "#" onclick="window.open(\'https://twitter.com/home?status=http%3A//www.appliedpoetics.org/?ref='+fxID+'\',\'apshare\',\'width = 550, height = 250\'); return false"><img src = "img/ap-twitter-ico.png">to Twitter</a></div>');
            }
        }
    });
    $('[data-toggle="popover"]').popover({
        trigger: 'manual',
        placement: function(e,item){
            var offset = $(item).offset();
            if(offset.left >= ($(window).width()-350)){
                return "left";
            } else {
                return "right";
            }
        }
    });
    $('.dropdown-content a').on('focus', function(event) {
        $('.dropdown-content a').not(this).popover('hide');
        $(this).popover('show');
    });
    $('.dropdown').mouseleave(function(event){
        var menu = $(this).children()[1];
        var isMenuVisible = $(this).is(":visible");
        //TO-DO: FIX MENU MOUSEOUT
        if(!isMenuVisible){
            menu = $(menu).attr('id');
            $('#' + menu + ' [data-toggle="popover"]').popover('hide');
        }
    });
});

function powerball(){
    var balls = []
    var powerball = "";
    if(balls.length < 5) {
        $.ajax({
            dataType: 'json',
            url: "https://data.ny.gov/api/views/d6yy-54nr/rows.json",
            success: function (data) {
                var obj = data;
                balls = obj.data[0][9].split(" ");
                powerball = balls[5].toString();
                balls.splice(-1,1);
                $('#powerball_numbers').html(balls.join(" ") + " <div style = 'color:#d72e27; display: inline-block;'>"+powerball+"</div>");
            }
        });
    } else {
        $('#powerball_numbers').html(balls + ",<div style = 'color: #d72e27; display: inline-block;'>"+powerball+"</div>");
    }
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