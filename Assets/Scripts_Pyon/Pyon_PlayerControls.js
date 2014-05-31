#pragma strict

//GENERAL VARIABLES

var pyonGhost 					: Transform;		//PYON GHOST GAME OBJECT/TRANSFORM
var pyonTransfomationDisplayer 	: Transform;		//THE DISPLAYER OF PYON TRANSFORMATION
var pyonTransformationScreen 	: Transform;		//THE DISPLAYER OF THE TRANSFORMATION SCREEN
var pyonReviveDisplayer 		: Transform;		//THE DISPLAYER OF THE REVIVING SPRITE

var reviveSmoothTime = 2;							//THE SMOOTHTIME VARIABLE FOR THE DISPLACEMENT OF PYON WHEN REVIVING
var revivePos 					: Transform;		//INDICATES THE "Y" COORDANTE WHERE PYON HAS TO ELEVATE WHILE REVIVING

var teleportLimitPosX 			: Transform;		//INDICATES FROM WHERE PYON CANNOT TELEPORT ANYMORE
var resetPosStart				: Transform;		//THE TRANSFORM WHERE PYON GOES BACK TO RESTART
var resetPosEnd					: Transform;		//THE TRANSFORM WHERE PYON ENDS ITS TOUR

var superManager 				: Transform; 		//THE MANAGER OF THE ENVIRONMENT EN ETC

//SOUNDS ----------------------------------------------

var flap 			: AudioClip;
var teleportSound	: AudioClip;
var wakeUp 			: AudioClip;
var trasTeleport 	: AudioClip;
var trasScreenSound	: AudioClip;
var reviveSound		: AudioClip;

//-----------------------------------------------------------------------------------------------------------------------------------------------

private var VerFlySpeed 		: float = 8.0;  			//DEFINES HOW FAST PYON CAN FLY UP
private var HorFlySpeed 		: float = 280;  			//DEFINES HOW FAST PYON CAN FLY UP

private var yVelocity 			: float = 0;
private var soundRate 			: float=0.0;					// variable holds current time + delay amount


//VARIABLES FOR CONTROLLING THE TIME FOR DISPLAYING SPECIFICS SPRITE FRAMES

//FLYING IN NORMAL MODE
static var flapTime 			: float = 0.3;  			//THE TIME THE FLAPPING WILL LAST
static var flapTimeControl		: float;					//WHEN THE FLY FUNCTION ACTIVATES THE FLAP TIME CONTROL WILL SAVE THE Time.time VALUE
															//THEN WHILE Time.time-flapTimeControl be less than flapTime PYON WILL DISPLAY THE
															//PART OF THE SPRITE FOR FLYING
//SHOWING SURPRISED PYON FROM SLEEP PYON
static var surprisedTime 		: float = 1;				//THE TIME THE SURPRISED PYON WILL LAST			
static var surprisedTimeControl : float;					//LIKE THE FLAPTIME CONTROL BUT FOR THE SURPRISED PYON

//TELEPORTING VARIABLES
static var teleportTime 		: float=0.5;
static var teleportTimeControl 	: float;
static var canTeleport 			: boolean=false;


//VARIABLES FOR CONTROLLING THE ENABLING AND DISABLING OF HABILITIES

static var beginFlyEnable 		: boolean;				//ENABLES TO USE THE FUNCTION BEGIN FLY... IS A ONE TIME FUNCTION IN EVERY GAME PLAY



//-------------------------------------------------------------------------------------------------------------------------------------------------
function Start () 
{
	beginFlyEnable=false;
	canTeleport=false;
}

function Update () 
{
	//THIS MAKES PYON GO BACK FROM THE BEGGINING.. THE PLAYER WONT NOTICE IT
	if(transform.position.x>resetPosEnd.position.x && transform.position.x>teleportLimitPosX.position.x)
	{
		transform.position.x=resetPosStart.position.x;
		superManager.GetComponent(Pyon_EnvironmentManager_Script).changeSector();
	}
	
	//print(rigidbody.velocity.x);
	var aniPlay : Pyon_aniSprite;
	aniPlay	= GetComponent("Pyon_aniSprite");
	
	if(Input.GetKeyDown(KeyCode.A))
	{
		if(Pyon_HeroPropierties.pyonState==PyonState.PyonDead)
		{
			revive();
		}else if(Pyon_HeroPropierties.pyonState==PyonState.PyonNormal)
		{
			beginTeleport();
		}
		
	}
	if(Input.GetKeyDown(KeyCode.S))
	{
		stop();
	}
	
	if(canTeleport==true)
	{
		canTeleport=false;
		beginTeleport();
	}
	
	//LITTLE REVIVE MOVE----IS LIKE A SMOOTH ELEVATION FOR A REVIVING EFFECT
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonReviving)
	{
		var newPosition : float = Mathf.SmoothDamp(transform.position.y, revivePos.position.y,
                                 yVelocity, reviveSmoothTime);
   		 transform.position = Vector3(transform.position.x, newPosition, transform.position.z);
	}
	
	
	//SPRITE DISPLAY
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonNormal	&& (Time.time-flapTimeControl)<flapTime)				//FLAPPING IN PYON'S NORMAL STATUS
	{
		aniPlay.aniSprite(16, 6, 0, 2, 15, 12/flapTime, flapTimeControl);
	}
	
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonNormal	&& (Time.time-flapTimeControl)>flapTime)				//IF PYON IS IN NORMAL WITHOUT FLYING
	{
		renderer.material.mainTextureOffset = Vector2(0, 0.5);
	}
	
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonSleep)															//IF PYON IS IN SLEEP STATUS
	{
		aniPlay.aniSprite(16, 6, 0, 0, 16, 10, 0);
	}
	
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonSurprised && (Time.time-surprisedTimeControl)<surprisedTime)	//IF PYON IS SURPRISED IN HIS SLEEP MODE	
	{
		aniPlay.aniSprite(16, 6, 0, 1, 16, 16/surprisedTime, surprisedTimeControl);
	}
	
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonTeleporter	&& (Time.time-teleportTimeControl)>teleportTime)	//TYPICAL FLY FOR PYON TELEPORTER													//IF PYON IS IN TELEPORTER MODE		
	{
		aniPlay.aniSprite(16, 6, 0, 3, 15, 30, 0);
	}
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonTeleporter && (Time.time-teleportTimeControl)<teleportTime)	//TELEPORT SPRITE DISSAPPERING AND REAPPERING												//IF PYON IS IN TELEPORTER MODE		
	{
		aniPlay.aniSprite(16, 6, 0, 4, 15, 15/teleportTime, teleportTimeControl);
	}
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonDead	)													//IF PYON IS IN DEAD MODE		
	{
		renderer.material.mainTextureOffset = Vector2(0, 0);
	}
	
	
	//INPUT PART
	if(Input.GetMouseButtonDown(0)) //pc pc pc pc pc																//this code is for pc
	//if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
	{
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
	
		//VERTICAL MOVEMENT
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "tapbackground" && Pyon_MenuPause_Script.pauseMenuEnable==false)							
		{
			if(Pyon_HeroPropierties.pyonState==PyonState.PyonNormal)												//IF PYON IS IN NORMAL STATUS THEN FLY
			{
				fly();
			}
			else if (Pyon_HeroPropierties.pyonState==PyonState.PyonTeleporter && Pyon_CameraFollow_Script.followMode==0)										//IF PYON IS IN TELEPORTER STATUS THEN TELEPORT
			{
				teleport();
			}
			else if(Pyon_HeroPropierties.pyonState==PyonState.PyonSleep && beginFlyEnable==true)					//IF PYON IS IN SLEEP STATUS THEN WAKEUP/BEGIN FLY
			{
				beginFlyEnable=false;
				beginFly();
			}
			
			
		}
	}
	//THIS IS FOR THE RETRY EVENT... IF TE SCENE STARTS AFTER PRESSING RETRY... THEN START TO FLY
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonSleep && beginFlyEnable==true && Pyon_MenuPause_Script.retryEnable==true)
	{
		Pyon_MenuPause_Script.retryEnable=false;
		beginFlyEnable=false;
		beginFly();
	
	}
	
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonTeleporter || Pyon_HeroPropierties.pyonState==PyonState.PyonNormal)
	{
		if(rigidbody.velocity.x<5.6 && transform.position.x >-50)
		{
			//print("chk");
			//rigidbody.isKinematic=true;
			rigidbody.velocity.x=5.6;
			//rigidbody.isKinematic=false;
		}
	}
	
	
	
	
	
}




function playSound (soundName : AudioClip, soundVolume : float)
{
	if(Pyon_SceneVariables_Script.soundEnable==true)
	{
		audio.PlayOneShot(soundName , soundVolume);
	}
	
	//if(!audio.isPlaying && Time.time>soundRate)
	//{
		//soundRate = Time.time + soundDelay;
		//audio.clip = soundName;
		//audio.Play();
		//yield WaitForSeconds(audio.clip.length);
	//}

}


//THE INITIAL WAKE UP CALL FOR PYON.. FROM SLEEP TO NORMAL
function beginFly()
{
	playSound(wakeUp, 1);
	surprisedTimeControl = Time.time;											//SIMILAR FUNCTION TO FLAP TIME CONTROL BUT WITH THE SURPRISED SPRITE
	
	Pyon_HeroPropierties.pyonState=5;											//SET PYON STATE TO SURPRISED MODE
	Pyon_HeroPropierties.changePyon=true;
	yield WaitForSeconds(1.8);
	Pyon_HeroPropierties.pyonState=2;											//SET PYON STATE TO NORMAL MODE
	Pyon_HeroPropierties.changePyon=true;
	yield WaitForSeconds(0.2);
	rigidbody.AddForce (Vector3.right * HorFlySpeed, ForceMode.Acceleration);
	fly();
}


//IN NORMAL STATUS
function fly()
{
	playSound(flap, 1);
	//if((Time.time-flapTimeControl)>flapTime) flapTimeControl=Time.time;
	flapTimeControl=Time.time;				
	if(rigidbody.velocity.y<=0)
	{
		//rigidbody.AddForce (Vector3.up * VerFlySpeed, ForceMode.Impulse);
		rigidbody.AddForce (Vector3.up * VerFlySpeed, ForceMode.VelocityChange);
	}else if(rigidbody.velocity.y>0)
	{
		//rigidbody.AddForce (Vector3.up*VerFlySpeed*0.7, ForceMode.Impulse);
		rigidbody.AddForce (Vector3.up*VerFlySpeed*0.5, ForceMode.VelocityChange);
	}
}

function die()
{
	Pyon_HeroPropierties.pyonState=0;
	Pyon_HeroPropierties.changePyon=true;
}

//FUNCTIONS FOR TELEPORTER--------------------------------------------------------------------------------------------------------
function beginTeleport()
{
	
	Time.timeScale=0.001;	
	pyonTransfomationDisplayer.GetComponent(Pyon_SpriteDisplayer_OneMat).showSprite();			//MAKE ANOTHER GAME OCJECT TO SHOW A SPRITE FOR PYON BECOMING A TELEPORTER					
	playSound(trasTeleport, 1);
	yield WaitForSeconds(0.0005);
	Pyon_HeroPropierties.pyonState=3;															//SET PYON STATE TO TELEPORTER MODE					
	Pyon_HeroPropierties.changePyon=true;
	//yield WaitForSeconds(0.001);
	pyonTransformationScreen.GetComponent(Pyon_SpriteDisplayer_TwoMat).showSprite();			//SHOW THE SUPER PYON BANNER
	playSound(trasScreenSound, 0.4);
	yield WaitForSeconds(0.003);														
	Time.timeScale=1;
	audio.loop=true;
	audio.clip=flap;
	audio.Play();	
}

function stopTeleport()
{
	audio.Stop();
	audio.loop=false;
	Pyon_HeroPropierties.pyonState=2;
	Pyon_HeroPropierties.changePyon=true;
}

function teleport()
{
	playSound(teleportSound, 1);
	teleportTimeControl=Time.time;
	yield WaitForSeconds(teleportTime/2);							//THE TELETRANSPORTATION IS DIVIDE IN TWO... AFTER THE FIRST HALF PYON' S TRANSFORM IS RELOCATED
	rigidbody.isKinematic=true;
	Pyon_CameraFollow_Script.followMode=1;							//INICATES THE CAMERA NOT TO MOVE WITH PYON AND STAY BACK
	transform.position = pyonGhost.transform.position;
	setRightTeleportAnim();
	rigidbody.isKinematic=false;
	yield WaitForSeconds(teleportTime/2);
	Pyon_CameraFollow_Script.followMode=2;							//INDICATES THE CAMERA TO MAKE A SMOOTH FOLLOW TO PYON
}

function stop()
{
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonTeleporter)
	{
		stopTeleport();
	}
	else if (Pyon_HeroPropierties.pyonState==PyonState.PyonNormal)
	{
		die();
	}
		
}


function setRightTeleportAnim()										//AFTER THE PLAYER TELEPORTS SET THE RIGHT ANIMATION FOR THE PYON GHOST..
{
	
	if(transform.position.y >= 1.65)
	{
		pyonGhost.transform.animation.Stop();
		Pyon_TeleporterGhost.animationToPlay=1;
	}else
	{
		pyonGhost.transform.animation.Stop();
		Pyon_TeleporterGhost.animationToPlay=0;
	}

	
}

function revive()
{
	Pyon_HeroPropierties.pyonState=6;
	Pyon_HeroPropierties.changePyon=true;
	rigidbody.isKinematic=true;
	pyonReviveDisplayer.GetComponent(Pyon_SpriteDisplayer_Loop).showSprite();
	playSound(reviveSound, 1);
	yield WaitForSeconds(3);
	rigidbody.isKinematic=false;
	Pyon_HeroPropierties.pyonState=2;											//SET PYON STATE TO NORMAL MODE
	Pyon_HeroPropierties.changePyon=true;
	yield WaitForSeconds(0.2);
	rigidbody.AddForce (Vector3.right * HorFlySpeed, ForceMode.Acceleration);
	fly();

}