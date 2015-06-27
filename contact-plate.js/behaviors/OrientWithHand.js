ContactPlate.Behaviors = ContactPlate.Behaviors || {};

ContactPlate.Behaviors.OrientWithHand = (function (HandObserver) {

    function create(obj, oAxis) {
        HandObserver.register(function orientOnHandHandler (hand) {
            var finAxis = new THREE.Vector3().fromArray(hand.palmNormal).normalize();
            var rotAxis = new THREE.Vector3().crossVectors(oAxis, finAxis).normalize();
            var angle = Math.acos(finAxis.dot(oAxis));
            obj.matrix.makeRotationAxis(rotAxis, angle);
        });
    }

    return {
        create: create
    };

})(ContactPlate.HandObserver);