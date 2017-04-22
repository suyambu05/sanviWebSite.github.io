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

	var max = 150;
	$('#messageInput').keypress(function(e) {
        if (e.which < 0x20) {
            return;     // Do nothing
        }
        if (this.value.length == max) {
            e.preventDefault();
        } else if (this.value.length > max) {
            this.value = this.value.substring(0, max);
        }
    });

    $('#nameInput').keypress(function(e) {
       $("#thanksForWishes").text("");
    });

	$('#submit').click(function (e) {

		$('#nameInput').css("border-width", "");
			$('#nameInput').css("border-color", "");
			$('#nameInput').css("border-style","");
		$('#phoneInput').css("border-width", "");
			$('#phoneInput').css("border-color", "");
			$('#phoneInput').css("border-style","");
		$('#messageInput').css("border-width", "");
			$('#messageInput').css("border-color", "");
			$('#messageInput').css("border-style","");

		var name = $('#nameInput').val();
		var phone = $('#phoneInput').val();
		var message = $('#messageInput').val();
		if("" == name) {
			$('#nameInput').css("border-width", "2px");
			$('#nameInput').css("border-color", "red");
			$('#nameInput').css("border-style","solid");
		} else if ("" == phone) {
			$('#phoneInput').css("border-width", "2px");
			$('#phoneInput').css("border-color", "red");
			$('#phoneInput').css("border-style","solid");
		} else if ("" == message) {
			$('#messageInput').css("border-width", "2px");
			$('#messageInput').css("border-color", "red");
			$('#messageInput').css("border-style","solid");
		} else {
		var n = Date.now();
		firebase.database().ref('wishes/' +name+n ).set({
			name:name, 
			phone:phone, 
			message:message});
		$('#nameInput').val('');
		$('#phoneInput').val('');
		$('#messageInput').val('');
		var string = 'Thanks!! '+name+' for your Wishes - Sanvika, Check out! Wishes Section.';
		$("#thanksForWishes").text(string);
		loadFromFirebase();
		}
	});

	$(window).load(function() {
		loadFromFirebase();
		
	});

	function loadFromFirebase() {
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
	}

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

// Google Map Customization
(function(){

	var map;

	map = new GMaps({
		el: '#gmap',
		lat: 8.189224,
		lng: 77.707017,
		scrollwheel:false,
		zoom: 17,
		zoomControl : true,
		panControl : false,
		streetViewControl : false,
		mapTypeControl: true,
		overviewMapControl: false,
		clickable: false
	});

	var image = 'images/map-icon.png';
	map.addMarker({
		lat: 8.189224,
		lng: 77.707017,
		icon: image,
		animation: google.maps.Animation.DROP,
		verticalAlign: 'bottom',
		horizontalAlign: 'center',
		backgroundColor: '#3e8bff',
	});


	var styles = [ 

	{
		"featureType": "road",
		"stylers": [
		{ "color": "#b4b4b4" }
		]
	},{
		"featureType": "water",
		"stylers": [
		{ "color": "#d8d8d8" }
		]
	},{
		"featureType": "landscape",
		"stylers": [
		{ "color": "#f1f1f1" }
		]
	},{
		"elementType": "labels.text.fill",
		"stylers": [
		{ "color": "#000000" }
		]
	},{
		"featureType": "poi",
		"stylers": [
		{ "color": "#d9d9d9" }
		]
	},{
		"elementType": "labels.text",
		"stylers": [
		{ "saturation": 1 },
		{ "weight": 0.1 },
		{ "color": "#000000" }
		]
	}

	];

	map.addStyle({
		styledMapName:"Styled Map",
		styles: styles,
		mapTypeId: "map_style"  
	});

	map.setStyle("map_style");
}());
