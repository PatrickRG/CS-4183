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
var pressedKeys = {};
var lostGame = false;

function sceneControl(sceneNode)
{


    var elapsedTime = getElapsedTime();
    var userData = sceneNode["userData"];
    var children = sceneNode.children;
    //debug("children " + children.length + "\n");
    child1 = children[2];
    if (child1 instanceof THREE.Mesh)
    {
        child1.position.x = -10;
        child1.position.y = 10;
        child1.scale.set(10,10,0)
    }
    child2 = children[3];
    if (child2 instanceof THREE.Mesh)
    {  
        child2.position.x = -10;
        child2.position.y = -10;
        child2.scale.set(10,10,0)
    }
    child3 = children[4];
    if (child3 instanceof THREE.Mesh)
    {

        child3.position.x = 10;
        child3.position.y = 10;

        child3.scale.set(10,10,0)
    }
    child4 = children[5];
    if (child4 instanceof THREE.Mesh)
    {

        child4.position.x = 10;
        child4.position.y = -10;

        child4.scale.set(10,10,0)
    }
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
        firstTime();

    }

    if(lostGame == false && gameArray.length == playerArray.length)
    {
        //debug("Round passed!");
        playerArray = [];
        playGame();
    }
}

function firstTime()
{
    if(executing == false)
        var confirmation = window.confirm("Press 'Okay' to play!");
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
function mouseDeterminant(sceneNode)
{
    window.onmousedown = function(event)
    {
        var x = event.clientX;
        var y = event.clientY;
        var innerH = window.innerHeight/2;
        var innerW = window.innerWidth/2;
        //debug(innerW + " x " +  innerH + "\n");
        //debug(x + " " + y + "\n");
        switch(event.which)
        {
            case 1:
                if(x > innerW * 0.702 && x < innerW && y > innerH * 0.422 && y < innerH)
                {
                    greenClick();
                    playerArray.push(1);
                    //if(gameArray.length == playerArray.length)
                        checkCorrect();
                }
                if(x > innerW * 0.702 && x < innerW && y > innerH && y < innerH + (innerH * 0.6338))
                {
                    blueClick();
                    playerArray.push(2);
                    //if(gameArray.length == playerArray.length)
                        checkCorrect();
                }
                if(x > innerW && x < innerW + (innerW * 0.702) && y > innerH * 0.422 && y < innerH)
                {
                    yellowClick();
                    playerArray.push(3);
                    //if(gameArray.length == playerArray.length)
                        checkCorrect();
                }
                if(x > innerW && x < innerW + (innerW * 0.702) && y > innerH && y < innerH + (innerH * 0.6338))
                {
                    redClick();
                    playerArray.push(4);
                    //if(gameArray.length == playerArray.length)
                        checkCorrect();
                }
                break;
        }

    }
    window.onmouseup = function(event)
    {
        
    }
}

function green()
{
    child1.material.color = new THREE.Color(0, 1, 0);
    setTimeout(function(){ child1.material.color = new THREE.Color(0, 0.5, 0); }, 700);
}
function blue()
{
    child2.material.color = new THREE.Color(0, 0, 1);
    setTimeout(function(){ child2.material.color = new THREE.Color(0, 0, 0.5); }, 700);
}
function yellow()
{
    child3.material.color = new THREE.Color(1, 1, 0);
    setTimeout(function(){ child3.material.color = new THREE.Color(0.5, 0.5, 0); }, 700);
}
function red()
{
    child4.material.color = new THREE.Color(1, 0, 0);
     setTimeout(function(){ child4.material.color = new THREE.Color(0.5, 0, 0); }, 700);
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
