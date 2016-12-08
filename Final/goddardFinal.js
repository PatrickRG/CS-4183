//var totalRotation = 0;
var turbo = 0.4;
//spin directionVector or distance/radius of wheel
var checker = true;
var startTime = new Date();

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
    if(pressedKeys[52]){
        var camera = getChildByName(n, "FPSCamera");
        setCamera(camera);
    }
    if(pressedKeys[53]){
        var camera = getChildByName(n, "TPSCamera");
        setCamera(camera);
    }



    var house = getChildByName(sceneNode, "building");
    var house2 = getChildByName(sceneNode, "building2");
    var box = getChildByName(sceneNode, "skyBox");

    if(checkCollision(n, house) ){
        died(sceneNode);

    }

    if(checkCollision(n, house2) ){
        died(sceneNode);
    }

    if(!checkCollision(n, box) ){
        died(sceneNode);
    }

    spawnBullets(sceneNode, n);
}

function died(sceneNode){
    var endTime = new Date();
    var timeDifference = (endTime - startTime)/1000;
    var seconds = Math.round(timeDifference % 60);
    debug("You died! You survived: " + seconds + " seconds!");
    location.reload();
}

function spawnBullets(sceneNode, n){
    var bulletSelector = Math.floor(Math.random() * (4));
    //debug(bulletSelector + "\n");
    var bulletNode = getChildByName(sceneNode, "bullets");
    var bullets = bulletNode.children;
    if(frameNum % 30 == 0){
        var particle = bullets[bulletSelector].clone();
        if(bulletSelector == 0)
            particle.position.z = Math.floor(Math.random() * (150) - 100);
        if(bulletSelector == 2)
            particle.position.z = Math.floor(Math.random() * (150) - 100);
        if(bulletSelector == 1)
            particle.position.x = Math.floor(Math.random() * (160) - 80);
        if(bulletSelector == 3)
            particle.position.x =  Math.floor(Math.random() * (160) - 80);
        bullets.push(particle);
    }
    if(checker)
    {
        bullets[2].rotation.y = Math.PI/2;
        bullets[0].rotation.y = 3 * Math.PI/2;
        bullets[1].rotation.y = 2 * Math.PI/2;
        checker = false;
    }
	for(var i = 4; i < bullets.length; i++) {

        if(bullets[i].userData["velocity"][0] == 1 || bullets[i].userData["velocity"][0] == -1)
              bullets[i].position.x += 0.5 * bullets[i].userData["velocity"][0];

        if(bullets[i].userData["velocity"][2] == 1 || bullets[i].userData["velocity"][2] == -1)
              bullets[i].position.z += 0.5 * bullets[i].userData["velocity"][2];
    }
    for(var i = 4; i < bullets.length; i++) {
        if(checkCollision(n, bullets[i])){
            died(sceneNode);
        }
    }
}

function rotateScript(sceneNode)
{
    var rotationSpeed = sceneNode.userData["rotationSpeed"];
    sceneNode.rotateOnAxis(YAXIS, rotationSpeed*frameDuration);
    if (pressedKeys[UP_ARROW]){
            debug("wehere");
			cycleCamera();
	}
}

function getChildByName(sceneNode, childName)
{
	var children = sceneNode.children;
	for (var i=0; i<children.length; i++) {
		if (children[i].name == childName)
            return children[i];
	}
}
