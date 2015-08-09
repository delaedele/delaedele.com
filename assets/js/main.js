'use strict';

/*---------------------------------------------------------*/
/*  LOADER                                                 */
/*---------------------------------------------------------*/

jQuery(window).load(function () {


	$(".preloader").delay(800).fadeOut("slow");

	// SPECIAL VERSION
	setTimeout(function (){$('.header-special-version .intro').addClass('animated fadeInLeft')}, 1000);
	setTimeout(function (){$('.hand-phone').delay(1000).queue(function () {
		$(this).addClass('animated fadeInRight')}, 200);
	});

	// PHONES VERSION
	setTimeout(function (){$('.header-phones-version .intro, .header-minimal-version .intro').addClass('animated fadeInDown')}, 1000);
	setTimeout(function (){$('.phone-center').delay(1000).queue(function () {
		$(this).addClass('animated fadeInUp')}, 100);
	});
	setTimeout(function (){$('.phone-left').delay(1500).queue(function () {
		$(this).addClass('animated fadeInRight')}, 100);
	});
	setTimeout(function (){$('.phone-right').delay(1500).queue(function () {
		$(this).addClass('animated fadeInLeft')}, 100);
	});
	setTimeout(function (){$('header .shadow-left').delay(1500).queue(function () {
		$(this).addClass('animated fadeInRight')}, 100);
	});
	setTimeout(function (){$('header .shadow-right').delay(1500).queue(function () {
		$(this).addClass('animated fadeInLeft')}, 100);
	});

});


/*---------------------------------------------------------*/
/*  DOCUMENT READY                                         */
/*---------------------------------------------------------*/

jQuery(document).ready(function () {


	/*---------------------------------------------------------*/
	/*  ONE PAGE NAV                                           */
	/*---------------------------------------------------------*/

	 // Navigation for desktop bar
	$('#menu').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		easing: 'swing'
	});


	/*=========================================================*/
	/*  LOCAL SCROLL                                           */
	/*=========================================================*/

	$('.localScroll').localScroll({
		duration: 1000
	});

	$('.localScroll-slow').localScroll({
		duration: 2000
	});


	/*---------------------------------------------------------*/
	/*  CLOSE FULLSCREEN MENU WHEN CLICK                       */
	/*---------------------------------------------------------*/

	$(".localScroll").find("li").click(function () {
		$(".overlay-close").click();
	});

	/*---------------------------------------------------------*/
	/*  ACTIVE BUTTON TAB                                      */
	/*---------------------------------------------------------*/

	$('.buttons-tab li').on('click',function (){
		$('.buttons-tab li').removeClass('active');
		$(this).addClass('active');
	});

	/*---------------------------------------------------------*/
	/*  DECLARE IF IT IS A DEVICE                              */
	/*---------------------------------------------------------*/

	var onMobile = false;
	if( navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|IEMobile/i) ) {
		var onMobile = true;
	}

	/*---------------------------------------------------------*/
	/*  ONLY FOR DEVICES                                       */
	/*---------------------------------------------------------*/

	if( onMobile == true ) {
		$('.pulse-hover, header ul li i, .responsive-nav li i, .owl-prev, .owl-next, .social li a, .links li').addClass('no-pulse');

	}


	/*---------------------------------------------------------*/
	/*  ONLY DESKTOP                                           */
	/*---------------------------------------------------------*/

	if ( onMobile == false ) {

		/*---------------------------------------------------------*/
		/*  WOW                                                    */
		/*---------------------------------------------------------*/

		var wow = new WOW({
			boxClass:     'wow',      // default
			animateClass: 'animated', // default
			mobile: false
		});
		wow.init();

	}

}); //END DOCUMENT READY



/*---------------------------------------------------------*/
/*  WINDOW SCROLL                                          */
/*---------------------------------------------------------*/

jQuery(window).scroll(function () {

	/*---------------------------------------------------------*/
	/*  NAVBAR                                                 */
	/*---------------------------------------------------------*/
		
	if ( $(window).scrollTop() >= $('header').outerHeight()-100) {
		$('.responsive-nav').css('top','0');
		$('.responsive-nav').css('opacity','1');
	}
	else{
		$('.responsive-nav').css('top',-$('.responsive-nav').outerHeight()+'px');
		$('.responsive-nav').css('opacity','0');
	}


	/*---------------------------------------------------------*/
	/*  OPACITY WHEN SCROLLING                                 */
	/*---------------------------------------------------------*/

	var fadeS = $('.fadeScroll');
	var st = $(this).scrollTop();
	fadeS.each(function () {
		var offset = $(this).offset().top;
		var height = $(this).outerHeight();
		offset = offset + height / 2;
		$(this).css({
			'opacity': (1 - ((st - offset + 300) / 200))
		});
	});


}); //END WINDOW SCROLL





/*---------------------------------------------------------*/
/*  NAVBAR LI AUTOHEIGHT                                   */
/*---------------------------------------------------------*/

// Auto counter for calculate the elements of the fullscreen menu
function contactNum() {
 
	var numberOfElementsList = $('nav .localScroll li').filter(function() {
		return $(this).css('display') !== 'none';
	}).length;


	var win = $(this); //this = window
	if (win.height() <= 992) {
		var calculation = (100/numberOfElementsList)+'%';
		$('nav .localScroll li').css('height', calculation);

	}
	else {
		var calculation = 100/numberOfElementsList;
		$('nav .localScroll li').css('height', calculation);
	}

};

contactNum();

$(window).on('resize', function(){
	contactNum();
});

// NAVBAR LI AUTOHEIGHT END


/* Send mail */

function sendMail() {
    var requested_by = $('#mc-email').val();
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
      'key': '56ljFfsD9LPL-fFAbMDtTQ',
      'message': {
      'from_email': requested_by,
      'to': [
              {
               'email': 'contato@delaedele.com.br',
               'name': 'Contato DD',
               'type': 'to'
              }
            ],
      'autotext': 'true',
      'subject': 'Solicitação de convite',
      'html': requested_by
      }
      }
      }).done(function(response) {
        $('#newsletter article').hide();
		$('#success-message').show();
      }).fail(function(){
      	$('#newsletter article').hide();
		$('#fail-message').show();
      });
}

