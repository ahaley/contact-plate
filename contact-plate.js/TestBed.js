var contactPlate = ContactPlate.create();


contactPlate.subject.position.y = 50;

WorkBench.Scene.add(contactPlate.subject);

WorkBench.registerRender(contactPlate.render);

// to make working with angles easy
window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;


Leap.loop({ background: true }, {

    // hand callbacks are run once for each hand in the frame
    hand: function(hand){

        ContactPlate.Hands.arrows.render(hand);

        WorkBench.render();
    }

})
    .use('handHold')
    .use('handEntry')
    .on('handFound', function (hand) {
        var obj = ContactPlate.Hands.arrows.init(hand);
        WorkBench.Scene.add(obj);
    })
    .on('handLost', function (hand) {
        var obj = ContactPlate.Hands.arrows.cleanup(hand);
        WorkBench.Scene.remove(obj);
        WorkBench.render();
    })
    .connect();