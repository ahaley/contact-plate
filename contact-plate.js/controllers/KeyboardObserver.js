ContactPlate.KeyboardObserver = (function () {

    var observers = [];

    function onKeyDown(e) {
        observers.forEach(function (observer) {
            observer(e.which);
        });
    }

    document.addEventListener('keydown', onKeyDown);

    return {
        register: function (newObserver) {
            observers.push(newObserver);
        }
    }
})();