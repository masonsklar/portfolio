/* global $ */
var final = {
	first: null,
	shape: null,
	brow: null
}; /* variables for slider */
var slider = {
	comp1: 0,
	comp2: 0,
	total: 1,
	lock: 0
}; /* variables for quad */
var quadDivide = 6;
var quadLockLimit = 1;
var quadLock = 0; /* variables for toggles */
var breaker = {
	limit: 0,
	lock: 0,
	brow: ''
};
var breakLimit = 0;
var breakLock = 0; /* varigbles for grid*/
var totalChecks = 0;
var checkLock = 1; /* final state variables */
var squirrelShow = false;
var acornDrop = false;
var timeAdvance = false;
var ending = 0;
var disp = 0;
var shape = 'c';
var initial = '';
var scrollText = function(x) {
		if (x !== undefined) {
			$('#status').html(x);
		}
		$('#status').marquee({
			delay: 0,
			duration: 1500,
			gap: 50,
			duplicated: true
		});
	};
var flash = function(x) {
		$('#' + x).addClass('flash');
		setTimeout(function() {
			$('#' + x).removeClass('flash');
		}, 1000);
	};
var flashLock = function(x) {
		$('#' + x + 'lock').addClass('flash');
		$('#' + x).css('opacity', 0);
		setTimeout(function() {
			$('#' + x + 'lock').css('opacity', 1);
		}, 1200);
	};
var shake = function(x, y) {
		$(x).addClass('shake');
		setTimeout(function() {
			$(x).removeClass('shake');
		}, y * 250);
	};
var circDrift = function() {
		$('#circle').css({
			'transform': 'translate(' + (circPos + 20) + 'px,' + (circPos + 20) + 'px)',
			'transition': 'all 2.5s ease-in'
		});
		setTimeout(function() {
			$('#circle').css({
				'transform': 'translate(' + 20 + 'px,' + 20 + 'px)',
				'transition': 'all 1s linear'
			});
		}, 1500);
		setTimeout(function() {
			$('#circle').css({
				'transform': 'translate(' + circPos + 'px,' + circPos + 'px)',
				'transition': 'all 1s ease'
			});
		}, 2500);
	};
var triDrift = function() {
		$('#triangle').css({
			'transform': 'translate(' + (triPos + 20) + 'px,-' + (triPos + 20) + 'px)',
			'transition': 'all 2s ease-out'
		});
		setTimeout(function() {
			$('#triangle').css({
				'transform': 'translate(' + 10 + 'px,' + -10 + 'px)',
				'transition': 'all 1s linear'
			});
		}, 2000);
		setTimeout(function() {
			$('#triangle').css({
				'transform': 'translate(' + triPos + 'px,-' + triPos + 'px)',
				'transition': 'all 1s ease'
			});
		}, 3000);
	};
var breakStart = function() {
		$('#breakerr').slider('value', 0);
		setTimeout(function() {
			$('#breakerr').slider('value', 2);
		}, 500);
		setTimeout(function() {
			$('#breakerr').slider('value', 1);
		}, 1000);
	};
var numLock = function(x) {
		setTimeout(function() {
			$('#' + x).css({
				"opacity": "1",
				"display": "inline",
				"transform": "translateY(-160px)"
			});
			flash(x);
		}, 2000);
	};
var draggus = function() {
		if (initial == '') {
			initial = $('#panel').html();
		}
		$('#' + disp).addClass('on');
		scrollText();
		$("#alltoggle").click(function() {
			browU();
			move(shape, 10);
			$("#alltoggle").toggleClass("on");
			$(".button").toggleClass("on");
			totalChecks = 0;
			$(".button").each(function() {
				if ($(this).hasClass("on")) {
					totalChecks += 1;
				}
			});
			if (totalChecks % 2 === 0) {
				$('#io').children().css('fill', 'white');
				setScreen(1, "a");
				shake('.1' + tape, 1);
			} else {
				$('#io').children().css('fill', 'blue');
				setScreen(1, "c");
			}
		});
		$(".button").click(function() {
			$(this).toggleClass("on");
			totalChecks = 0;
			$(".button").each(function() {
				if ($(this).hasClass("on")) {
					totalChecks += 1;
				}
			});
			if (totalChecks % 2 === 0) {
				setScreen(1, "b");
			} else {
				setScreen(1, "a");
				shake('.1' + tape, 1);
			}
			if ($(this).hasClass('on') === true) {
				move(shape, totalChecks * 2.5);
			}
		});
		$("#arrow").click(function() {
			info();
		});
		// !initialize stone 
		$('#stone').draggable({
			disabled: true,
			revert: "invalid",
			containment: $("#quad"),
			stack: "#quadrant",
			start: function() {
				$(this).toggleClass("held");
			},
			stop: function() {
				$(this).toggleClass("held");
			},
		});
		$('.quadrant').droppable({
			enabled: true,
			accept: '#stone',
		});
		$('#q1').droppable({
			drop: function(event, ui) {
				quadSet(6);
				setScreen(3, "c");
				boxSet(4);
				shapeSet('t');
				move(shape, 0, 10);
				$('#io').children().css('fill', 'blue');
				browU();
				calcSlider();
				scrollText('Modulation set <span style="color:#f00">' + quadDivide + '</span> engaged. Please refer to manual to confirm specifications.');
			}
		});
		$('#q2').droppable({
			drop: function(event, ui) {
				quadSet(5);
				shapeSet('c');
				move(shape, 0, 10);
				setScreen(1, "a");
				shake('.1' + tape, 1);
				boxSet(3);
				$('#io').children().css('fill', 'white');
				browD();
				calcSlider();
				scrollText('Modulation set <span style="color:#f00">' + quadDivide + '</span> engaged. Please refer to manual to confirm specifications.');
			}
		});
		$('#q3').droppable({
			drop: function(event, ui) {
				quadSet(4);
				shapeSet('c');
				move(shape, 0, 40);
				setScreen(1, "a");
				shake('.1' + tape, 1);
				boxSet(2);
				$('#io').children().css('fill', 'white');
				browD();
				calcSlider();
				scrollText('Modulation set <span style="color:#f00">' + quadDivide + '</span> engaged. Please refer to manual to confirm specifications.');
			}
		});
		$('#q4').droppable({
			drop: function(event, ui) {
				quadSet(3);
				setScreen(3, "c");
				boxSet(1);
				shapeSet('t');
				move(shape, 0, 60);
				$('#io').children().css('fill', 'blue');
				browU();
				calcSlider();
				scrollText('Modulation set <span style="color:#f00">' + quadDivide + '</span> engaged. Please refer to manual to confirm specifications.');
			}
		});
		// !initialize sliders 
		$("#squirrelslider1").slider({
			disabled: true,
			value: 2,
			orientation: "horizontal",
			min: 2,
			max: 11,
			animate: true,
			change: function(event, ui) {
				calcSlider();
				scrollText('Tuning frequency set to <span style="color:#0f0">' + disp + '</span>');
				setScreen(2, "c");
				move(shape, -slider.comp1 * 3);
			}
		});
		$("#squirrelslider2").slider({
			disabled: true,
			value: 3,
			orientation: "horizontal",
			min: 3,
			max: 25,
			step: 3,
			animate: true,
			change: function(event, ui) {
				calcSlider();
				scrollText('Tuning frequency set to <span style="color:#0f0">' + disp + '</span>');
				move('c', 0, ui.value * 1.25);
				setScreen(2, "a");
				move(shape, -slider.comp2);
			}
		});
		// !initialize breaker
		$("#breakerr").slider({
			disabled: true,
			orientation: "vertical",
			min: 0,
			max: 2,
			value: 1,
			animate: true,
			stop: function(event, ui) {
				breakSlide();
			}
		});
		var boxSet = function(x) {
				if (x == 4) {
					$('#qd1').css("display", "block");
					$('#qd2').css("display", "block");
					$('#qd3').css("display", "block");
					$('#qd4').css("display", "block");
				} else if (x == 3) {
					$('#qd1').css("display", "none");
					$('#qd2').css("display", "block");
					$('#qd3').css("display", "block");
					$('#qd4').css("display", "block");
				} else if (x == 2) {
					$('#qd1').css("display", "none");
					$('#qd2').css("display", "none");
					$('#qd3').css("display", "block");
					$('#qd4').css("display", "block");
				} else if (x == 1) {
					$('#qd1').css("display", "none");
					$('#qd2').css("display", "none");
					$('#qd3').css("display", "none");
					$('#qd4').css("display", "block");
				}
			};
		var boxFill = function(x) {
				if (x == 1) {
					$('#iobox').children().css('fill', 'white');
				} else if (x == 2) {
					$('#qdbox').children().css('fill', 'white');
				} else if (x == 3) {
					$('#qd4').children().css('fill', 'white');
				} else if (x == 4) {
					$('#qd3').children().css('fill', 'white');
				} else if (x == 5) {
					$('#qd2').children().css('fill', 'white');
				} else if (x == 6) {
					$('#qd1').children().css('fill', 'white');
				}
			};
		var breakSlide = function() {
				if ($("#breakerr").slider('value') === 0) {
					browD();
					setScreen(1, "c");
					scrollText('Target&#x27;s intention filter <span style="color:#f00">lowered</span>.');
				} else if ($("#breakerr").slider('value') == 1) {
					setScreen(1, "b");
				} else if ($("#breakerr").slider('value') == 2) {
					browU();
					setScreen(1, "a");
					shake('.1' + tape, 1);
					scrollText('Target&#x27;s intention filter <span style="color:#0f0">raised</span>.');
				}
				breakLimit++;
				boxFill(breakLimit);
				if (breakLimit >= quadDivide && breakLock === 0) {
					setScreen(2, "a");
					setScreen(3, "a");
					$("#breakerr").slider("disable");
					$("#breakerr").children(".ui-slider-handle").addClass("drop");
					breakLock = breakLimit;
					move('t', 25);
					boxFill(breakLimit);
					if (final.brow === null) {
						if (breaker.brow == '') {
							browU();
						}
						final.brow = breaker.brow;
						flash('grid');
						flash('brow' + final.brow.toUpperCase());
					}
					if (final.first === null) {
						final.first = 'b';
					}
					checker();
				} else {
					move('t', 0, breakLimit * 10);
					boxFill(breakLimit);
				}
			};
		$(".slider").mousedown(function() {
			$(this).blur();
			setScreen(1, "c");
			setScreen(2, "c");
			setScreen(3, "c");
		});
	};
var enable = function() {
		$(".button").removeClass('disabled');
		$("#squirrelslider1").slider('enable');
		$("#squirrelslider1").slider('value', 4);
		$("#squirrelslider2").slider('enable');
		$("#squirrelslider2").slider('value', 20);
		$("#breakerr").slider('enable');
		breakStart();
		$("#stone").draggable('enable');
		$('#stone').addClass('appear');
		$('#stone').removeClass('hidden');
		$('#arrow').removeClass('hidden');
		move('c', 0, 0);
		move('t', 0, 0);
	};
var checker = function() {
		if (final.first && final.shape && final.brow !== null) {
			$("#alltoggle").off('click');
			$(".button").off('click');
			$("#squirrelslider1").slider('disable');
			$("#squirrelslider2").slider('disable');
			$("#breakerr").slider('disable');
			$("#stone").draggable('disable');
			setTimeout(function() {
				$('#' + disp).css({
					"opacity": "0",
					"display": "none",
				});
				$('#trianglelock').css('opacity', 0);
				$('#circlelock').css('opacity', 0);
			}, 2000);
			$('#triangleselect').css('opacity', 0);
			$('#circleselect').css('opacity', 0);
			$('#triangle').css('opacity', 0);
			$('#circle').css('opacity', 0);
			anim.loop = true;
			if (final.first == 's') {
				if (final.brow == 'u' && final.shape == 'c') { /*make a friend*/
					numLock(1);
					setScreen(1, "a");
					shake('.1' + tape, 1);
					setScreen(2, "b");
					setScreen(3, "b");
					anim.playSegments([
						[240, 299],
						[300, 419],
						[420, 449]
					], true);
					scrollText('The Target appears to have made a <span style="color:#0f0">friend</span>. An agreeable outcome.');
				} else if (final.brow == 'u' && final.shape == 't') { /*kiss*/
					numLock(2);
					setScreen(1, "a");
					shake('.1' + tape, 1);
					setScreen(2, "a");
					setScreen(3, "a");
					anim.playSegments([
						[240, 299],
						[450, 569],
						[570, 599]
					], true);
					scrollText('<span style="color:#0f0">WOW!!!</span> Unexpected result! Good for the Target.');
				} else if (final.brow == 'd' && final.shape == 'c') { /*just pass*/
					numLock(3);
					setScreen(1, "c");
					setScreen(2, "a");
					setScreen(3, "c");
					anim.playSegments([
						[240, 299],
						[600, 719],
						[720, 749]
					], true);
					scrollText('A wise decision. The Target is <span style="color:red">not prepared</span> for interaction.');
				} else if (final.brow == 'd' && final.shape == 't') { /*make run away*/
					numLock(4);
					setScreen(1, "a");
					shake('.1' + tape, 1);
					setScreen(2, "c");
					setScreen(3, "a");
					anim.playSegments([
						[240, 299],
						[750, 869],
						[870, 899]
					], true);
					scrollText('Unfortunately, some Target interactions must end <span style="color:#f00">this way</span>.');
				}
			} else if (final.first == 'b') {
				if (final.brow == 'u' && final.shape == 'c') { /*pass a friend*/
					numLock(5);
					setScreen(1, "b");
					setScreen(2, "b");
					setScreen(3, "a");
					anim.playSegments([
						[240, 299],
						[900, 994],
						[995, 1049]
					], true);
					scrollText('Excellent, the Target has recognized and greeted a <span style="color:#0f0">friend</span>. An overall pleasant transaction.');
				} else if (final.brow == 'u' && final.shape == 't') { /*love miss*/
					numLock(6);
					setScreen(1, "a");
					shake('.1' + tape, 1);
					setScreen(2, "c");
					setScreen(3, "c");
					anim.playSegments([
						[240, 299],
						[1050, 1156],
						[1157, 1199]
					], true);
					scrollText('Oh, seems like you created a <span style="color:#f00">missed connection</span>. Perhaps you could better manage your resources next time.');
				} else if (final.brow == 'd' && final.shape == 'c') { /*walk away*/
					numLock(7);
					setScreen(1, "c");
					setScreen(2, "b");
					setScreen(3, "b");
					anim.playSegments([
						[240, 299],
						[1200, 1278],
						[1279, 1349]
					], true);
					scrollText('Ah, seems meetings are capricious. Not all Targets are <span style="color:#0f0">meant</span> to cross paths');
				} else if (final.brow == 'd' && final.shape == 't') { /*make enemy*/
					numLock(8);
					setScreen(1, "a");
					shake('.1' + tape, 1);
					setScreen(2, "c");
					setScreen(3, "b");
					anim.playSegments([
						[240, 299],
						[1350, 1469],
						[1470, 1499]
					], true);
					scrollText('That didn&#x27;t go well. It is <span style="color:$f00">irresponsible</span> of you to start fight like this.');
				}
			}
		}
	};
var calcSlider = function() {
		slider.comp1 = $("#squirrelslider1").slider('value');
		slider.comp2 = $("#squirrelslider2").slider('value');
		slider.total = Math.round(slider.comp2 / slider.comp1);
		disp = slider.total % quadDivide;
		shapeSet();
		$('g').each(function() {
			if ($(this).hasClass('on') === true) {
				$(this).css({
					"opacity": "0",
					"display": "none"
				});
				$(this).removeClass('on');
			}
		});
		$('#' + disp).css({
			"opacity": "1",
			"display": "inline",
		});
		$('#' + disp).addClass('on');
		if (slider.lock === 0 && slider.total % quadDivide === 0) {
			slider.lock = slider.total;
/*$("#sliderbox").addClass("off");
        $(".squirrel").children(".ui-slider-handle").addClass("off");
        $(".squirrel").slider("disable");*/
			checker();
		}
	};
var quadSet = function(x) {
		if (quadLockLimit > 0) {
			quadDivide = x;
			quadLockLimit--;
		} else if (quadLockLimit === 0) {
			quadDivide = x;
			quadLock = quadDivide;
			$('#stone').draggable("disable");
			$('#stone').toggleClass("broken");
			if (final.brow === null) {
				if (breaker.brow == '') {
					browU();
				}
				final.brow = breaker.brow;
				flash('grid');
				flash('brow' + final.brow.toUpperCase());
			}
			if (final.first === null) {
				final.first = 'b';
			}
			checker();
		}
	};
var shapeSet = function(x) {
		if (x == 'c' && final.shape === null) {
			shape = 'c';
			$('#triangleselect').css({
				'opacity': '0',
				'display': 'none'
			});
			$('#circleselect').css({
				'opacity': '1',
				'display': 'inline'
			});
			flash('circleselect');
		} else if (x == 't' && final.shape === null) {
			shape = 't';
			$('#triangleselect').css({
				'opacity': '1',
				'display': 'inline'
			});
			$('#circleselect').css({
				'opacity': '0',
				'display': 'none'
			});
			flash('triangleselect');
		} else if (x === undefined && final.shape === null) {
			if (breaker.lock === 0) {
				if (quadDivide % 2 === 0) {
					if (disp % 2 === 0 || disp === 0) {
						shape = 'c';
						$('#triangleselect').css({
							'opacity': '0',
							'display': 'none'
						});
						$('#circleselect').css({
							'opacity': '1',
							'display': 'inline'
						});
						flash('circleselect');
					} else {
						shape = 't';
						$('#triangleselect').css({
							'opacity': '1',
							'display': 'inline'
						});
						$('#circleselect').css({
							'opacity': '0',
							'display': 'none'
						});
						flash('triangleselect');
					}
				} else {
					if (disp % 2 !== 0) {
						shape = 't';
						$('#triangleselect').css({
							'opacity': '1',
							'display': 'inline'
						});
						$('#circleselect').css({
							'opacity': '0',
							'display': 'none'
						});
						flash('triangleselect');
					} else {
						shape = 'c';
						$('#triangleselect').css({
							'opacity': '0',
							'display': 'none'
						});
						$('#circleselect').css({
							'opacity': '1',
							'display': 'inline'
						});
						flash('circleselect');
					}
				}
			}
		}
	};
var circPos = 0;
var triPos = 0;
var tape = "b";
var wave = "b";
var bars = "b";
var idleData = {
	wrapper: document.getElementById('mainscreen'),
	animType: 'svg',
	name: 'idle',
	loop: false,
	prerender: true,
	autoplay: false,
	path: 'combos/silly.json',
};
var autobar = {
	wrapper: document.getElementById('screen2'),
	animType: 'svg',
	name: 'screen',
	loop: true,
	prerender: true,
	autoplay: true,
	path: 'combos/combo.json'
};
var screenDef = function() {
		setTimeout(function() {
			$('.intro').css('opacity', '0');
			setScreen(1, 'b');
			setScreen(2, 'b');
			setScreen(3, 'b');
		}, 4300);
	};
var setScreen = function(x, y) {
		$('#screen2').children('svg').children('g').children('g').css({
			"opacity": "0"
		});
		if (x == 1) {
			tape = y;
		} else if (x == 2) {
			wave = y;
		} else if (x == 3) {
			bars = y;
		}
		$('.1' + tape).css({
			"opacity": "1",
			"display": "inline"
		});
		$('.2' + wave).css({
			"opacity": "1",
			"display": "inline"
		});
		$('.3' + bars).css({
			"opacity": "1",
			"display": "inline"
		});
	};
var move = function(s, x, y) {
		if (s == "c") {
			if ((Math.floor(Math.random() * 10) % 2) == 1) {
				triDrift();
			}
			if (y === undefined) {
				circPos += x;
			} else {
				circPos = y;
			}
			if (circPos <= 80 && final.shape === null) {
				$('#circle').css({
					'transform': 'translate(' + circPos + 'px,' + circPos + 'px)',
					'transition': 'all 1s ease'
				});
			} else {
				if (final.first === null) {
					final.first = 's';
				}
				if (final.shape === null) {
					final.shape = 'c';
					flashLock('circle');
					flash('grid');
					checker();
				}
				$('#circle').css({
					'transform': 'translate(' + circPos + 'px,' + circPos + 'px)',
					'transition': 'all 1s ease'
				});
			}
		} else if (s == "t") {
			if ((Math.floor(Math.random() * 10) % 2) == 1) {
				circDrift();
			}
			if (y === undefined) {
				triPos += x;
			} else {
				triPos = y;
			}
			if (triPos <= 90 && final.shape === null) {
				$('#triangle').css({
					'transform': 'translate(' + triPos + 'px,-' + triPos + 'px)',
					'transition': 'all 1s ease'
				});
			} else {
				if (final.first === null) {
					final.first = 's';
				}
				if (final.shape === null) {
					final.shape = 't';
					flashLock('triangle');
					flash('grid');
					checker();
				}
				$('#triangle').css({
					'transform': 'translate(' + triPos + 'px,-' + triPos + 'px)',
					'transition': 'all 1s ease'
				});
			}
		}
	};
var browU = function() {
		if (final.brow === null) {
			$('#browU').css("opacity", "1");
			$('#brow').css("opacity", "0");
			$('#browD').css("opacity", "0");
			breaker.brow = 'u';
		}
	};
var browN = function() {
		if (final.brow === null) {
			$('#browU').css("opacity", "0");
			$('#brow').css("opacity", "1");
			$('#browD').css("opacity", "0");
		}
	};
var browD = function() {
		if (final.brow === null) {
			$('#browU').css("opacity", "0");
			$('#brow').css("opacity", "0");
			$('#browD').css("opacity", "1");
			breaker.brow = 'd';
		}
	};
var anim = bodymovin.loadAnimation(idleData);
var anim2 = bodymovin.loadAnimation(autobar);
anim.addEventListener('DOMLoaded', function() {
	anim.subframeEnabled = false;
	anim.playSegments([0, 240], true);
	anim.addEventListener('enterFrame', function() {
		if (anim.currentFrame == 238) {
			scrollText('Sequence loaded. <span style="color:#0f0">Target</span> engaged. Please commence form modification input.</span>');
			enable();
		}
	});
});
anim2.addEventListener('complete', screenDef());
var info = function() {
		$('#griddus').toggleClass('info');
		$('#quad').toggleClass('info');
		$('#stone').toggleClass('hidden');
		$('#stone').toggleClass('appear');
		$('#arrow').toggleClass('on');
		$('#marqueebox').toggleClass('hidden');
		$('#reset').toggleClass('on');
	};
var varSet = function() {
		final = {
			first: null,
			shape: null,
			brow: null
		};
		slider = {
			comp1: 0,
			comp2: 0,
			total: 1,
			lock: 0
		};
		quadDivide = 6;
		quadLockLimit = 1;
		quadLock = 0;
		breaker = {
			limit: 0,
			lock: 0,
			brow: ''
		};
		breakLimit = 0;
		breakLock = 0;
		totalChecks = 0;
		checkLock = 1;
		squirrelShow = false;
		acornDrop = false;
		timeAdvance = false;
		ending = 0;
		disp = 0;
		shape = 'c';
		circPos = 0;
		triPos = 0;
		tape = "b";
		wave = "b";
		bars = "b";
	};
var preset = function() {
		anim.destroy();
		anim2.destroy();
	};
var reset = function() {
$('#start').html('');
startThis();
	};