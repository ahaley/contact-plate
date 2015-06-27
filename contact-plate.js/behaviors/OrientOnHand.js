ContactPlate.Behaviors = ContactPlate.Behaviors || {};

ContactPlate.Behaviors.OrientOnHand = (function (HandObserver) {

    var controls = [];

    function create(obj, oAxis) {
        var control = HandObserver.register(function orientOnHandHandler (hand) {
            var finAxis = new THREE.Vector3().fromArray(hand.palmNormal).normalize();
            var rotAxis = new THREE.Vector3().crossVectors(oAxis, finAxis).normalize();
            var angle = Math.acos(finAxis.dot(oAxis));
            var pos = new THREE.Vector3().fromArray(hand.palmPosition);
            obj.matrix.makeRotationAxis(rotAxis, angle);
            obj.matrix.setPosition(pos);
        });

        control.disable();
        controls.push(control);
    }

    function onKeyDown(e) {
        if (e.which === 32) {
            controls.forEach(function(control) {
                console.log('hitting toggle');
                control.toggle();
            });
        }
    }

    document.addEventListener('keydown', onKeyDown);

    return {
        create: create
    };

})(ContactPlate.HandObserver);