var ContactPlate = ContactPlate || {};

(function (ContactPlate) {

    const color0 = 0xCC3399;
    const color1 = 0x2C5F7A;
    const color2 = 0x4E7093;
    const color3 = 0x70B5C5;

    var material = new THREE.MeshPhongMaterial({
        color: color1,
        specular: color1,
        shininess: 20
    });

    var transparentMaterial = new THREE.MeshLambertMaterial({
        color: color3,
        transparent: true,
        opacity: 0.5
    });

    var defaults = {
        segments: 12,
        radius: 55,
        material: transparentMaterial,
        rendererFactory: ContactPlate.PlateRenderer.Box1.create
    };

    ContactPlate.Aggregate = function () {

    };

    ContactPlate.Aggregate.prototype.render = function (scene, camera, renderer) {

    };

    ContactPlate.create = function (options) {

        options = $.extend(defaults, options);

        var aggregate = new ContactPlate.Aggregate();
        aggregate.subject = new THREE.Object3D();

        var plateRenderer = options.rendererFactory(options.material);

        var angleSegment = (Math.PI * 2) / options.segments;

        for (var i = 0; i < options.segments; i++) {

            var angle = angleSegment * i;

            var plate = plateRenderer.render(i);

            plate.matrixAutoUpdate = false;

            var x = Math.cos(angle) * options.radius;
            var y = Math.sin(angle) * options.radius;

            plate.matrix.makeTranslation(x, y, 60);

            aggregate.subject.add(plate);
        }

        return aggregate;
    }


})(ContactPlate);
