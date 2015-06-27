ContactPlate.Behaviors = ContactPlate.Behaviors || {};

ContactPlate.Behaviors.OrientToCamera = (function (HandObserver) {

    function create(obj, oAxis, camera) {
        HandObserver.register(function orientOnHandHandler (hand) {
            var finAxis = new THREE.Vector3().subVectors(camera.position,
                new THREE.Vector3().fromArray(hand.palmNormal)).normalize();
            var rotAxis = new THREE.Vector3().crossVectors(oAxis, finAxis).normalize();

            var angle = Math.acos(finAxis.dot(oAxis));
            obj.matrix.makeRotationAxis(rotAxis, angle);
        });
    }

    return {
        create: create
    };

})(ContactPlate.HandObserver);