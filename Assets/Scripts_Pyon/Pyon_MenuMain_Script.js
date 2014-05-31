//SCRIPT FOR CONTROOLLING THE GAME MENU

#pragma strict

//SOUND GENERAL VARIABLES

var showMenuSound		: AudioClip;
var hideMenuSound		: AudioClip;
var tapButtonSound		: AudioClip;



//GENERAL VARIABLES

var menuHolderTitle 	: Transform;					//THE TITLE OF THE SUB MENU HOLDER
var mainMenuMover 		: Transform;					//THE PARENT OF THE MAINMENU OBJECTS
var menuHolderMover 	: Transform;					//THE PARENT OF THE MENU HOLDER/ SUB MENU WINDOWS
var cameraOrtho 		: Camera;						//ORTHO MAIN CAMERA
var hidePosition 		: Transform;					//THE HIDE POSITION GAME OBJECT
var menuAdjustPosX 		: float;						//FOR ADJUSTING THE MAIN MENU MOVER POSITION.. SO FAR NOT NEEDED

var mainMenuSmoothTime	: float = 0.15;					//TIME FOR MAKING A SMOOTH DAMP FOR SHOWING THE MAIN MENU

//BUTTONS GENERAL VARIABLES

var buttonProfile 		: Transform;
var buttonMissions 		: Transform;
var buttonInstructions 	: Transform;
var buttonCredits 		: Transform;
var buttonExit 			: Transform;

var buttonSound 		: Transform;
var buttonMusic 		: Transform;

//PRIVATE VARIABLES

private var velocity = Vector3.zero;					//NECESARY FOR MAKING A SMOOTH DAMPO FOR SHOWING THE MAIN MENU
private var velocity2 = Vector3.zero;					//NECESARY FOR MAKING A SMOOTH DAMPO FOR SHOWING THE MAIN MENU

private var triggerOpenMainMenu		: boolean = false;			//TRIGGER FOR OPEN THE MAIN MENU
private var triggerOpenMenuHolder	: boolean = false;			//TRIGGER FOR OPEN THE MENU HOLDER

private var triggerProfile			: boolean = false;
private var triggerMissions			: boolean = false;
private var triggerInstructions		: boolean = false;
private var triggerCredits			: boolean = false;
private var triggerExit				: boolean = false;

private var triggerSound			: boolean = false;
private var triggerMusic 			: boolean = false;


//THE OFF/ON POSITIONS FOR THE MAIN MENU
private var mainMenuPosOff	: Vector3;
private var mainMenuPosOn	: Vector3;

//THE OFF/ON POSITIONS FOR THE MENU HOLDER
private var menuHolderPosOff: Vector3;
private var menuHolderPosOn : Vector3;


static var menuStatus		: int;						//THE MENU STATUS 0 FOR CLOSE 1 FOR OPEN AND 2 FOR HIDDEN
static var menuHolder 		: int;  					//THE MENU HOLDER 0 FOR CLOSE 1 FOR OPEN AND 2 FOR HIDDING AND 3 FOR HIDDEN.. 
														//IT SHOULD BE CALLED SUB MENU WINDOW BUT IM LAZY TO CHANGE THE NAME
static var menuHolderStatus : int=0;					//INDICATES WHAT MENU IS OPEN.. 0 IS CLOSE, 1 IS PROFILE, 2 MISSIONS , 3 INSTRUCTIONS
														// , 4 CREDITS AND 5 EXIT

function Start () 
{
	menuStatus = 0;
	menuHolder = 0;
	
	mainMenuPosOff = cameraOrtho.ScreenToWorldPoint (Vector3 (cameraOrtho.pixelWidth, cameraOrtho.pixelHeight, 15)); 
	mainMenuPosOff.x+=menuAdjustPosX;
	
	mainMenuPosOn  = cameraOrtho.ScreenToWorldPoint (Vector3 (cameraOrtho.pixelWidth, cameraOrtho.pixelHeight, 15));
	mainMenuPosOn.x+=-7.5;
	
	menuHolderPosOff = cameraOrtho.ScreenToWorldPoint (Vector3 (cameraOrtho.pixelWidth, cameraOrtho.pixelHeight/2, 17));
	
	menuHolderPosOn	= cameraOrtho.ScreenToWorldPoint (Vector3 (cameraOrtho.pixelWidth, cameraOrtho.pixelHeight/2, 17));
	menuHolderPosOn.x+=-22;
	
	mainMenuMover.transform.position = mainMenuPosOff;
	menuHolderMover.transform.position = menuHolderPosOff;
}

function Update () 
{
//TRANSFORM PART

	//MAIN MENU
	if(menuStatus==0)		//THE MENU IS OFF
	{
		mainMenuMover.transform.position = Vector3.SmoothDamp(mainMenuMover.transform.position, mainMenuPosOff,
                                 velocity, mainMenuSmoothTime);
	}
	else if(menuStatus==1)	//THE MENU IS ON
	{
		mainMenuMover.transform.position = Vector3.SmoothDamp(mainMenuMover.transform.position, mainMenuPosOn,
                                 velocity, mainMenuSmoothTime);
	}
	else if(menuStatus==2)	//THE MENU IS HIDDEN
	{
		mainMenuMover.transform.position = hidePosition.transform.position;
	}
	
	//MENU HOLDER
	if(menuHolder==0)		//THE MENU HOLDER IS OFF
	{
		menuHolderMover.transform.position = Vector3.SmoothDamp(menuHolderMover.transform.position, menuHolderPosOff,
                                 velocity2, mainMenuSmoothTime);
	}
	else if(menuHolder==1)	//THE MENU HOLDER IS ON
	{
		menuHolderMover.transform.position = Vector3.SmoothDamp(menuHolderMover.transform.position, menuHolderPosOn,
                                 velocity2, mainMenuSmoothTime);
	}
	else if(menuHolder==2)
	{
		menuHolderMover.transform.position = hidePosition.transform.position;
	}

//INPUT PART
	if(Input.GetMouseButtonDown(0)) //pc pc pc pc pc																//this code is for pc
	//if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
	{
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
		
		//------------------ THE MAIN MENU
		if(Physics.Raycast(ray, hit, 200) && hit.transform.name == "ButtonOpenMenu")							
		{
			triggerOpenMainMenu=true;
		}
		else
		{
			triggerOpenMainMenu=false;
		}
		//------------------THE MENU HOLDER
		if(Physics.Raycast(ray, hit, 200) && hit.transform.name == "ButtonHolder2")							
		{
			triggerOpenMenuHolder=true;
		}
		else
		{
			triggerOpenMenuHolder=false;
		}
		//------------------ THE PROFILE BUTTON
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "ButtonProfile")							
		{
			triggerProfile=true;
			buttonProfile.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		}
		else
		{
			triggerProfile=false;
			buttonProfile.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
		
		}
		//------------------ THE MISSION BUTTON
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "ButtonMissions")							
		{
			triggerMissions=true;
			buttonMissions.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		}
		else
		{
			triggerMissions=false;
			buttonMissions.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
		
		}
		//------------------ THE INSTRUCTIONS BUTTON
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "ButtonInstructions")							
		{
			triggerInstructions=true;
			buttonInstructions.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		}
		else
		{
			triggerInstructions=false;
			buttonInstructions.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
		
		}
		//------------------ THE CREDITS BUTTON
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "ButtonCredits")							
		{
			triggerCredits=true;
			buttonCredits.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		}
		else
		{
			triggerCredits=false;
			buttonCredits.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
		
		}
		//------------------ THE EXIT BUTTON
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "ButtonExit")							
		{
			triggerExit=true;
			buttonExit.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		}
		else
		{
			triggerExit=false;
			buttonExit.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
		
		}
		//------------------ THE SOUND BUTTON
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "ButtonSound")							
		{
			triggerSound=true;
			if(Pyon_SceneVariables_Script.soundEnable==true)
			{
				buttonSound.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
			}
			else if(Pyon_SceneVariables_Script.soundEnable==false)
			{
				buttonSound.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.5,0));
			}
			
		}
		else
		{
			triggerSound=false;
			if(Pyon_SceneVariables_Script.soundEnable==true)
			{
				buttonSound.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			}
			else if(Pyon_SceneVariables_Script.soundEnable==false)
			{
				buttonSound.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.5,0.5));
			}
		
		}
		//------------------ THE MUSIC BUTTON
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "ButtonMusic")							
		{
			triggerMusic=true;
			if(Pyon_SceneVariables_Script.soundEnable==true)
			{
				buttonMusic.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
			}
			else if(Pyon_SceneVariables_Script.soundEnable==false)
			{
				buttonMusic.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.5,0));
			}
		}
		else
		{
			triggerMusic=false;
			if(Pyon_SceneVariables_Script.musicEnable==true)
			{
				buttonMusic.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			}
			else if(Pyon_SceneVariables_Script.musicEnable==false)
			{
				buttonMusic.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.5,0.5));
			}
		
		}
		
		//THIS IS FOR TURNING OFF THE MENU HOLDER OR THE MAIN MENU BY PRESSING THE TAPBACKGROUND
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "tapbackground")							
		{
			if(menuStatus!=0 && menuHolder!=0)
			{
				openMenuHolder();
			}
			else if(menuStatus!=0 && menuHolder==0)
			{
				pressOpenMenu();
			}
		}

	}
	//--------------------------------------------------------------------
	if(Input.GetMouseButtonUp(0))
	//if(Input.GetTouch(0).phase == TouchPhase.Ended) 
	{
		//ARROWS BUTTONS
		
		if(triggerOpenMainMenu==true)			//IF THE MAIN MENU IS ON CHECK THEN IF THE MENU HOLDER IS ON
		{	
			if(menuHolder==1)					//IF THE MENU HOLDER IS ON THEN CLOSE IT
			{
				openMenuHolder();
			}
			else								//IF NOT THEN CLOSE THE MAIN MENU
			{
				pressOpenMenu();
			}
			
		}
		if(triggerOpenMenuHolder==true)			//IT MEANS THE PROFILE BUTTON WAS THE LAST TO BE TAPPED
		{
			openMenuHolder();
		}
		
		//MAIN MENU BUTTONS
		if(triggerProfile==true)				//IT MEANS THE PROFILE BUTTON WAS THE LAST TO BE TAPPED
		{
			buttonProfile.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			pressProfile();
		}
		if(triggerMissions==true)				//IT MEANS THE MISSION BUTTON WAS THE LAST TO BE TAPPED
		{
			buttonMissions.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			pressMissions();
		}
		if(triggerInstructions==true)			//IT MEANS THE INSTRUCTIONS BUTTON WAS THE LAST TO BE TAPPED
		{
			buttonInstructions.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			pressInstructions();
		}
		if(triggerCredits==true)				//IT MEANS THE CREDITS BUTTON WAS THE LAST TO BE TAPPED
		{
			buttonCredits.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			pressCredits();
		}
		if(triggerExit==true)					//IT MEANS THE EXIT BUTTON WAS THE LAST TO BE TAPPED
		{
			buttonExit.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
			pressExit();
		}
		if(triggerSound==true)					//IT MEANS THE EXIT BUTTON WAS THE LAST TO BE TAPPED
		{
			pressSound();
			
		}
		if(triggerMusic==true)					//IT MEANS THE EXIT BUTTON WAS THE LAST TO BE TAPPED
		{
			pressMusic();
		}
		
	
	
	}
	
	if(menuStatus==0)										//IF THE MAIN MENU IS OFF THEN...
	{	
		Pyon_PlayerControls.beginFlyEnable=true;			//PYON CAN FLY
	}
	else													//IF NOT THEN...
	{
		Pyon_PlayerControls.beginFlyEnable=false;			//PYON CAN NOT FLY
	}
	
	if(Pyon_HeroPropierties.pyonState!=PyonState.PyonSleep)
	{
		menuStatus=2;				//HIDDEN MODE ON FOR MAIN MENU
		menuHolder=2;				//HIDDEN MODE ON FOR MENU HOLDER
	}
	
}



function pressOpenMenu()
{
	if(menuStatus==0)					//IF THE MENU IS OFF
	{
		playSound(showMenuSound, 0.3);
		menuStatus=1;
	}
	else if(menuStatus==1)			//IF THE MENU IS ON
	{
		playSound(hideMenuSound, 0.3);
		menuStatus=0;				
	}
}

function openMenuHolder()			//FOR THE MENU HOLDER
{
	if(menuHolder==0)
	{
		playSound(showMenuSound, 0.3);
		menuHolder=1;
	}
	else if(menuHolder==1)
	{
		playSound(hideMenuSound, 0.3);
		menuHolderStatus=0;
		menuHolder=0;
	}
}

function pressProfile()
{
	if(menuHolderStatus==0)
	{
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.8));
		openMenuHolder();
		menuHolderStatus=1;
	}
	else if(menuHolderStatus==1)
	{
		openMenuHolder();
	}
	else
	{
		openMenuHolder();
		yield WaitForSeconds(mainMenuSmoothTime);
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.8));
		openMenuHolder();
		menuHolderStatus=1;
	}
	
}
function pressMissions()
{
	if(menuHolderStatus==0)
	{
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.6));
		openMenuHolder();
		menuHolderStatus=2;
	}
	else if(menuHolderStatus==2)
	{
		openMenuHolder();
	}
	else
	{
		openMenuHolder();
		yield WaitForSeconds(mainMenuSmoothTime);
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.6));
		openMenuHolder();
		menuHolderStatus=2;
	}
}
function pressInstructions()
{
	if(menuHolderStatus==0)
	{
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.4));
		openMenuHolder();
		menuHolderStatus=3;
	}
	else if(menuHolderStatus==3)
	{
		openMenuHolder();
	}
	else
	{
		openMenuHolder();
		yield WaitForSeconds(mainMenuSmoothTime);
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.4));
		openMenuHolder();
		menuHolderStatus=3;
	}
}
function pressCredits()
{
	if(menuHolderStatus==0)
	{
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.2));
		openMenuHolder();
		menuHolderStatus=4;
	}
	else if(menuHolderStatus==4)
	{
		openMenuHolder();
	}
	else
	{
		openMenuHolder();
		yield WaitForSeconds(mainMenuSmoothTime);
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.2));
		openMenuHolder();
		menuHolderStatus=4;
	}
}

function pressExit()
{
	if(menuHolderStatus==0)
	{
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		openMenuHolder();
		menuHolderStatus=5;
	}
	else if(menuHolderStatus==5)
	{
		openMenuHolder();
	}
	else
	{
		openMenuHolder();
		yield WaitForSeconds(mainMenuSmoothTime);
		menuHolderTitle.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		openMenuHolder();
		menuHolderStatus=5;
	}
}

function pressSound()
{
	playSound(tapButtonSound, 1);
	if(Pyon_SceneVariables_Script.soundEnable==true)
	{
		Pyon_SceneVariables_Script.soundEnable=false;
		buttonSound.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.5,0.5));
	}
	else if(Pyon_SceneVariables_Script.soundEnable==false)
	{
		Pyon_SceneVariables_Script.soundEnable=true;
		buttonSound.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
	}
}

function pressMusic()
{
	playSound(tapButtonSound, 0.45);
	if(Pyon_SceneVariables_Script.musicEnable==true)
	{
		Pyon_SceneVariables_Script.musicEnable=false;
		buttonMusic.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.5,0.5));
	}
	else if(Pyon_SceneVariables_Script.musicEnable==false)
	{
		Pyon_SceneVariables_Script.musicEnable=true;
		buttonMusic.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0.5));
	}
}

function playSound (soundName : AudioClip, soundVolume : float)
{
	if(Pyon_SceneVariables_Script.soundEnable==true)
	{
		audio.PlayOneShot(soundName , soundVolume);
	}
}