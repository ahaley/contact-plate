var ContactPlate = ContactPlate || {};

(function (ContactPlate) {


    var material = new THREE.MeshPhongMaterial({
        color: 0xCC3399,
        specular: 0xCC3399,
        shininess: 20
    });

    var transparentMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC3399,
        transparent: true,
        opacity: 0.5
    });

    var defaults = {
        segments: 12,
        radius: 55,
        material: transparentMaterial,
        rendererFactory: ContactPlate.PlateRenderer.Box1.create,


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
