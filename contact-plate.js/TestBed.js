
var options = {
    segments: 12,
    rendererFactory: ContactPlate.PlateRenderer.BoxWithIndexText.create
};
var contactPlate = ContactPlate.create(options);

contactPlate.subject.matrixAutoUpdate = false;

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


var marker1 = new THREE.Mesh(markerGeometry, markerMaterial1);
var marker = new THREE.Object3D();

marker1.position.y = 50;
marker.add(marker1);
marker.matrixAutoUpdate = false;

//WorkBench.Scene.add(marker);

var startAxis = new THREE.Vector3(0, 1, 0);
var startAxisM = new THREE.Vector3(0, 0, 1);

function orientOnHand(hand, obj, oAxis) {
    var finAxis = new THREE.Vector3().fromArray(hand.palmNormal).normalize();
    var rotAxis = new THREE.Vector3().crossVectors(oAxis, finAxis).normalize();
    var angle = Math.acos(finAxis.dot(oAxis));
    var pos = new THREE.Vector3().fromArray(hand.palmPosition);
    obj.matrix.makeRotationAxis(rotAxis, angle);
    obj.matrix.setPosition(pos);
}

function palmThing(hand) {
    orientOnHand(hand, marker, startAxis);
}

function reorientMenu(hand) {
    orientOnHand(hand, contactPlate.subject, startAxisM);
}

var menuActive = false;

Leap.loop({ background: true }, {
    hand: function(hand){
        hands.render(hand);

        if (menuActive)
            reorientMenu(hand);
//        palmThing(hand);
        WorkBench.render();
    }
})
    .use('handHold')
    .use('handEntry')
    .on('handFound', function (hand) {
        var obj = hands.init(hand);
        //obj.add(contactPlate.subject);
        WorkBench.Scene.add(obj);
    })
    .on('handLost', function (hand) {
        var obj = hands.cleanup(hand);
        WorkBench.Scene.remove(obj);
        WorkBench.render();
    })
    .connect();

function onKeyDown(e) {
    if (e.which === 32) {
        menuActive = !menuActive;
    }
}

document.addEventListener('keydown', onKeyDown);