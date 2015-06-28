(function (ContactPlate) {

    ContactPlate.Keyboard = { name: "keyboard" };

    ContactPlate.Keyboard.render = function (scene, camera, renderer) {
    };

    var defaults = {
        spacing: 25,
        rowSpacing: 20
    };

    ContactPlate.Keyboard.create = function (options) {

        var obj = new THREE.Object3D();

        options = $.extend(defaults, options);

        var plateRenderer = options.plateRenderer.create(options.material);

        var lines = [
            "1234567890-=",
            "qwertyuiop[]\\",
            "asdfghjkl;'",
            "zxcvbnm,./"
        ];

        lines.forEach(function (line, rowIndex) {
            for (var i = 0; i < line.length; i++) {

                var plate = plateRenderer.render(line[i]);

                plate.matrixAutoUpdate = false;

                var x = i * options.spacing + rowIndex * 4;
                var y = -rowIndex * options.rowSpacing;

                plate.matrix.makeTranslation(x, y, 60);

                obj.add(plate);
            }

        });
        obj.position.x += -140 + options.xOffset;

        return obj;
    };

    ContactPlate.addWidget(ContactPlate.Keyboard);

})(ContactPlate);