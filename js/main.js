jQuery(function($) {'use strict',

	$('#nameInput','#phoneInput','#messageInput').keypress(function (e) {
		if (e.keyCode == 13) {
		var name = $('#nameInput').val();
		var phone = $('#phoneInput').val();
		var message = $('#messageInput').val();
		var n = Date.now();
		firebase.database().ref('wishes/' +name+n ).set({
			name:name, 
			phone:phone, 
			message:message});
		$('#nameInput').val('');
		$('#phoneInput').val('');
		$('#messageInput').val('');
		}
	});

	$('#submit').click(function (e) {

/*		var config = {
    	apiKey: "AIzaSyDzmb31vP3z1N0W24Qfh0xN-Eku-bsaH7M",
    	authDomain: "sanvi-4637b.firebaseapp.com",
    	databaseURL: "https://sanvi-4637b.firebaseio.com",
    	projectId: "sanvi-4637b",
    	storageBucket: "sanvi-4637b.appspot.com",
    	messagingSenderId: "207055286351"
  	};
  	firebase.initializeApp(config);*/

		var name = $('#nameInput').val();
		var phone = $('#phoneInput').val();
		var message = $('#messageInput').val();
		var n = Date.now();
		firebase.database().ref('wishes/' +name+n ).set({
			name:name, 
			phone:phone, 
			message:message});
		$('#nameInput').val('');
		$('#phoneInput').val('');
		$('#messageInput').val('');
	});

	$(window).load(function() {

		var wishes = [];

		var query = firebase.database().ref("wishes").orderByKey();
		query.once("value")
  			.then(function(snapshot) {
    		snapshot.forEach(function(childSnapshot) {
      		// key will be "ada" the first time and "alan" the second time
      		var key = childSnapshot.key;
      		// childData will be the actual contents of the child
      		wishes.push(childSnapshot.val());
  			});

  			var innerHtml = "";
		for(var i = 0; i < wishes.length; ++i) {
		if(i==0) {
  			innerHtml = innerHtml + '<div class="item active">';
			innerHtml = innerHtml + '<ul>';
		}

		innerHtml = innerHtml + '<li style="margin-bottom:35px;max-width: 250px;">'
		innerHtml = innerHtml + '<h5 style="padding-right: 20px;text-transform: none;">' + wishes[i].message;
		innerHtml = innerHtml + '</h5> <br/>';
		innerHtml = innerHtml + '<h4 style="text-align: left;padding-right: 35px;">- ' + wishes[i].name; 
		innerHtml = innerHtml + '</h4></li>';

		if((i+1) % 6 === 0) {
			innerHtml = innerHtml + '</ul></div><div class="item"><ul>';
		}
		else if((i+1) === wishes.length) {
			innerHtml = innerHtml + '</ul></div>';
		}
		}

		$("#birthday-wishes").html(innerHtml);
		});
	});

	//Countdown js
	 $("#countdown").countdown({
			date: "06 May 2017 23:59:59",
			format: "on"
		},
		
		function() {
			// callback function
		});
	

	
	//Scroll Menu

	function menuToggle()
	{
		var windowWidth = $(window).width();

		if(windowWidth > 767 ){
			$(window).on('scroll', function(){
				if( $(window).scrollTop()>405 ){
					$('.main-nav').addClass('fixed-menu animated slideInDown');
				} else {
					$('.main-nav').removeClass('fixed-menu animated slideInDown');
				}
			});
		}else{
			
			$('.main-nav').addClass('fixed-menu animated slideInDown');
				
		}
	}

	menuToggle();
	
	
	// Carousel Auto Slide Off
	$('#event-carousel, #twitter-feed, #sponsor-carousel ').carousel({
		interval: false
	});


	// Contact form validation
	var form = $('.contact-form');
	form.submit(function () {'use strict',
		$this = $(this);
		$.post($(this).attr('action'), function(data) {
			$this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
		},'json');
		return false;
	});

	$( window ).resize(function() {
		menuToggle();
	});

	$('.main-nav ul').onePageNav({
		currentClass: 'active',
	    changeHash: false,
	    scrollSpeed: 900,
	    scrollOffset: 0,
	    scrollThreshold: 0.3,
	    filter: ':not(.no-scroll)'
	});


});


