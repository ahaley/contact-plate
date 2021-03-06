(function (ContactPlate) {

    ContactPlate.RotaryMenu = { name: "rotary-menu" };

    ContactPlate.RotaryMenu.render = function (scene, camera, renderer) {
    };

    var defaults = {
        segments: 12,
        radius: 55
    };

    ContactPlate.RotaryMenu.create = function(options) {

        options = $.extend(defaults, options);

        var obj = new THREE.Object3D();

        obj.name = this.name;

        var plateRenderer = options.plateRenderer.create(options.material);

        var angleSegment = (Math.PI * 2) / options.segments;

        for (var i = 0; i < options.segments; i++) {

            var angle = angleSegment * i;

            var plate = plateRenderer.render(i);

            plate.matrixAutoUpdate = false;

            var x = Math.cos(angle) * options.radius;
            var y = Math.sin(angle) * options.radius;

            plate.matrix.makeTranslation(x, y, 60);

            obj.add(plate);
        }

        obj.position.x += options.xOffset;

        return obj;
    };

    ContactPlate.addWidget(ContactPlate.RotaryMenu);

})(ContactPlate);