
jQuery(document).ready(function($) {
    

	var fadeStart=0,fadeUntil=700,fading = $('#home-panel-about1');

$(window).bind('scroll', function(){
	
	
	
	
    var offset = $(document).scrollTop(),opacity=0;
	
	$('#home-panel-about1').css('z-index',0);
	
	
	if(offset < 5){
	$('#home-panel-about1').css('z-index',2);	
		
	}
	
	
    if( offset<=fadeStart ){
        opacity=1;
    }else if( offset<=fadeUntil ){
        opacity=1-offset/fadeUntil;
    }
    fading.css('opacity',opacity);
	
	if(fading.scrollTop()>=fadeUntil){
		fading.hide();
		
	}
	
	
});


$(".come_on_over").on("click", function( event ) {
    
    event.preventDefault();
	

    $("body, html").animate({ 
        scrollTop: $( $(this).attr('href') ).offset().top 
    }, 1000);
    
});


	  function fade() {
        $('.srvices-center-small-square').each(function() {
            /* Check the location of each desired element */
            var objectBottom = $(this).offset().top + $(this).outerHeight();
            var windowBottom = $(window).scrollTop() + $(window).innerHeight();
            
			
			
			
            /* If the object is completely visible in the window, fade it in */
            if (objectBottom < windowBottom) { //object comes into view (scrolling down)
                if ($(this).css('opacity')==0) {$(this).fadeTo(1000,1);}
            } else { //object goes out of view (scrolling up)
                if ($(this).css('opacity')==1) {$(this).fadeTo(1000,0);}
            }
        });
    }
    fade(); //Fade in completely visible elements during page-load
    $(window).scroll(function() {fade();
	
	}); //Fade in elements during scroll
	
	
	
/*gallery image hover effects */	
	
  if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $('body').on('mouseenter','.img',function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .on('mouseleave','.img',function(){
            $(this).removeClass("hover");
        });
    }	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});









