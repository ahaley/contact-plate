var ContactPlate = ContactPlate || {};

(function (ContactPlate) {

    ContactPlate.PlateRenderer = function (material, geometry) {
        this.material = material;
        this.geometry = geometry;
    };

    ContactPlate.PlateRenderer.Box1 = {
        create: function(material) {
            var geometry = new THREE.CubeGeometry(20, 16, 0.4);

            return {
                render: function (i) {
                    return new THREE.Mesh(geometry, material);
                }
            }
        }
    };

    var textMaterial = new THREE.MeshLambertMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.5
    });

    ContactPlate.PlateRenderer.BoxWithIndexText = {
        create: function (material) {
            var boxR = ContactPlate.PlateRenderer.Box1.create(material);


            return {
                render: function (i) {
                    var textGeo = new THREE.TextGeometry(i.toString(), {
                        size: 12,
                        height: 2
                    });

                    var textM = new THREE.Mesh(textGeo, textMaterial);
                    textM.position.x -= 5;
                    textM.position.y -= 5;
                    textM.position.z = 2;
                    var aggregate = new THREE.Object3D();
                    aggregate.add(textM);
                    var boxM = boxR.render();
                    aggregate.add(boxM);
                    return aggregate;
                }
            }


        }
    }


})(ContactPlate);

