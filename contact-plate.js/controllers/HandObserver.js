ContactPlate.HandObserver = (function (ContactPlate) {

    var disabled = true;

    ContactPlate.KeyboardObserver.register(function (which) {
        if (which === 32)
            disabled = !disabled;
    });

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

})(ContactPlate);



