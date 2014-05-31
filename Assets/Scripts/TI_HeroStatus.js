#pragma strict

enum WeaponState
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

//THIS ARE THE ARMS AND GUNS SPRITES FOR THE HERO
//THEY WILL ACTIVE OR DEACTIVATE DEPENDING ON THE STATE OF THE HERO

var gunLook 			: GameObject;
var shotgunLook 		: GameObject;
var rifleLook			: GameObject;
var railgunLook			: GameObject;
var grenadeLauncherLook	: GameObject;
var bazukaLook			: GameObject;


static var weaponState	: int;
static var weaponChange : boolean=false;

function Start () {
	weaponChange=true;
	weaponState=WeaponState.Gun;
	
}

function Update () {

	if(weaponChange){
		setWeaponState(weaponState);
		print(weaponState);
		weaponChange=false;
	}
}

function setWeaponState(weaponState : int)
{
	switch(weaponState)
	{
		case WeaponState.Gun:
			gunLook.SetActive(true);
			shotgunLook.SetActive(false);
			rifleLook.SetActive(false);
			railgunLook.SetActive(false);
			grenadeLauncherLook.SetActive(false);
			bazukaLook.SetActive(false);
		break;
		
		case WeaponState.Shotgun:
			gunLook.SetActive(false);
			shotgunLook.SetActive(true);
			rifleLook.SetActive(false);
			railgunLook.SetActive(false);
			grenadeLauncherLook.SetActive(false);
			bazukaLook.SetActive(false);
		break;
		
		case WeaponState.Rifle:
			gunLook.SetActive(false);
			shotgunLook.SetActive(false);
			rifleLook.SetActive(true);
			railgunLook.SetActive(false);
			grenadeLauncherLook.SetActive(false);
			bazukaLook.SetActive(false);
		break;
		
		case WeaponState.Railgun:
			gunLook.SetActive(false);
			shotgunLook.SetActive(false);
			rifleLook.SetActive(false);
			railgunLook.SetActive(true);
			grenadeLauncherLook.SetActive(false);
			bazukaLook.SetActive(false);
		break;
		
		case WeaponState.GrenadeLauncher:
			gunLook.SetActive(false);
			shotgunLook.SetActive(false);
			rifleLook.SetActive(false);
			railgunLook.SetActive(false);
			grenadeLauncherLook.SetActive(true);
			bazukaLook.SetActive(false);
		break;
		
		
		case WeaponState.Bazuka:
			gunLook.SetActive(false);
			shotgunLook.SetActive(false);
			rifleLook.SetActive(false);
			railgunLook.SetActive(false);
			grenadeLauncherLook.SetActive(false);
			bazukaLook.SetActive(true);
		break;
		
		case WeaponState.Mines:
			
		break;
	
		case WeaponState.Grenades:
		
		break;
		
		case WeaponState.BigBang:
		
		break;
	
	}

}