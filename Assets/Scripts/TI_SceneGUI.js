#pragma strict
//PUBLIC VARIABLES
var gun 				: boolean;		//THESE GUYS DECIDE WHICH BUTTON STAYS OR LEAVES
var shotgun				: boolean;	
var	rifle 				: boolean;
var	railgun 			: boolean;
var	grenadeLauncher		: boolean;
var	bazuka 				: boolean;
var	mines 				: boolean;
var	grenades 			: boolean;
var	bigBang 			: boolean;

var gunButton 				: GameObject;	//THESE BOYS ARE THE BUTTONS FOR PICKING THE WEAPON
var shotgunButton			: GameObject;	
var	rifleButton 			: GameObject;
var	railgunButton 			: GameObject;
var	grenadeLauncherButton	: GameObject;
var	bazukaButton 			: GameObject;
//var	minesButton 			: Transform;
//var	grenadesButton 			: Transform;
//var	bigBangButton 			: Transform;


var guiWeapons 		: Transform;		//A TRANSFORM CONTAINING ALL THE WEAPONS

//PRIVATE VARIABLES
private var Offset 			: Vector3 = Vector3(5.15, 0.85, 3);			//X AND Y OFFSET CONTROLLERS FOR PLACING WEAPONS BUTTONS


enum weapons
{
	Gun 			=0,
	Shotgun			=1,
	Rifle 			=2,
	Railgun 		=3,
	GrenadeLauncher	=4,
	Bazuka 			=5,
	Mines 			=6,
	Grenades 		=7,
	BigBang 		=8,

}

private var weaponOnService	: int= weapons.Gun;  //2=shotgun, 3=rifle, 4=railgun, 5=grenadelauncher, 6=bazuka

private var scaleDown 		: float=0.5;  //THIS IS USED TO SCALE DOWN THE BACKGROUN OF THE WEAPON'S BUTTON ON SERVICE
private var scaleUp 		: float=2;  //THIS IS USED TO SCALE UP THE WEAPON SPRITE O THE WEAPON'S BUTTON ON SERVICE


function Start () {
	//THESE BOYS CHECK WHAT WEAPONS ARE ALLOW TO USE AND ALLOW OR AVOY THEM TO APPEAR ON SCREEN
	if(gun){gunButton.SetActive(true) ;} else{gunButton.SetActive(false);}
	if(shotgun){shotgunButton.SetActive(true);} else{shotgunButton.SetActive(false);}
	if(rifle){rifleButton.SetActive(true);} else{rifleButton.SetActive(false);}
	if(railgun){railgunButton.SetActive(true);} else{railgunButton.SetActive(false);}
	if(grenadeLauncher){grenadeLauncherButton.SetActive(true);} else{grenadeLauncherButton.SetActive(false);}
	if(bazuka){bazukaButton.SetActive(true);} else{bazukaButton.SetActive(false);}

	//THIS SET THE WEAPONS IN THE LEFT CORNER OF THE SCREEN
	guiWeapons.position = Camera.main.ScreenToWorldPoint(Vector3(0,0,0)) + Offset;
	
	changeWeapon(weapons.Gun);
	
	//THIS DECLARES THE DEFAULT WEAPON ON SERVICE USUALLY THE GUN
	weaponOnService=0;		//1=shotgun, 2=rifle, 3=railgun, 4=grenadelauncher, 5=bazuka
	
}

function Update () {
	guiWeapons.position = Camera.main.ScreenToWorldPoint(Vector3(0,0,0)) + Offset;
	
	
	//HERE THE PLAYER TAPS THE SCREEN AND THE HERO ANGLE IS SET SO THE HERO CAN ROTATE TO FOLLOW THE TAP
	if(Input.GetMouseButtonDown(0)) //pc pc pc pc pc																//this code is for pc
	//if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
	{
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
	
		//VERTICAL MOVEMENT
		if(Physics.Raycast(ray, hit, 100))							
		{
			
			//THIS PART RIGHT HERE IS IN CHARGE OF CHANGING THE WEAPON ACCORDING TO WHAT THE USER TAPS
			if(hit.transform.tag == "gun" && weaponOnService!=weapons.Gun)
			{ changeWeapon(weapons.Gun);}
			
			else if(hit.transform.tag == "shotgun" && weaponOnService!=weapons.Shotgun)
			{changeWeapon(weapons.Shotgun);}
			
			else if(hit.transform.tag == "rifle" && weaponOnService!=weapons.Rifle)
			{changeWeapon(weapons.Rifle);}
			
			else if(hit.transform.tag == "railgun" && weaponOnService!=weapons.Railgun)
			{changeWeapon(weapons.Railgun);}
			
			else if(hit.transform.tag == "grenadeLauncher" && weaponOnService!=weapons.GrenadeLauncher)
			{changeWeapon(weapons.GrenadeLauncher);}
			
			else if(hit.transform.tag == "bazuka" && weaponOnService!= weapons.Bazuka)
			{changeWeapon(weapons.Bazuka);}
			
		}

	}
	
	
}

private function changeWeapon(weapon : int){

	//PRIORLY RESET EVERY BUTTON SIZE
	resetButtonScale();

	//TELL THE HERO HIS STATUS HAS CHANGE
	TI_HeroStatus.weaponState = weapon;
	TI_HeroStatus.weaponChange = true;

	weaponOnService = weapon;
	
	//ALL OF THESE CONDITIONAL WILL GIVE A NICE EFFECT TO THE SELECTED WEAPON BUTTON
	//GUN
	if(weapon == weapons.Gun)
	{
		
		//HERE I LOOK FOR THE BACKGROUND OF THE GUN BUTTON AND SCALE IT DOWN
		gunButton.transform.GetChild(0).transform.localScale *= scaleDown; 
		
		//HERE I LOO FOR THE GUN SPRITE OF THE GUN BUTTON AND SCALE IT UP
		gunButton.transform.GetChild(1).transform.localScale *= scaleUp;
		
		
	}
	//SHOTGUN
	else if(weapon == weapons.Shotgun)	
	{
		shotgunButton.transform.GetChild(0).transform.localScale *= scaleDown; 
		shotgunButton.transform.GetChild(1).transform.localScale *= scaleUp;
	}
	//RIFLE
	else if(weapon == weapons.Rifle)	
	{
		rifleButton.transform.GetChild(0).transform.localScale *= scaleDown; 
		rifleButton.transform.GetChild(1).transform.localScale *= scaleUp;
	}
	//RAILGUN
	else if(weapon == weapons.Railgun)
	{
		railgunButton.transform.GetChild(0).transform.localScale *= scaleDown; 
		railgunButton.transform.GetChild(1).transform.localScale *= scaleUp;
	}
	//GRENADELAUNCHER
	else if(weapon == weapons.GrenadeLauncher)
	{
		grenadeLauncherButton.transform.GetChild(0).transform.localScale *= scaleDown; 
		grenadeLauncherButton.transform.GetChild(1).transform.localScale *= scaleUp;
	}
	//BAZUKA
	else if(weapon == weapons.Bazuka)
	{
		bazukaButton.transform.GetChild(0).transform.localScale *= scaleDown; 
		bazukaButton.transform.GetChild(1).transform.localScale *= scaleUp;
	}
}

private function resetButtonScale()				// THIS FUNCTION RESET THE SIZE OF ALL THE WEAPONS BUTTONS
{
	var resetVectorBackground : Vector3 = Vector3(1,1,1);		//THESE WERE VALUES ESTABLISHED BY ME
	var resetVectorWeapon : Vector3 = Vector3(1.75,1.75,1);
	
	gunButton.transform.GetChild(0).transform.localScale = resetVectorBackground; 
	gunButton.transform.GetChild(1).transform.localScale = resetVectorWeapon;
	
	shotgunButton.transform.GetChild(0).transform.localScale = resetVectorBackground; 
	shotgunButton.transform.GetChild(1).transform.localScale = resetVectorWeapon;
	
	rifleButton.transform.GetChild(0).transform.localScale = resetVectorBackground; 
	rifleButton.transform.GetChild(1).transform.localScale = resetVectorWeapon;
	
	railgunButton.transform.GetChild(0).transform.localScale = resetVectorBackground; 
	railgunButton.transform.GetChild(1).transform.localScale = resetVectorWeapon;
	
	grenadeLauncherButton.transform.GetChild(0).transform.localScale = resetVectorBackground; 
	grenadeLauncherButton.transform.GetChild(1).transform.localScale = resetVectorWeapon;

	bazukaButton.transform.GetChild(0).transform.localScale = resetVectorBackground; 
	bazukaButton.transform.GetChild(1).transform.localScale = resetVectorWeapon;



}










