//var totalRotation = 0;
var turbo = 0.1;
//spin directionVector or distance/radius of wheel



function driveScript(sceneNode)
{
    var n = getChildByName(sceneNode, "car");
    var w1 = sceneNode.getObjectByName("wheel1");
    var w2 = sceneNode.getObjectByName("wheel2");
    var w3 = sceneNode.getObjectByName("wheel3");
    var w4 = sceneNode.getObjectByName("wheel4");
    var directionX = 0;
    var directionZ = 0;

    if (pressedKeys[38])
	{
        var directionX = turbo * Math.cos(n.rotation.y);
        var directionZ =  turbo * Math.sin(-n.rotation.y);
		var directionVector = new THREE.Vector3(directionX, 0, directionZ);

		n.position.add(directionVector);

        //debug(w1);
        var length = directionVector.length()/0.6;
        w1.rotation.z -= length;
        w2.rotation.z -= length;
        w3.rotation.z -= length;
        w4.rotation.z -= length;
	}
    if (pressedKeys[40])
    {
        var directionX = turbo * Math.cos(n.rotation.y);
        var directionZ =  turbo * Math.sin(-n.rotation.y);
        var directionVector = new THREE.Vector3(-directionX, 0, -directionZ);
        n.position.add(directionVector);

        var length = directionVector.length()/0.6;
        w1.rotation.z += length;
        w2.rotation.z += length;
        w3.rotation.z += length;
        w4.rotation.z += length;
    }
    else{
        directionX *= 0.7;
        directionZ *= 0.7;
        var directionVector = new THREE.Vector3(directionX, 0, directionZ);
        n.position.add(directionVector);

    }
    if (pressedKeys[37]){
        n.rotation.set(n.rotation.x, n.rotation.y + 0.1, n.rotation.z);
    }
    if (pressedKeys[39]){
        n.rotation.set(n.rotation.x, n.rotation.y - 0.1, n.rotation.z);
    }
    if (pressedKeys[187])
    {
        turbo += 0.01;
    }
    if (pressedKeys[189])
    {
        if(turbo >= 0.01)
            turbo -= 0.01;
    }
    if(pressedKeys[49]){
        var camera = getChildByName(sceneNode, "camera1");
        setCamera(camera);
    }
    if(pressedKeys[50]){
        var camera = getChildByName(sceneNode, "camera2");
        setCamera(camera);
    }
    if(pressedKeys[51]){
        var camera = getChildByName(sceneNode, "camera3");
        setCamera(camera);
    }



    var house = getChildByName(sceneNode, "building");
    var house2 = getChildByName(sceneNode, "building2");

    if(checkCollision(n, house) ){
        window.alert("You crashed!");
        n.position.x = 0;
        n.position.z = 0;
        n.rotation.set(0, 0, 0);
        var directionX = 0;
        turbo = 0.2;
        var directionZ = 0;
        pressedKeys[38] = false;
        pressedKeys[37] = false;
        pressedKeys[39] = false;

    }

    if(checkCollision(n, house2) ){
        window.alert("You crashed!");
        n.position.x = 0;
        n.position.z = 0;
        n.rotation.set(0, 0, 0);
        var directionX = 0;
        var directionZ = 0;
        turbo = 0.2;
        pressedKeys[38] = false;
        pressedKeys[37] = false;
        pressedKeys[39] = false;
    }
}
