
function rotateScript(sceneNode)
{
    var rotationSpeed = sceneNode.userData["rotationSpeed"];
    sceneNode.rotateOnAxis(YAXIS, rotationSpeed*frameDuration);
    if(pressedKeys[38]){
        var cam = currentScene.getObjectByName("camera2");
        switchCamera(cam);
    }
}

function getChildByName(sceneNode, childName)
{
	var children = sceneNode.children;
	for (var i=0; i<children.length; i++) {
		if (children[i].name == childName) return children[i];
	}
	return undefined;
}
