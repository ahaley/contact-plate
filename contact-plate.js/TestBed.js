var contactPlate = ContactPlate.create();


contactPlate.subject.position.y = 50;

WorkBench.Scene.add(contactPlate.subject);

WorkBench.registerRender(contactPlate.render);

// to make working with angles easy
window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;


Leap.loop({ background: true }, {

    // hand callbacks are run once for each hand in the frame
    hand: function(hand){


        hand.fingers.forEach(function (finger) {

            var arrows = finger.data('arrows');
            finger.bones.forEach(function(bone, i){
                var arrow;
                for (var j = 0; j < 3; j++){
                    arrow = arrows[i * 3 + j];
                    arrow.position.fromArray(bone.prevJoint);
                    arrow.setDirection((new THREE.Vector3).fromArray(bone.basis[j]));
                }
            });

        });

        WorkBench.render();
    }

})
    .use('handHold')
    .use('handEntry')
    .on('handFound', function (hand) {


        var colors = [0xff0000, 0x00ff00, 0x0000ff];
        var length = 24;
        hand.fingers.forEach(function (finger) {
            var arrows = [];
            finger.bones.forEach(function (bone) {
                for (var i = 0; i < 3; i++) {
                    var arrow = new THREE.ArrowHelper(
                        new THREE.Vector3(0, 0, 0),
                        new THREE.Vector3(1, 0, 0),
                        length,
                        colors[i],
                        0.2 * length,
                        0.4 * 0.2 * length
                    );
                    WorkBench.Scene.add(arrow);
                    arrows.push(arrow);
                }
            });
            finger.data('arrows', arrows);
        });
    })
    .on('handLost', function (hand) {
        hand.fingers.forEach(function (finger) {
            var arrows = finger.data('arrows');
            for (var i = 0; i < arrows.length; i++){
                scene.remove(arrows[i]);
            }
            finger.data({arrows: null});
        });
        WorkBench.render();
    })
    .connect();