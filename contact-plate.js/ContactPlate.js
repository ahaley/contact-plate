

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
        material: transparentMaterial,
        element: "box1",
        xOffset: 0,
        yOffset: 0,
        zOffset: 0
    };

    var availableWidgets = {};

    var availableElements = {};

    ContactPlate.addWidget = function (widget) {
        availableWidgets[widget.name] = widget;
    };

    ContactPlate.addElement = function (element) {
        availableElements[element.name] = element;
    };

    ContactPlate.Aggregate = function () {
        this.subject = new THREE.Object3D;
    };

    ContactPlate.Aggregate.prototype.render = function (scene, camera, renderer) {

    };

    ContactPlate.Aggregate.prototype.add = function (options) {

        options = $.extend(defaults, options);

        if (!availableWidgets.hasOwnProperty(options.name)) {
            console.log('Unknown widget name');
            return null;
        }

        var widgetGenerator = availableWidgets[options.name];

        if (!options.hasOwnProperty("plateRenderer") && options.hasOwnProperty("element")) {
            options.plateRenderer = availableElements.hasOwnProperty(options.element)
                ? availableElements[options.element]
                : { create: function () { } };
        }

        var widget = widgetGenerator.create(options);

        this.subject.add(widget);
        var that = this;
        return {
            remove: function () {
                that.subject.remove(widget);
            }
        }
    };


    ContactPlate.create = function (options) {
        var aggregate = new ContactPlate.Aggregate();
        return aggregate;
    };

    return ContactPlate;
})();
