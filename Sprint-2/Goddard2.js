var child1;
var child2;
var child3;
var executing = false;
var child1 = {};
var child2 = {};
var child3 = {};
var child4 = {};
var gameArray = [];
var playerArray = [];
var wrongChoice = false;
var lostGame = false;
var camCount = 0;
var print = true;
function sceneControl(sceneNode)
{


    var elapsedTime = getElapsedTime();
    var userData = sceneNode["userData"];
    var children = sceneNode.children;
    //debug("children " + children.length + "\n");
    child1 = children[2];
    if (child1 instanceof THREE.Mesh)
    {
        child1.position.x = -12;
        child1.position.y = 12;
        child1.scale.set(10,10,10)
    }
    child2 = children[3];
    if (child2 instanceof THREE.Mesh)
    {
        child2.position.x = -12;
        child2.position.y = -12;
        child2.scale.set(10,10,10)
    }
    child3 = children[4];
    if (child3 instanceof THREE.Mesh)
    {

        child3.position.x = 12;
        child3.position.y = 12;

        child3.scale.set(10,10,10)
    }
    child4 = children[5];
    if (child4 instanceof THREE.Mesh)
    {

        child4.position.x = 12;
        child4.position.y = -12;

        child4.scale.set(10,10,10)
    }
}
function printControls()
{
    if(print == true){
        debug("CONTROLS: Q -green, W -yellow, S -red, A -blue");
        print = false;
    }
}
function rotateScript(sceneNode)
{
    sceneNode.rotation.x -= .1 * Math.PI / 180;
}
function cameraRotate(sceneNode)
{
    sceneNode.rotation.z -= .5 * Math.PI / 180;
}

function lightCubes()
{
    for(var i = 0; i < gameArray.length; i++)
    {
        (function(i)
        {
        setTimeout(function(){
            if(gameArray[i] == 1)
                green();
            if(gameArray[i] == 2)
                blue();
            if(gameArray[i] == 3)
                yellow();
            if(gameArray[i] == 4)
                red();
        }, 1500 * i);
        }(i));

    }
}

function checkCorrect()
{
    for(var i = 0; i < playerArray.length; i++)
    {
        if(gameArray[i] != playerArray[i])
        {
            window.alert("You lost!");
            lostGame = true;
        }
    }

    if(lostGame == true)
    {
        //debug("New Game Beginning");
        lostGame = false;
        executing = false;
        playerArray = [];
        gameArray = [];
        letsGo();

    }

    if(lostGame == false && gameArray.length == playerArray.length)
    {
        debug("Round passed!");
        playerArray = [];
        playGame();
    }
}
function letsGo(){
    delete pressedKeys[81];
    delete pressedKeys[87];
    delete pressedKeys[65];
    delete pressedKeys[83];
    firstTime();
}

function firstTime()
{

    if(executing == false)
        var confirmation = window.confirm("Press 'Okay' to play!\n CONTROLS: Q -green, W -yellow, S -red, A -blue");
    if(confirmation)
    {
        executing = true;
        playGame();
    }
}

function playGame(sceneNode)
{
    var nextGameBlock = Math.floor((Math.random() * 4) + 1);
    gameArray.push(nextGameBlock);
    //debug("Player Array contents: " + playerArray.toString() + "\n");
    //debug("Game Array Contents: " + gameArray.toString() + "\n");
    setTimeout(function(){
        lightCubes();
    }, 2000);
    debug("\n\n");

}


function updateKeys(sceneNode)
{

        if(pressedKeys[81] == true)
        {
            delete pressedKeys[81];
            greenClick();
            playerArray.push(1);
            //if(gameArray.length == playerArray.length)
                checkCorrect();

        }
        else if(pressedKeys[65] == true)
        {
            delete pressedKeys[65];
            blueClick();
            playerArray.push(2);
            //if(gameArray.length == playerArray.length)
                checkCorrect();

        }
        else if(pressedKeys[87] == true)
        {
            delete pressedKeys[87];
            yellowClick();
            playerArray.push(3);
            //if(gameArray.length == playerArray.length)
                checkCorrect();

        }
        else if(pressedKeys[83] == true)
        {
            delete pressedKeys[83];
            redClick();
            playerArray.push(4);
            //if(gameArray.length == playerArray.length)
            checkCorrect();

        }

}

function green()
{
    child1.material.color = new THREE.Color(0, 1, 0);
    setTimeout(function(){ child1.material.color = new THREE.Color(0, 0.5, 0); }, 200);
}
function blue()
{
    child2.material.color = new THREE.Color(0, 0, 1);
    setTimeout(function(){ child2.material.color = new THREE.Color(0, 0, 0.5); }, 200);
}
function yellow()
{
    child3.material.color = new THREE.Color(1, 1, 0);
    setTimeout(function(){ child3.material.color = new THREE.Color(0.5, 0.5, 0); }, 200);
}
function red()
{
    child4.material.color = new THREE.Color(1, 0, 0);
     setTimeout(function(){ child4.material.color = new THREE.Color(0.5, 0, 0); }, 200);
}


function greenClick()
{
    child1.material.color = new THREE.Color(0, 1, 0);
    setTimeout(function(){ child1.material.color = new THREE.Color(0, 0.5, 0); }, 200);
}
function blueClick()
{
    child2.material.color = new THREE.Color(0, 0, 1);
    setTimeout(function(){ child2.material.color = new THREE.Color(0, 0, 0.5); }, 200);
}
function yellowClick()
{
    child3.material.color = new THREE.Color(1, 1, 0);
    setTimeout(function(){ child3.material.color = new THREE.Color(0.5, 0.5, 0); }, 200);
}
function redClick()
{
    child4.material.color = new THREE.Color(1, 0, 0);
     setTimeout(function(){ child4.material.color = new THREE.Color(0.5, 0, 0); }, 200);
}
