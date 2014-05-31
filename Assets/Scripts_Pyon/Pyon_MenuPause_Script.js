//SCRIPT FOR SHOWING AND CONTROLLING THE PAUSE MENU

#pragma strict

//SOUND GENERAL VARIABLES
var tapButtonSound			: AudioClip;


//GENERAL VARIABLES
var cameraOrtho 			: Camera;						//ORTHO MAIN CAMERA
var hidePosition 			: Transform;					//THE HIDE POSITION GAME OBJECT


//BUTTONS GENERAL VARIABLES
var pauseButtonContinue 	: Transform;
var pauseButtonRetry 		: Transform;
var pauseButtonQuit 		: Transform;

var buttonPause 			: Transform;


//MOVERS GENERAL VARIABLES

var pauseTitleMissionsMover : Transform;
var pauseButtonsMover 		: Transform;


//PRIVATE VARIABLES
private var triggerContinue			: boolean = false;
private var triggerRetry			: boolean = false;
private var triggerQuit				: boolean = false;
private var triggerPause			: boolean = false;


//THE POSITIONS FOR THE PAUSE MENU ELEMENTS
private var pauseMenuPos			: Vector3;
private var pauseMenuButtonsPos 	: Vector3;
private var pauseButtonPos 			: Vector3;


static var pauseMenuEnable 			: boolean = false;
static var retryEnable 				: boolean = false;


function Start () 
{
	

}

function Update () 
{

	

//INPUT PART
	if(Input.GetMouseButtonDown(0)) //pc pc pc pc pc																//this code is for pc
	//if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
	{
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
		
		//------- BUTTON PAUSE
		if(Physics.Raycast(ray, hit, 200) && hit.transform.name == "ButtonPause")							
		{
			triggerPause=true;
			buttonPause.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		}
		else
		{
			triggerPause=false;
			buttonPause.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
		}
		//------- BUTTON CONTINUE
		if(Physics.Raycast(ray, hit, 200) && hit.transform.name == "PauseButtonContinue")							
		{
			triggerContinue=true;
			pauseButtonContinue.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		}
		else
		{
			triggerContinue=false;
			pauseButtonContinue.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
		}
		//------- BUTTON QUIT
		if(Physics.Raycast(ray, hit, 200) && hit.transform.name == "PauseButtonQuit")							
		{
			triggerQuit=true;
			pauseButtonQuit.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		}
		else
		{
			triggerQuit=false;
			pauseButtonQuit.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
		}
		//------- BUTTON RETRY
		if(Physics.Raycast(ray, hit, 200) && hit.transform.name == "PauseButtonRetry")							
		{
			triggerRetry=true;
			pauseButtonRetry.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		}
		else
		{
			triggerRetry=false;
			pauseButtonRetry.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
		}
	}
	
	//--------------------------------------------------------------------
	if(Input.GetMouseButtonUp(0))
	//if(Input.GetTouch(0).phase == TouchPhase.Ended) 
	{
		
		if(triggerPause==true)			//IT MEANS THE PROFILE BUTTON WAS THE LAST TO BE TAPPED
		{
			buttonPause.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			pauseGame();
		}
		if(triggerContinue==true)			//IT MEANS THE PROFILE BUTTON WAS THE LAST TO BE TAPPED
		{
			pauseButtonContinue.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			resumeGame();
		}
		if(triggerRetry==true)			//IT MEANS THE PROFILE BUTTON WAS THE LAST TO BE TAPPED
		{
			pauseButtonRetry.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			retryGame();
		}
		if(triggerQuit==true)			//IT MEANS THE PROFILE BUTTON WAS THE LAST TO BE TAPPED
		{
			pauseButtonQuit.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			quitGame();
		}
	}
}

function LateUpdate()
{
//TRANSFORM PART-------------------
	pauseMenuPos 		= cameraOrtho.ScreenToWorldPoint (Vector3 (cameraOrtho.pixelWidth/2, cameraOrtho.pixelHeight, 15));
	pauseMenuButtonsPos = cameraOrtho.ScreenToWorldPoint (Vector3 (cameraOrtho.pixelWidth/2, 0, 15)); 
	pauseButtonPos 		= cameraOrtho.ScreenToWorldPoint (Vector3 (cameraOrtho.pixelWidth, cameraOrtho.pixelHeight, 15));
	
	pauseMenuButtonsPos+= Vector3(0, 1, 0);
	pauseButtonPos 	   += Vector3(-1, -1, 0); 
	
	
	if(pauseMenuEnable==false)
	{
		buttonPause.transform.position = pauseButtonPos;										//LOCATE THE PAUSE BUTTON IN THE RIGHT UPPER CORNER
		pauseTitleMissionsMover.transform.position = hidePosition.transform.position;			//HIDE THE TITLE AND MISSIONS HOLDER
		pauseButtonsMover.transform.position = hidePosition.transform.position;					//HIDE THE PAUSE MENU BUTTONS
	}
	else if(pauseMenuEnable==true)
	{
		buttonPause.transform.position = hidePosition.transform.position;						//HIDE THE PAUSE BUTTON IN THE RIGHT UPPER CORNER
		pauseTitleMissionsMover.transform.position = pauseMenuPos;								//LOCATE THE TITLE AND MISSIONS HOLDER
		pauseButtonsMover.transform.position = pauseMenuButtonsPos;								//LOCATE THE PAUSE MENU BUTTONS
	}
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonSleep)
	{
		buttonPause.transform.position = hidePosition.transform.position;						//HIDE THE PAUSE BUTTON IN THE RIGHT UPPER CORNER
	}
}

function playSound (soundName : AudioClip, soundVolume : float)
{
	if(Pyon_SceneVariables_Script.soundEnable==true)
	{
		audio.PlayOneShot(soundName , soundVolume);
	}
	
}


function pauseGame()
{
	playSound(tapButtonSound, 1);
	Time.timeScale = 0;
	pauseMenuEnable=true;
}

function resumeGame()
{
	playSound(tapButtonSound, 1);
	Time.timeScale = 1;
	pauseMenuEnable=false;
}

function retryGame()
{
	Time.timeScale = 0.001;
	playSound(tapButtonSound, 1);
	yield WaitForSeconds(0.001*tapButtonSound.length);
	Time.timeScale = 1;
	pauseMenuEnable=false;
	retryEnable=true;
	Application.LoadLevel("Pyon_MainScene");

}

function quitGame()
{
	Time.timeScale = 0.001;
	playSound(tapButtonSound, 1);
	yield WaitForSeconds(0.001*tapButtonSound.length);
	Time.timeScale = 1;
	pauseMenuEnable=false;
	Application.LoadLevel("Pyon_MainScene");

}