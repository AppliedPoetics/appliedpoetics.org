      var move = false;
      function createTextAreaWithLines(id)
      {
		var elementExists = document.getElementById("lineNumbers");
		if (elementExists == null){
        var el = document.createElement('TEXTAREA');
        var ta = document.getElementById(id);
		} else {
		$('#lineNumbers').remove();
		var el = document.createElement('TEXTAREA');
		var ta = document.getElementById(id);
		}
        var string = '';
        for(var no=1;no<10000;no++){
          if(string.length>0)string += '\n';
          string += no;
        }
       
        el.className      = 'textAreaWithLines';
		el.id 			  = 'lineNumbers';
        el.style.height   = $('#text-console').height() * .97 + "px";
        el.style.width    = "5%";
        el.style.position = "absolute";
        el.style.overflow = 'hidden	';
        el.style.textAlign = 'right';
        el.style.paddingRight = '0.2em';
        el.innerHTML      = string;  //Firefox renders \n linebreak
        //el.innerText      = string; //IE6 renders \n line break
        el.style.zIndex   = 0;
        ta.style.zIndex   = 1;
        ta.style.position = "relative";
        ta.parentNode.insertBefore(el, ta.nextSibling);
		ta.style.height = $('#text-console').height() * .96 + "px";
		ta.style.width = $('#text-console').width() * 1.05 + "px";
		//ta.style.paddingRight = "175px";
		ta.style.paddingRight = $('#text-console').width() * .115 + "px";
        setLine();
        ta.focus();
       
        ta.onkeydown    = function() { setLine(); }
        ta.onmousedown  = function() { setLine(); move=true; }
        ta.onmouseup    = function() { setLine(); move=false; }
        ta.onmousemove  = function() { if(move){setLine();} }
		ta.onscroll = function() { setLine(); }
		//if (ta.addEventListener) {
		// IE9, Chrome, Safari, Opera
		//ta.addEventListener("mousewheel", MouseWheelHandler, false);
		// Firefox
		//ta.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
		//}
		//IE 6/7/8
		//else ta.attachEvent("onmousewheel", MouseWheelHandler);
		
        function setLine(){
          el.scrollTop   = ta.scrollTop;
          el.style.top   = (ta.offsetTop) + "px";
          el.style.left  = (ta.offsetLeft - 27) + "px";
        }
		function MouseWheelHandler(e) {
			if(move){setLine();} move=true;
		}
      }