#pragma strict

var flap 			: AudioClip;	static var canFlap : boolean = false;
var dieSound		: AudioClip;	static var canDie	: boolean = false;
var checkSound		: AudioClip;	static var canCheck	: boolean = false;

var envBack_Day 	: GameObject;
//var envBack_Noon 	: GameObject;
var envBack_Night 	: GameObject;

var pyonBodyWhite 	: GameObject;
var pyonBodyBlue 	: GameObject;
var pyonBodyRed 	: GameObject;

var buttonPressSound 		: AudioClip;


//ELEMENTS WHICH NEED TO BE POSITIONED
var topLimit 		: Transform;
var scoreText 		: Transform;


private var offset1 			: Vector3 = Vector3(6.5, 0, 10);
private var offset2 			: Vector3 = Vector3(-0.4, -0.5, 3);



static var soundVol : float;
static var score 	: int;

function Awake () {
	
	score = 0;
	topLimit.transform.position = Camera.main.ScreenToWorldPoint( Vector3(0, Screen.height, 0)) + offset1;
	scoreText.transform.position = Camera.main.ScreenToWorldPoint( Vector3(Screen.width/2, Screen.height, 0)) + offset2;
	selectEnv();

}


function FixedUpdate () 
{

	//if(Input.GetMouseButtonDown(0)) //pc pc pc pc pc																//this code is for pc
	if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
	{
		
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
		
		//VERTICAL MOVEMENT
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "Button_Play")							
		{
			playSound(buttonPressSound, 0.25);
			Invoke("loadMainScene", buttonPressSound.length);
			
			
		}
		else if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "Button_Exit")							
		{
			Application.Quit();
		}
		
	}
		
}

function loadMainScene(){
	Application.LoadLevel("mainScene");
}


function playSound(soundName : AudioClip, soundVolume : float){
	//AudioSource.PlayClipAtPoint(soundName, Vector3(0,0,0));
	audio.PlayOneShot(soundName , soundVolume);
}


private function selectEnv(){
	var ranNum = Random.Range(0, 30);
	if(ranNum>=0 && ranNum<15){
		envBack_Day.SetActive(true);
		//envBack_Noon.SetActive(false);
		envBack_Night.SetActive(false);
	}else if(ranNum>=15 && ranNum<=30){
		envBack_Day.SetActive(false);
		//envBack_Noon.SetActive(false);
		envBack_Night.SetActive(true);
	}
	
	ranNum = Random.Range(0, 30);
	if(ranNum>=0 && ranNum<10){
		pyonBodyWhite.SetActive(true);
		pyonBodyBlue.SetActive(false);
		pyonBodyRed.SetActive(false);
	}else if(ranNum>=10 && ranNum<20){
		pyonBodyWhite.SetActive(false);
		pyonBodyBlue.SetActive(true);
		pyonBodyRed.SetActive(false);
	}else if(ranNum>=20 && ranNum<=30){
		pyonBodyWhite.SetActive(false);
		pyonBodyBlue.SetActive(false);
		pyonBodyRed.SetActive(true);
	}
}

static function playFlap (soundVolume : float)
{
	canFlap = true;
	soundVol = soundVolume;
}

static function playDeath (soundVolume : float)
{
	canDie =true;
	soundVol = soundVolume;
}

static function playCheck (soundVolume : float)
{
	canCheck =true;
	soundVol = soundVolume;
}


function Update() {
	if(canFlap){
		//AudioSource.PlayClipAtPoint(flap, Vector3(0,0,0));
		audio.PlayOneShot(flap , soundVol);
		canFlap=false;
	}
	if(canDie){
		audio.PlayOneShot(dieSound, soundVol);
		canDie=false;
	}
	if(canCheck){
		audio.PlayOneShot(checkSound, soundVol);
		canCheck=false;
	}
	
}


