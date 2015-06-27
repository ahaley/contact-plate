

var ContactPlate = (function () {

    const color0 = 0xCC3399;
    const color1 = 0x2C5F7A;
    const color2 = 0x4E7093;
    const color3 = 0x70B5C5;

    var ContactPlate = {};

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
        rendererFactory: function () { }
    };

    var availableWidgets = {};

    ContactPlate.addWidget = function (widget) {
        availableWidgets[widget.name] = widget;
    };

    ContactPlate.Aggregate = function () {
        this.subject = new THREE.Object3D;
    };

    ContactPlate.Aggregate.prototype.render = function (scene, camera, renderer) {

    };


    ContactPlate.create = function (options) {

        options = $.extend(defaults, options);

        if (!availableWidgets.hasOwnProperty(options.name)) {
            console.log('Unknown widget name');
            return null;
        }

        var aggregate = new ContactPlate.Aggregate();

        var widgetGenerator = availableWidgets[options.name];

        var widget = widgetGenerator.create(options);

        aggregate.subject.add(widget);


        return aggregate;
    };

    return ContactPlate;
})();
