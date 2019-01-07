        /* global $ */
        /* variables for slider */
        var sliderComp1 = 0;
        var sliderComp2 = 0;
        var sliderTotal = 1;
        var sliderLock = 0;
        /* variables for quad */
        var quadDivide = 9;
        var quadLockLimit = 3;
        var quadLock = 0;
        /* variables for toggles */
        var breakLimit = 0;
        var breakLock = 0;
        /* varigbles for grid*/
        var totalChecks = 0;
        var checkLock = 1;
        /* final state variables */
        var squirrelShow = false;
        var acornDrop = false;
        var timeAdvance = false;
        var ending = 0;

		var draggus = function() {
            $('#stone').draggable({
                revert: "invalid",
                containment: $("#quad"),
                stack: "#quadrant",
                start: function(){$(this).toggleClass("held")},
                stop: function(){$(this).toggleClass("held")},
            });

            $('.quadrant').droppable({
                enabled: true,
                accept: '#stone',
            });

            $('#q1').droppable({
                drop: function(event, ui) {
                    quadSet(6);
                    $('#quadder').text(quadDivide);
                }
            });
            $('#q2').droppable({
                drop: function(event, ui) {
                    quadSet(5);
                    $('#quadder').text(quadDivide);
                }
            });
            $('#q3').droppable({
                drop: function(event, ui) {
                    quadSet(4);
                    $('#quadder').text(quadDivide);
                }
            });
            $('#q4').droppable({
                drop: function(event, ui) {
                    quadSet(3);
                    $('#quadder').text(quadDivide);
                }
            });
            $( "#squirrelslider1" ).slider({
				value: 4,
				orientation: "horizontal",
				min: 1,
				max: 10,
				animate: true,
				change: function(event,ui){
					pushNumber(ui.value, sliderComp1)
				}
			});
			$( "#squirrelslider2" ).slider({
				value: 75,
				orientation: "horizontal",
				min: 1,
				max: 100,
				step: 3,
				animate: true,
				change: function(event,ui){
					pushNumber(ui.value, sliderComp2)
				}
			});
			$( "#breakerr" ).slider({
				orientation: "horizontal",
				min: 1,
				max: 3,
				animate: false,
				slide: function(event,ui){
					breakSlide()
				}
			});

            var breakSlide = function() {
                breakLimit++;
                $('#breakerresult').text(breakLimit + " vs q of " + quadDivide);
                if (breakLimit >= quadDivide && breakLock == 0) {
	                $( "#breakerr" ).slider( "disable" );
	                $( "#breakerr" ).children(".ui-slider-handle").addClass("drop");
                    breakLock = breakLimit;
                    $('#breakerresult').text(breakLimit + " vs q of " + quadDivide);
                    $('#breakerlock').text(breakLock);
                    checker();
                }
            };
            
            $(".slider").mousedown(function() {
   				$(this).blur(); 
			});

            
            $("#alltoggle").click(function(){
	            $("#alltoggle").toggleClass("on");
	            $(".button").toggleClass("on");
	            totalChecks = 0;
	            $(".button").each(function(){
		            if($(this).hasClass("on")){
			            totalChecks+=1;
		            }
	            });
	           $('#gridresult').text(totalChecks);
            });
            
            $(".button").click(function(){
	            $(this).toggleClass("on");
	            totalChecks = 0;
	            $(".button").each(function(){
		            if($(this).hasClass("on")){
			            totalChecks+=1;
		            }
	            });
	            $('#gridresult').text(totalChecks);
            });
		
        };

        var checker = function() {
            if (sliderLock != 0 && quadLock != 0 && breakLock != 0) {
                
                if (breakLock % 2 != sliderComp2 % 2) {
                    squirrelShow = true;
                    $("#squirrel").text("SQUIRREL");
                    console.log(breakLock%2);
                    console.log(sliderComp2%2);
                } else {
                    squirrelShow = false;
                    $("#squirrel").text("NO SQUIRREL");
                }
                if (totalChecks % 2 == breakLock % 2) {
                    acornDrop = true;
                    $("#acorn").text("ACORN DROPS");
                } else {
                    acornDrop = false;
                    $("#acorn").text("ACORN STAY");
                }
                if (sliderLock % quadLock != 0) {
                    timeAdvance = true;
                    $("#time").text("TIME ADVANCE");
                } else {
                    timeAdvance = false;
                    $("#time").text("TIME STAYS");
                }
                
                if (squirrelShow == true){
                    if (acornDrop == true && timeAdvance == true){
	                    ending = 1;
	                    var anim = bodymovin.loadAnimation(data1);
	                    anim.addEventListener('complete', setIdle);
                        $("#ending").text("1 Acorn falls and sprouts overnight. Squirrel passes by.");
                    }
                    if (acornDrop == true && timeAdvance == false){
	                    ending = 2;
	                    var anim = bodymovin.loadAnimation(data2);
	                    anim.addEventListener('complete', setIdle);
                        $("#ending").text("2 Acorn falls, squirrel come to eat it.");
                    }
                    if (acornDrop == false && timeAdvance == true){
	                    ending = 3;
	                    var anim = bodymovin.loadAnimation(data3);
	                    anim.addEventListener('complete', setIdle);
                        $("#ending").text("3 Squirrel comes to sleep in the tree.");
                    }
                    if (acornDrop == false && timeAdvance == false){
	                    ending = 4;
	                    var anim = bodymovin.loadAnimation(data4);
	                    anim.addEventListener('complete', setIdle);
                        $("#ending").text("4 Squirrel passes by.");
                    }
                } else if (squirrelShow == false){
                    if (acornDrop == true && timeAdvance == true){
	                    ending = 5;
	                    var anim = bodymovin.loadAnimation(data5);
	                    anim.addEventListener('complete', setIdle);
                        $("#ending").text("5 Scorn falls and sprouts overnight.");
                    }
                    if (acornDrop == true && timeAdvance == false){
	                    ending = 6;
	                    var anim = bodymovin.loadAnimation(data6);
	                    anim.addEventListener('complete', setIdle);
                        $("#ending").text("6 Acorn falls but blows away.");
                    }
                    if (acornDrop == false && timeAdvance == true){
	                    ending = 7;
	                    var anim = bodymovin.loadAnimation(data7);
	                    anim.addEventListener('complete', setIdle);
                        $("#ending").text("7 It's a nice night tonight.");
                    }
                    if (acornDrop == false && timeAdvance == false){
	                    ending = 8;
	                    var anim = bodymovin.loadAnimation(data8);
	                    anim.addEventListener('complete', setIdle);
                        $("#ending").text("8 Nothin goin on.");
                    }
                }
                
            }

        };

        var calcSlider = function(sliderTotal) {
            sliderComp1 = $("#squirrelslider1" ).slider('value');
            sliderComp2 = $("#squirrelslider2" ).slider('value');
            sliderTotal = sliderComp1 * sliderComp2;

            $('#slidertotal1').text(sliderComp1);
            $('#slidertotal2').text(sliderComp2);
            $('#slidertotalgrand').text(sliderTotal);

            if (sliderLock == 0 && sliderTotal % quadDivide == 0) {
                sliderLock = sliderTotal;
                $("#sliderbox").addClass("off");
                $( ".squirrel" ).children(".ui-slider-handle").addClass("off");
                $(".squirrel").slider("disable");
                $("#sliderlock").text(sliderLock);
                checker();
            }

        };

        var pushNumber = function(x, dest) {
            dest = x;
            console.log(dest);
            calcSlider(sliderTotal);
        };

        var quadSet = function(x) {
            if (quadLockLimit > 0) {
                quadDivide = x;
                quadLockLimit--;
            } else if (quadLockLimit == 0) {
                quadDivide = x;
                quadLock = quadDivide;
                $('#quadlock').text(quadLock);
                $('#stone').draggable("disable");
                $('#stone').toggleClass("broken");
                checker();
            }
        };

        var setIdle=function(){
	    if (ending == 1){
		    var anim = bodymovin.loadAnimation(sproutIdle);
	    } else if (ending == 2){
		    var anim = bodymovin.loadAnimation(eatIdle);
	    } else if (ending == 3){
		    var anim = bodymovin.loadAnimation(nightIdle);
	    } else if (ending == 4){
		    var anim = bodymovin.loadAnimation(regularIdle);
	    } else if (ending == 5){
		    var anim = bodymovin.loadAnimation(sproutIdle);
	    } else if (ending == 6){
		    var anim = bodymovin.loadAnimation(emptyIdle);
	    } else if (ending == 7){
		    var anim = bodymovin.loadAnimation(niceIdle);
	    } else if (ending == 8){
		    var anim = bodymovin.loadAnimation(regularIdle);
	    }
    };