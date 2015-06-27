ContactPlate.Behaviors = ContactPlate.Behaviors || {};

ContactPlate.Behaviors.PositionOnHand = (function (HandObserver) {

    function create(obj) {
        HandObserver.register(function positionOnHandHandler (hand) {
            var pos = new THREE.Vector3().fromArray(hand.palmPosition);
            obj.matrix.setPosition(pos);
        });
    }

    return {
        create: create
    };

})(ContactPlate.HandObserver);