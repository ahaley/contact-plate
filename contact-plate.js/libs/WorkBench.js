/// <reference path="lib/jquery-1.8.3.min.js" />
/// <reference path="lib/three.min.js" />
/// <reference path="lib/Coordinates.js" />
/// <reference path="lib/OrbitAndPanControls.js" />
/// <reference path="lib/dat.gui.min.js" />

var WorkBench = (function () {

    var camera, scene, renderer, gui;
    var cameraControls, effectController;
    var clock = new THREE.Clock();
    var gridX = true;
    var gridY = false;
    var gridZ = false;
    var axes = true;
    var ground = true;
    var renders = [];

    function initScene() {
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x808080, 2000, 4000);

        // LIGHTS
        var ambientLight = new THREE.AmbientLight(0x222222);
        var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(200, 400, 500);
        var light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light2.position.set(-500, 250, -200);
        scene.add(ambientLight);
        scene.add(light);
        scene.add(light2);
    }

    function initRenderer() {
        var canvasWidth = 846;
        var canvasHeight = 494;
        // For grading the window is fixed in size; here's general code:
        //var canvasWidth = window.innerWidth;
        //var canvasHeight = window.innerHeight;
        var canvasRatio = canvasWidth / canvasHeight;

        // RENDERER
        window.renderer = renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        //renderer.setSize(canvasWidth, canvasHeight);
        renderer.setClearColor(0xAAAAAA, 1.0);

        window.renderer.setSize(window.innerWidth, window.innerHeight);
        window.renderer.domElement.style.position = 'fixed';
        window.renderer.domElement.style.top = 0;
        window.renderer.domElement.style.left = 0;
        window.renderer.domElement.style.width = '100%';
        window.renderer.domElement.style.height = '100%';


        // CAMERA
        camera = new THREE.PerspectiveCamera(38, canvasRatio, 1, 10000);
        // CONTROLS
        cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
        camera.position.set(-300, 100, 54);
        cameraControls.target.set(0, 50, 0);
        //cameraControls.target.set(54, 106, 33);
    }

    function drawHelpers() {
        if (ground) {
            Coordinates.drawGround({ size: 10000 }, scene);
        }
        if (gridX) {
            Coordinates.drawGrid({ size: 10000, scale: 0.01 }, scene);
        }
        if (gridY) {
            Coordinates.drawGrid({ size: 10000, scale: 0.01, orientation: "y" }, scene);
        }
        if (gridZ) {
            Coordinates.drawGrid({ size: 10000, scale: 0.01, orientation: "z" }, scene);
        }
        if (axes) {
            Coordinates.drawAllAxes({ axisLength: 200, axisRadius: 1, axisTess: 50 }, scene);
        }
    }

    function addToDOM() {
        var container = document.getElementById('container');
        var canvas = container.getElementsByTagName('canvas');
        if (canvas.length > 0) {
            container.removeChild(canvas[0]);
        }
        container.appendChild(renderer.domElement);
    }

    function setupGui() {

        effectController = {
            newGridX: gridX,
            newGridY: gridY,
            newGridZ: gridZ,
            newGround: ground,
            newAxes: axes,
        };

        gui = new dat.GUI();
        var h = gui.addFolder("Grid display");
        h.add(effectController, "newGridX").name("Show XZ grid");
        h.add(effectController, "newGridY").name("Show YZ grid");
        h.add(effectController, "newGridZ").name("Show XY grid");
        h.add(effectController, "newGround").name("Show ground");
        h.add(effectController, "newAxes").name("Show axes");
    }

    function animate() {
        window.requestAnimationFrame(animate);
        render();
    }

    function render() {
        var delta = clock.getDelta();
        cameraControls.update(delta);

        if (effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes) {
            gridX = effectController.newGridX;
            gridY = effectController.newGridY;
            gridZ = effectController.newGridZ;
            ground = effectController.newGround;
            axes = effectController.newAxes;

            initScene();
            drawHelpers();
        }

        renderer.render(scene, camera);
        $.each(renders, function (index, render) {
            render(scene, camera, renderer)
        })
    }

    function registerRender(render)
    {
        renders.push(render);
    }

    try {
        initRenderer();
        initScene();
        drawHelpers();
        addToDOM();
        setupGui();
        animate();
    }
    catch (e) {
        var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
        $('#container').append(errorReport + e);
    }
    return {
        Scene: scene,
        Gui: gui,
        registerRender: registerRender,
        render: render
    };
})();


