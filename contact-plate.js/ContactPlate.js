var ContactPlate = ContactPlate || {};

(function (ContactPlate) {

    var defaults = {
        segments: 12,
        radius: 55
    };

    var material = new THREE.MeshPhongMaterial({
        color: 0xCC3399,
        specular: 0xCC3399,
        shininess: 20
    });

    ContactPlate.Aggregate = function () {

    };

    ContactPlate.Aggregate.prototype.render = function (scene, camera, renderer) {

    };

    ContactPlate.create = function () {
        var aggregate = new ContactPlate.Aggregate();
        aggregate.subject = new THREE.Object3D();

        var plateRenderer = ContactPlate.PlateRenderer.Box1.create(material);

        var angleSegment = (Math.PI * 2) / defaults.segments;

        for (var i = 0; i <= defaults.segments; i++) {

            var angle = angleSegment * i;

            var plate = plateRenderer.render();

            plate.matrixAutoUpdate = false;

            var x = Math.cos(angle) * defaults.radius;
            var y = Math.sin(angle) * defaults.radius;

            plate.matrix.makeTranslation(x, y, 60);

            aggregate.subject.add(plate);
        }

        return aggregate;
    }


})(ContactPlate);
