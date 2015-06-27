
var options = {
    segments: 12,
    //rendererFactory: ContactPlate.PlateRenderer.Box1.create,
    rendererFactory: ContactPlate.PlateRenderer.BoxWithIndexText.create,
    name: "rotary-menu"
};
var contactPlate = ContactPlate.create(options);

contactPlate.subject.matrixAutoUpdate = false;

var startAxisM = new THREE.Vector3(0, 0, 1);

//ContactPlate.Behaviors.OrientWithHand.create(contactPlate.subject, startAxisM);
ContactPlate.Behaviors.OrientToCamera.create(contactPlate.subject, startAxisM, WorkBench.Camera);
ContactPlate.Behaviors.PositionOnHand.create(contactPlate.subject);


WorkBench.Scene.add(contactPlate.subject);

WorkBench.registerRender(contactPlate.render);

// to make working with angles easy
window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

var hands = ContactPlate.Hands.bones;

var markerGeometry = new THREE.CylinderGeometry(2, 4, 40, 32);
var markerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
var markerMaterial1 = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.5
});


Leap.loop({ background: true }, {
    hand: function(hand){
        hands.render(hand);
        ContactPlate.HandObserver.handEvent(hand);
        WorkBench.render();
    }
})
    .use('handHold')
    .use('handEntry')
    .on('handFound', function (hand) {
        var obj = hands.init(hand);
        WorkBench.Scene.add(obj);
    })
    .on('handLost', function (hand) {
        var obj = hands.cleanup(hand);
        WorkBench.Scene.remove(obj);
        WorkBench.render();
    })
    .connect();

