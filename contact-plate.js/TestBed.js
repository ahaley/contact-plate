var contactPlate = ContactPlate.create();


contactPlate.subject.position.y = 50;

WorkBench.Scene.add(contactPlate.subject);

WorkBench.RegisterRender(contactPlate.render);