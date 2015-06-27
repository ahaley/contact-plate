ContactPlate.HandObserver = (function ($) {

    var disabled = true;

    function onKeyDown(e) {
        if (e.which === 32) {
           disabled = !disabled;
        }
    }

    document.addEventListener('keydown', onKeyDown);

    var observers = [];

    return {
        register: function (newObserver) {
            observers.push(newObserver);
        },
        handEvent: function (hand) {
            if (disabled)
                return;

            observers.forEach(function (observer) {
               observer(hand);
            });
        }
    }

})($);



