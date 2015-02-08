var ContactPlate = ContactPlate || {};

(function (ContactPlate) {

    ContactPlate.Hands = {
        arrows: {
            init: function (hand) {
                var obj = new THREE.Object3D();
                var colors = [0xff0000, 0x00ff00, 0x0000ff];
                var length = 24;
                hand.fingers.forEach(function (finger) {
                    var arrows = new THREE.Object3D();
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

                            arrows.add(arrow);
                        }
                    });
                    finger.data('arrows', arrows);
                    obj.add(arrows);
                });
                hand.data('obj', obj);
                return obj;
            },
            render: function (hand) {
                hand.fingers.forEach(function (finger) {

                    var arrows = finger.data('arrows');
                    finger.bones.forEach(function (bone, i) {
                        var arrow;
                        for (var j = 0; j < 3; j++) {
                            arrow = arrows.children[i * 3 + j];
                            arrow.position.fromArray(bone.prevJoint);
                            arrow.setDirection((new THREE.Vector3).fromArray(bone.basis[j]));
                        }
                    });

                });
            },
            cleanup: function (hand) {
                hand.fingers.forEach(function (finger) {
                    var arrows = finger.data('arrows');
                    finger.data({arrows: null});
                });
                var obj = hand.data('obj');
                hand.data({obj: null});
                return obj;
            }
        }
    }


})(ContactPlate);