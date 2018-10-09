$(function() {
    // jiggling is a series of jiggles
    // a jiggle consists of a delay followed by a series of oscillations
    var initDelay = 500;
    var numOscillations = 3;
    // an oscillation is a right rotation followed by a left rotation
    var rightDelay = 50;
    var leftDelay = 50;

    var curOscillation = 0;
    var intervalId;  // jiggle interval
    var timeoutId;   // for initDelay and oscillation

    function oscillate() {
        if (curOscillation < numOscillations) {
            curOscillation += 1;
            $('#trump').removeClass('jiggle_left').addClass('jiggle_right');
            timeoutId = setTimeout(function() {
                $('#trump').removeClass('jiggle_right').addClass('jiggle_left');
                timeoutId = setTimeout(function() {
                    oscillate();
                }, leftDelay);
            }, rightDelay);
        } else {
            timeoutId = undefined;
        }
    }

    function jiggle() {
        curOscillation = 0;
        timeoutId = setTimeout(oscillate, initDelay);
    }

    function setupJiggling() {
        var delay = initDelay + numOscillations * (rightDelay + leftDelay);
        intervalId = setInterval(jiggle, delay);
    }

    function stopJiggling() {
        clearInterval(intervalId);
        intervalId = undefined;
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = undefined;
        }
        $('#trump').removeClass('jiggle_right').addClass('jiggle_left');
    }

    $('ribbon').on({
        mouseenter: function() {
            $('#fork').show();
            setupJiggling();
        },
        mouseleave: function() {
            $('#fork').hide();
            stopJiggling();
        },
    });

});

