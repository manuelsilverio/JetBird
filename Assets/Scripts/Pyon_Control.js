#pragma strict

//GENERAL VARIABLES

//var superManager 				: Transform; 		//THE MANAGER OF THE ENVIRONMENT EN ETC

//SOUNDS ----------------------------------------------
enum sounds {
	flap = 0,
	death = 1,
	checkPointSound = 2,
}


var checkPointSound 	: AudioClip;
var deathSound 		: AudioClip;
//var buttonPressSound 		: AudioClip;

//-----------------------------------------------------------------------------------------------------------------------------------------------

private var VerFlySpeed 		: float = 400;  			//DEFINES HOW FAST PYON CAN FLY UP


private var soundRate 			: float=0.0;					// variable holds current time + delay amount

static var isDead 				: boolean = false;
static var newRecord 			: boolean = false;

private var anim 				: Animator;

private var canShowAdd 		: int;



//VARIABLES FOR CONTROLLING THE ENABLING AND DISABLING OF HABILITIES

static var beginFlyEnable 		: boolean;				//ENABLES TO USE THE FUNCTION BEGIN FLY... IS A ONE TIME FUNCTION IN EVERY GAME PLAY
static var gamePhase 			: int=0;                	//FOR 0 THE GAME HASNT STARTED, FOR 1 IT HAS FOR 2 IS OVER

private var bestScore 			: int;


function Awake () 
{
	newRecord = false;
	isDead=false;
	anim = GetComponent(Animator);
	gamePhase = 0;
	rigidbody2D.isKinematic=true;
	bestScore = PlayerPrefs.GetInt("bestScore", 0);
	canShowAdd = PlayerPrefs.GetInt("canShowAdd", 3);
}

function FixedUpdate () 
{
	
	rigidbody2D.velocity.x=0;
	//INPUT PART
	//if(Input.GetMouseButtonDown(0)) //pc pc pc pc pc																//this code is for pc
	if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
	{
		if(gamePhase ==0 && Time.timeSinceLevelLoad>0.5){
			gamePhase = 1;
			pyon_readytextMover.canHide=true;
			rigidbody2D.WakeUp();
			rigidbody2D.isKinematic=false;
		}
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
		
		//VERTICAL MOVEMENT
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "tapbackground" && isDead!=true)							
		{
			fly();
		}
		/*else if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "Button_Play")							
		{
			playSound2(buttonPressSound, 0.25);
			Invoke("loadMainScene", buttonPressSound.length);
			
			
		}
		else if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "Button_Exit")							
		{
			Application.Quit();
		}*/
		
	}
		
}




function OnCollisionEnter2D(other : Collision2D){
	if(other.transform.tag == "obstacle"){
		if(!isDead){
			//audio.Stop();
			playSound(sounds.death, 1);
		}
		die();
	}
}

function OnTriggerEnter2D(other : Collider2D){
	if(other.transform.tag == "checkPoint"){
		playSound(sounds.checkPointSound, 1);
		Pyon_SceneMan.score++;
		if(Pyon_SceneMan.score>bestScore){
			bestScore=Pyon_SceneMan.score;
			PlayerPrefs.SetInt("bestScore", bestScore);
			newRecord = true;
		}
	}
}
/*
function loadMainScene(){
	Application.LoadLevel("mainScene");
}*/

function playSound (soundName : int, soundVolume : float)
{

	if(soundName==sounds.flap){
		Pyon_SceneMan.playFlap(soundVolume);
	}
	else if(soundName==sounds.death){
		Pyon_SceneMan.playDeath(soundVolume);
	}
	else if(soundName==sounds.checkPointSound){
		Pyon_SceneMan.playCheck(soundVolume);
	}
	

	//if(!audio.isPlaying && Time.time>soundRate)
	//{
		//soundRate = Time.time + soundDelay;
		//audio.clip = soundName;
		//audio.Play();
		//yield WaitForSeconds(audio.clip.length);
	//}

}



//IN NORMAL STATUS
function fly()
{
	if(Time.timeSinceLevelLoad>0.5){
		playSound(sounds.flap, 0.7);
	}
	
	if(rigidbody2D.velocity.y<=0)
	{
		
		//rigidbody.AddForce (Vector3.up * VerFlySpeed, ForceMode.Impulse);
		rigidbody2D.velocity.y = 0;
		//rigidbody2D.AddForce (Vector2.up * VerFlySpeed*0.46);
		rigidbody2D.AddForce (Vector2.up * VerFlySpeed*0.67);
		
		
	}else //if(rigidbody2D.velocity.y>0) 
	{
		//rigidbody2D.velocity.y *= 0.4;
		//rigidbody2D.AddForce (Vector2.up*VerFlySpeed*0.54);
		rigidbody2D.velocity.y = 0;
		rigidbody2D.AddForce (Vector2.up * VerFlySpeed*0.90);
		
	}
	
	
}

function die()
{
	canShowAdd++;
	if(canShowAdd>100){canShowAdd=1;}
	PlayerPrefs.SetInt("canShowAdd", canShowAdd);
	isDead = true;
	anim.SetTrigger("isDead");
	
}
/*
function playSound2(soundName : AudioClip, soundVolume : float){
	//AudioSource.PlayClipAtPoint(soundName, Vector3(0,0,0));
	audio.PlayOneShot(soundName , soundVolume);
}*/
