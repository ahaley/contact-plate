var ContactPlate = ContactPlate || {};

(function (ContactPlate) {

    ContactPlate.RotaryMenu = { name: "rotary-menu" };

    ContactPlate.RotaryMenu.render = function (scene, camera, renderer) {
    };

    ContactPlate.RotaryMenu.create = function(options) {

        var aggregate = new ContactPlate.RotaryMenu();

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
    };

    ContactPlate.addWidget(ContactPlate.RotaryMenu);

})(ContactPlate);