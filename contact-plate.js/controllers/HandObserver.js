ContactPlate.HandObserver = (function ($) {

    var observers = [];
    return {
        register: function (newObserver) {
            observers.push(newObserver);

            return {
                enable: function () {
                    delete(newObserver.isDisabled);
                },
                disable: function () {
                    newObserver.isDisabled = true;
                },
                toggle: function () {
                    if (newObserver.isDisabled)
                        this.enable();
                    else
                        this.disable();
                }
            }
        },
        handEvent: function (hand) {
            observers.forEach(function (observer) {
               if (!observer.isDisabled)
                   observer(hand);
            });
        }
    }

})($);