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
	/*  CONTACT FORM                                           */
	/*---------------------------------------------------------*/

	$("#contact").submit(function (e) {

		e.preventDefault();
		var btn = $('#submit');
		btn.button('loading');
		setTimeout(function () {

			btn.button('reset');

			var b = 'border-error';
			var ap = 'animated-error pulse';
			var bap = 'border-error animated-error pulse';

			var n = '#name';
			var name = $("#name").val();

			var e = '#email';
			var email = $("#email").val();

			var m = '#message';
			var message = $("#message").val();
			
			var dataString = 'name=' + name + '&email=' + email + '&message=' + message;

			function isValidEmail(emailAddress) {
				var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
				return pattern.test(emailAddress);
			}

			if (name.length <= 1) {
				$(n).addClass(bap);
				setTimeout(function () {
					$(n).removeClass(ap);
				}, 1000);
			} else { $(n).removeClass(b);}

			if (isValidEmail(email) === false) { $(e).addClass(bap);
				setTimeout(function () {
					$(e).removeClass(ap);
				}, 1000);
			} else { $(e).removeClass(b);}

			if (message.length <= 1) { $(m).addClass(bap);
				setTimeout(function () {
					$(m).removeClass(ap);
				}, 1000);
			} else { $(m).removeClass(b);}

			if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {

				$.ajax({
					type: "POST",
					url: "assets/php/sendmail.php",
					data: dataString,
					success: function () {
						$(btn).fadeOut(500);
						$('.success').fadeIn(1000);
						$(n,e,m).removeClass(b);
					}
				});

			}
			return false;
		}, 800);

	});


	/*---------------------------------------------------------*/
	/*  MAILCHIMP SUBSCRIPTION                                 */
	/*---------------------------------------------------------*/

	$('#subscription').ajaxChimp({
		callback: callbackFunction,
		url: MailChimpUrl
	});

	function callbackFunction (resp) {

		if(resp.result === 'success') {
			$('.subscription-success')
				.html('Please check your e-mail to complete the subscription')//resp.msg
				.fadeIn(500);
			$('.spam').fadeOut(500);
			$('.subscription-failed').fadeOut(500);

		} else if(resp.result === 'error') {

			$('#subscription').addClass('animated-error pulse');
			setTimeout(function () {
				$('#subscription').removeClass('animated-error pulse');
			}, 1000);
			$('.spam').fadeOut('300', function () {
				$('.subscription-failed')
				.html('Please enter unsubscribed or valid e-mail address')
				.fadeIn(1000);
			});
			$('.subscription-success').fadeOut(500);
		}
	}


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
      'from_email': 'contato@delaedele.com.br',
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
         console.log(response); // if you're into that sorta thing
      });
}

