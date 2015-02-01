/// <reference path="lib/jquery-1.8.3.min.js" />
/// <reference path="lib/three.min.js" />
/// <reference path="WorkBench.js" />

////////////////////////////////////////////////////////////////////////////////
// Robot hand exercise: add a second grabber and have it respond
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window, dat*/

var arm, forearm, body, handLeft, handRight, effectController;

function fillScene() {
    // Robot definitions
    var robotHandLeftMaterial = new THREE.MeshPhongMaterial({ color: 0xCC3399, specular: 0xCC3399, shininess: 20 });
    var robotHandRightMaterial = new THREE.MeshPhongMaterial({ color: 0xDD3388, specular: 0xDD3388, shininess: 20 });
    var robotBaseMaterial = new THREE.MeshPhongMaterial({ color: 0x6E23BB, specular: 0x6E23BB, shininess: 20 });
    var robotForearmMaterial = new THREE.MeshPhongMaterial({ color: 0xF4C154, specular: 0xF4C154, shininess: 100 });
    var robotUpperArmMaterial = new THREE.MeshPhongMaterial({ color: 0x95E4FB, specular: 0x95E4FB, shininess: 100 });

    var torus = new THREE.Mesh(
		new THREE.TorusGeometry(22, 15, 32, 32), robotBaseMaterial);
    torus.rotation.x = 90 * Math.PI / 180;
    WorkBench.Scene.add(torus);

    forearm = new THREE.Object3D();
    var faLength = 80;

    createRobotExtender(forearm, faLength, robotForearmMaterial);

    arm = new THREE.Object3D();
    var uaLength = 120;

    createRobotCrane(arm, uaLength, robotUpperArmMaterial);

    // Move the forearm itself to the end of the upper arm.
    forearm.position.y = uaLength;
    arm.add(forearm);

    WorkBench.Scene.add(arm);

    var handLength = 38;

    handLeft = new THREE.Object3D();
    createRobotGrabber(handLeft, handLength, robotHandLeftMaterial);
    // Move the hand part to the end of the forearm.
    handLeft.position.y = faLength;
    forearm.add(handLeft);

    handRight = new THREE.Object3D();
    createRobotGrabber(handRight, handLength, robotHandRightMaterial);
    handRight.position.y = faLength;
    forearm.add(handRight);
}

function createRobotGrabber(part, length, material) {
    var box = new THREE.Mesh(
		new THREE.CubeGeometry(30, length, 4), material);
    box.position.y = length / 2;
    part.add(box);
}

function createRobotExtender(part, length, material) {
    var cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry(22, 22, 6, 32), material);
    part.add(cylinder);

    var i;
    for (i = 0; i < 4; i++) {
        var box = new THREE.Mesh(
			new THREE.CubeGeometry(4, length, 4), material);
        box.position.x = (i < 2) ? -8 : 8;
        box.position.y = length / 2;
        box.position.z = (i % 2) ? -8 : 8;
        part.add(box);
    }

    cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry(15, 15, 40, 32), material);
    cylinder.rotation.x = 90 * Math.PI / 180;
    cylinder.position.y = length;
    part.add(cylinder);
}

function createRobotCrane(part, length, material) {
    var box = new THREE.Mesh(
		new THREE.CubeGeometry(18, length, 18), material);
    box.position.y = length / 2;
    part.add(box);

    var sphere = new THREE.Mesh(
		new THREE.SphereGeometry(20, 32, 16), material);
    // place sphere at end of arm
    sphere.position.y = length;
    part.add(sphere);
}

function render(scene, camera, renderer) {
    arm.rotation.y = effectController.uy * Math.PI / 180;	// yaw
    arm.rotation.z = effectController.uz * Math.PI / 180;	// roll

    forearm.rotation.y = effectController.fy * Math.PI / 180;	// yaw
    forearm.rotation.z = effectController.fz * Math.PI / 180;	// roll

    // ADD handRight yaw AND translate HERE
    handLeft.rotation.z = effectController.hz * Math.PI / 180;	// yaw
    handLeft.position.z = effectController.htz;	// translate

    handRight.rotation.z = handLeft.rotation.z;
    handRight.position.z = -handLeft.position.z;

//    renderer.render(scene, camera);
}

function setupGui() {
    effectController = {
        uy: 70.0,
        uz: -15.0,

        fy: 10.0,
        fz: 60.0,

        hz: 30.0,
        htz: 12.0
    };

    h = WorkBench.Gui.addFolder("Arm angles");
    h.add(effectController, "uy", -180.0, 180.0, 0.025).name("Upper arm y");
    h.add(effectController, "uz", -45.0, 45.0, 0.025).name("Upper arm z");
    h.add(effectController, "fy", -180.0, 180.0, 0.025).name("Forearm y");
    h.add(effectController, "fz", -120.0, 120.0, 0.025).name("Forearm z");
    h.add(effectController, "hz", -45.0, 45.0, 0.025).name("Hand z");
    h.add(effectController, "htz", 2.0, 17.0, 0.025).name("Hand spread");
}

try {
    fillScene();
    setupGui();
    WorkBench.RegisterRender(render);
} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    $('#container').append(errorReport + e);
}
