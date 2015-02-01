var ContactPlate = ContactPlate || {};

(function (ContactPlate) {

    ContactPlate.PlateRenderer = function (material, geometry) {
        this.material = material;
        this.geometry = geometry;
    };

    ContactPlate.PlateRenderer.prototype.render = function () {
        var obj = new THREE.Mesh(this.geometry, this.material);
        return obj;
    };

    ContactPlate.PlateRenderer.Box1 = {
        create: function(material) {
            var geometry = new THREE.CubeGeometry(5, 5, 0.4);
            return new ContactPlate.PlateRenderer(
                material, geometry
            );
        }
    }


})(ContactPlate);

