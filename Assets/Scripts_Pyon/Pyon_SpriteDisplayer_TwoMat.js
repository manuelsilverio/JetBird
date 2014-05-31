#pragma strict
//THIS SCRIPT COMMAND A GAMEOBJECT WITH THE SCRIPT PYON_ANISPRITE TO SHOW A SPRITE DIVIDED IN TWO MATERIALS

//ARGUMENTS

//spriteTime			- The time the sprite will last
//spriteTimeControlMat1 - When equals Time.time initiates the show of the sprite for the first material
//spriteTimeControlMat2 - When equals Time.time initiates the show of the sprite for the second material
//hidePos 				- When the sprite is not showing then the game object will be at hidePos.transform.position


// FIRST MATERIAL -------------------------------------------------------------
// columnSizeMat1      	- number of frames across (horizontal)
// rowSizeMat1         	- number of frames down (vertical)	
// colFrameStartMat1   	- where frame starts (remember 0 is first number in counting)
// rowFrameStartMat1  	- where frame starts (remember 0 is first number in counting)
// totalFramesMat1     	- number of frames in the animation (count regular)


// SECOND MATERIAL -------------------------------------------------------------
// columnSizeMat2      	- number of frames across (horizontal)
// rowSizeMat2         	- number of frames down (vertical)	
// colFrameStartMat2   	- where frame starts (remember 0 is first number in counting)
// rowFrameStartMat2  	- where frame starts (remember 0 is first number in counting)
// totalFramesMat2     	- number of frames in the animation (count regular)

// BOTH MATERIALS --------------------------------------------------------------
// framesPerSecond 		- how fast do you want it to play through (Standard: 12 - 30 fps)


var firstMat 					: Material;					//THE FIRST SPRITE SHEET
var secondMat 					: Material;					//THE SECOND SPRITE SHEET


var positionerTransform			: Transform;		//THE GAME OBJECT OR TRANSFORM TO REFERENCE THE POSITION FOR THE SPRITE OBJECT USING THIS SCRIPT
var hidePos 					: Transform;			//THE GENERAL PLACE TO HIDE FOR THE GAME OBJECTS WHEN DONT HAVE TO BE ON SCREEN


var spriteTime 					: float;						//TO UNDERSTAND CHECK FLAPTIME AND FLAPTIMECONTROL IN Pyon PlayerControls SCRIPT
var spriteTimeControlMat1		: float;
var spriteTimeControlMat2 		: float;

//A READJUSTER FOR THE X, Y AND Z POSITIONS, IN CASE YOU DONT WANT THE SPRITE OBJECT TO BE AT THE LOCATION OF THE POSITIONER TRASNFORM
var posXreadjuster 				: float;							
var posYreadjuster 				: float;
var posZreadjuster 				: float;

var columnSizeMat1 				: int;
var rowSizeMat1 				: int;
var colFrameStartMat1			: int;
var rowFrameStartMat1 			: int;
var totalFramesMat1 			: int;
private var framesPerSecond 	: float; 


var columnSizeMat2 				: int;
var rowSizeMat2 				: int;
var colFrameStartMat2 				: int;
var rowFrameStartMat2 				: int;
var totalFramesMat2 			: int;


private var spriteTimeMat1 		: float;
private var spriteTimeMat2 		: float;


function Start()
{
	spriteTimeMat1=spriteTime*totalFramesMat1/(totalFramesMat1+totalFramesMat2);
	spriteTimeMat2=spriteTime*totalFramesMat2/(totalFramesMat1+totalFramesMat2);
	framesPerSecond =(totalFramesMat1 + totalFramesMat2)/spriteTime;
}


function Update () 
{
	var aniPlay : Pyon_aniSprite;
	aniPlay	= GetComponent("Pyon_aniSprite");
	
	
	//SPRITE DISPLAY
	if((Time.time-spriteTimeControlMat1)<spriteTimeMat1)				//FLAPPING IN PYON'S NORMAL STATUS
	{
		renderer.material = firstMat;
		aniPlay.aniSprite(columnSizeMat1, rowSizeMat1, colFrameStartMat1, rowFrameStartMat1, totalFramesMat1, framesPerSecond, spriteTimeControlMat1);
		spriteTimeControlMat2=Time.time;
	}
	else if((Time.time-spriteTimeControlMat2)<spriteTimeMat2)
	{
		renderer.material = secondMat;
		aniPlay.aniSprite(columnSizeMat2, rowSizeMat2, colFrameStartMat2, rowFrameStartMat2, totalFramesMat2, framesPerSecond, spriteTimeControlMat2);
	}
	else
	{
		transform.position = hidePos.transform.position;
	}
	

}


function showSprite()
{
	spriteTimeControlMat1 = Time.time;
	keepPos();
}

function keepPos()
{
	transform.position = positionerTransform.transform.position;
	transform.position.x+=posXreadjuster;
	transform.position.y+=posYreadjuster;
	transform.position.z+=posZreadjuster;
}