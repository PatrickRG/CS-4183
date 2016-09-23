
function rotateScript(sceneNode)
{
    if(pressedKeys[37] == true)
    	sceneNode.rotation.y -= 5 * Math.PI / 180;
    if(pressedKeys[39] == true)
    	sceneNode.rotation.y += 5 * Math.PI / 180;
    if(pressedKeys[40] == true)
    	sceneNode.rotation.x += 5 * Math.PI / 180;
    if(pressedKeys[38] == true)
    	sceneNode.rotation.x -= 5 * Math.PI / 180;

  }

