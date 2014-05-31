#pragma strict

//GENERAL VARIABLES

var textDistance 			: TextMesh;
var textRevivalTokens		: TextMesh;
var cameraOrtho 			: Camera;						//ORTHO MAIN CAMERA
var hidePosition 			: Transform;
var pyon 					: Transform;

var foodBar 				: Transform;  					//KNOWN AS THE LOAD BAR SUPER PYON


var foodBarMover 			: Transform;


//STATIC VARIABLES

static var soundEnable 		: boolean=true;
static var musicEnable 		: boolean=true;

static var distance  		: int;
static var distanceAux 		: float;
static var foodCollected 	: float; 
static var totalFood		: float=5;

//PRIVATE VARIABLES
private var distancePos 	: Vector3;
private var revivalTokensPos: Vector3;
private var foodBarPos 		: Vector3;




function Start () 
{
	distance = 0;
	foodCollected = 0;
	
}

function Update () 
{
	foodBar.renderer.material.mainTextureOffset = Vector2(0.5-((foodCollected/totalFood)/2), 0);

	//if(Pyon_HeroPropierties.pyonState!=PyonState.PyonSleep && Pyon_HeroPropierties.pyonState!=PyonState.PyonSurprised && Pyon_HeroPropierties.pyonState!=PyonState.PyonDead && Pyon_HeroPropierties.pyonState!=PyonState.PyonReviving)
	if(pyon.rigidbody.velocity.x>0)
	{
		distanceAux+=8*Time.deltaTime;
		distance = Mathf.Round(distanceAux);
	}	
	
	if(distance<10 && distance>0)
	{
		textDistance.text ="000"+ distance + " m";
	}
	else if(distance<100 && distance>10)
	{
		textDistance.text ="00"+ distance + " m";
	}
	else if(distance<1000 && distance>100)
	{
		textDistance.text ="0"+ distance + " m";
	}
	else if(distance>1000)
	{
		textDistance.text = distance + " m";
	}
	
	textRevivalTokens.text = "x "+Pyon_GeneralVars_Script.revivalTokens;
																																															

}

function LateUpdate()
{
	//ALL THE BELOW IS FOR PLACING THE TRANSFORM ON THE EDGES OF THE SCREEN... THE FOOD BAR, THE DISTANCE TEXT, THE REVIVAL TOKENS
	distancePos = cameraOrtho.ScreenToWorldPoint (Vector3 (0, cameraOrtho.pixelHeight, 15));
	revivalTokensPos = cameraOrtho.ScreenToWorldPoint (Vector3 (0, cameraOrtho.pixelHeight, 15));
	foodBarPos = cameraOrtho.ScreenToWorldPoint (Vector3 (0, 0, 15));
	
	distancePos+= Vector3(0.6,-0.5, 0);
	revivalTokensPos+= Vector3(2,-1.5, 0);
	foodBarPos+= Vector3(0.2, 0.1, 0);
	
	
	if(Pyon_MenuPause_Script.pauseMenuEnable==true || Pyon_HeroPropierties.pyonState==PyonState.PyonSleep)
	{
		foodBarMover.transform.position = hidePosition.transform.position;
		textDistance.transform.position = hidePosition.transform.position;
		textRevivalTokens.transform.position = hidePosition.transform.position;
	}
	else
	{
		foodBarMover.transform.position = foodBarPos;
		textDistance.transform.position = distancePos;
		textRevivalTokens.transform.position = revivalTokensPos;
	}
	
}