//IF THIS SCRIPT IS ATTACHED TO A GAME OBJECT IT WILL SHOW A SPRITE JUST ONE TIME AND THEN WILL GO BACK TO HIDE POSITION... CAN ONLY USE ONE MATERIAL

#pragma strict
//ARGUMENTS

//spriteTime		- The time the sprite will last
//spriteTimeControl - When equals Time.time initiates the show of the sprite
//hidePos 			- When the sprite is not showing then the game object will be at hidePos.transform.position

// columnSize      - number of frames across (horizontal)
// rowSize         - number of frames down (vertical)
// colFrameStart   - where frame starts (remember 0 is first number in counting)
// rowFrameStart   - where frame starts (remember 0 is first number in counting)
// totalFrames     - number of frames in the animation (count regular)
// framesPerSecond - how fast do you want it to play through (Standard: 12 - 30 fps)



var positionerTransform			: Transform;					//THE GAME OBJECT OR TRANSFORM TO REFERENCE THE POSITION FOR THE SPRITE OBJECT USING THIS SCRIPT
var hidePos 					: Transform;					//THE GENERAL PLACE TO HIDE FOR THE GAME OBJECTS WHEN DONT HAVE TO BE ON SCREEN


var spriteTime 					: float;						//TO UNDERSTAND CHECK FLAPTIME AND FLAPTIMECONTROL IN Pyon PlayerControls SCRIPT
var spriteTimeControl 			: float;

//A READJUSTER FOR THE X, Y AND Z POSITIONS, IN CASE YOU DONT WANT THE SPRITE OBJECT TO BE AT THE LOCATION OF THE POSITIONER TRASNFORM
var posXreadjuster 				: float;							
var posYreadjuster 				: float;
var posZreadjuster 				: float;

var columnSize 					: int;
var rowSize 					: int;
var colFrameStart 				: int;
var rowFrameStart 				: int;
var totalFrames 				: int;
private var framesPerSecond 	: float; 


function Start()
{
	framesPerSecond =totalFrames/spriteTime;
}


function Update () 
{
	var aniPlay : Pyon_aniSprite;
	aniPlay	= GetComponent("Pyon_aniSprite");
	
	
	//SPRITE DISPLAY
	if((Time.time-spriteTimeControl)<spriteTime)				//FLAPPING IN PYON'S NORMAL STATUS
	{
		keepPos();
		aniPlay.aniSprite(columnSize, rowSize, colFrameStart, rowFrameStart, totalFrames, framesPerSecond, spriteTimeControl);
	}
	else
	{
		transform.position = hidePos.transform.position;
	}
	

}


function showSprite()
{
	spriteTimeControl = Time.time;
	keepPos();
}

function keepPos()
{
	transform.position = positionerTransform.transform.position;
	transform.position.x+=posXreadjuster;
	transform.position.y+=posYreadjuster;
	transform.position.z+=posZreadjuster;
}