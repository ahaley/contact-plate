var ContactPlate = ContactPlate || {};

(function (ContactPlate) {

    var baseBoneRotation = (new THREE.Quaternion).setFromEuler(
        new THREE.Euler(Math.PI / 2, 0, 0)
    );

    ContactPlate.Hands = $.extend({
        bones: {
            init: function (hand) {
                var obj = new THREE.Object3D();
                hand.fingers.forEach(function (finger) {
                    var boneMeshes = new THREE.Object3D();
                    var jointMeshes = new THREE.Object3D();
                    finger.bones.forEach(function (bone) {
                        // create joints
                        // CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
                        var boneMesh = new THREE.Mesh(
                            new THREE.CylinderGeometry(5, 5, bone.length),
                            new THREE.MeshPhongMaterial()
                        );
                        boneMesh.material.color.setHex(0xffffff);
                        boneMeshes.add(boneMesh);
                    });
                    for (var i = 0; i < finger.bones.length + 1; i++) {
                        var jointMesh = new THREE.Mesh(
                            new THREE.SphereGeometry(8),
                            new THREE.MeshPhongMaterial()
                        );
                        jointMesh.material.color.setHex(0x0088ce);
                        jointMeshes.add(jointMesh);
                    }
                    finger.data('boneMeshes', boneMeshes);
                    finger.data('jointMeshes', jointMeshes);

                    obj.add(boneMeshes);
                    obj.add(jointMeshes);
                });
                hand.data('obj', obj);
                return obj;
            },
            render: function (hand) {

                hand.fingers.forEach(function (finger) {
                    // This is the meat of the example - Positioning `the cylinders on every frame:
                    finger.data('boneMeshes').children.forEach(function(mesh, i){
                        var bone = finger.bones[i];
                        mesh.position.fromArray(bone.center());
                        mesh.setRotationFromMatrix(
                            (new THREE.Matrix4).fromArray( bone.matrix() )
                        );
                        mesh.quaternion.multiply(baseBoneRotation);
                    });
                    finger.data('jointMeshes').children.forEach(function(mesh, i){
                        var bone = finger.bones[i];
                        if (bone) {
                            mesh.position.fromArray(bone.prevJoint);
                        }else{
                            // special case for the finger tip joint sphere:
                            bone = finger.bones[i-1];
                            mesh.position.fromArray(bone.nextJoint);
                        }
                    });
                });


            },
            cleanup: function (hand) {
                var obj = hand.data('obj');

                hand.fingers.forEach(function (finger) {
                    finger.data({
                        boneMeshes: null,
                        boneMeshes: null
                    });
                });

                hand.data({ obj: null });

                return obj;
            }
        }
    }, ContactPlate.Hands);


})(ContactPlate);