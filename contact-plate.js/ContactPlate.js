var ContactPlate = {};

(function (ContactPlate) {

    var defaults = {
        Segments: 16
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

        var box = new THREE.Mesh(
                new THREE.CubeGeometry(30, 30, 4), material);

        aggregate.subject = new THREE.Object3D();
        aggregate.subject.add(box);

        return aggregate;
    }


})(ContactPlate);
