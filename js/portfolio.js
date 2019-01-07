var counter = 50;
var i = 0;
var displaying = false;
var animation;
var wiggles = ['screen/column.svg', 'screen/pipes.svg', 'screen/frame.svg', 'screen/baba.svg'];
$(window).scroll(function() {
	if (counter > 0 && displaying == false) {
		counter--;
	} else if (counter <= 0 && displaying == false) {
		counter = 40;
		displaying = true;
		animation = new Vivus('screen', {
			type: 'delayed',
			start: 'autostart',
			duration: 60,
			delay: 20,
			file: wiggles[i],
			animTimingFunction: Vivus.EASE
		});
		i++
		if (i == wiggles.length) {
			i = 0;
		}
		imgTop = $(window).innerHeight() - ($('#screen').outerWidth() * 2 + 40);
		$('#screen').css({
			'margin-top': imgTop
		});
		setTimeout(function() {
			animation.play(-1.3);
		}, 2500);
		setTimeout(function() {
			$('#screen').html('');
			displaying = false;
		}, 4000);
	};
	movingTop = $(window).innerHeight() - ($('#screen').outerWidth() * 2 + 40);
	$('#screen').css({
		'margin-top': movingTop
	});
});
$(window).resize(function() {
	movingTop = $(window).innerHeight() - ($('#screen').outerWidth() * 2 + 40);
	$('#screen').css({
		'margin-top': movingTop
	});
});

var startThis = function(){
	$("#start").addClass('on');
	$("#start").html('');
	$.get("controller2.html", function(data){
    	$("#start").append(data);
	});
	setTimeout(function() {
			draggus();
		}, 500);
};
var topper = function(){
$('.tab').click(function(){
	window.scrollTo(0, 0);
});
$('h1').click(function(){
	window.scrollTo(0, 0);
});
};