#pragma strict

//PUBLIC VARIABLES

var heroCenter				: Transform;		//CENTER OF ROTATION OF HERO 
var shotExplosion 			: Transform;		//THE EXPLOSION ANIMATION FOR SHOOTING
var shotOrigin				: Transform;	//THE LOCATION TO INSTANTIATE THE SHOTEXPLOSION

//PRIVATE VARIABLES
private var rotAngle 		: float =0;			//THE ANGLE BETWEEN THE SHOT AND THE HERO
private var zRotationSpeed 	: float = 5;		//THE SPEED THE HERO ROTATES
private var shotTrigger 	: boolean = false;	//TRIGGER FOR INSTANTIATING THE SHOT EXPLOSION

private var deltaY 			: float;
private var deltaX 			: float;




function Start () {

}

function Update () {

	//HERE THE PLAYER TAPS THE SCREEN AND THE HERO ANGLE IS SET SO THE HERO CAN ROTATE TO FOLLOW THE TAP
	if(Input.GetMouseButtonDown(0) && TI_HeroStatus.weaponState != weapons.Railgun) //pc pc pc pc pc																//this code is for pc
	//if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
	{
		
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
	
		//VERTICAL MOVEMENT
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "TapSensor")							
		{
			deltaY 	= Camera.main.ScreenToWorldPoint(Input.mousePosition).y - heroCenter.position.y;
			deltaX 	= Camera.main.ScreenToWorldPoint(Input.mousePosition).x - heroCenter.position.x;
			rotAngle = (180/3.1416)*Mathf.Atan(deltaY/deltaX);
			shotTrigger=true;
			//heroCenter.eulerAngles.z = rotAngle;
		}

	}
	
	//IN THE CASE THE PLAYER IS USING THE RAILGUN
	if(Input.GetMouseButton(0) && TI_HeroStatus.weaponState == weapons.Railgun)
	{
		
		var ray2 : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		//var ray2 : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit2 : RaycastHit;
		
		if(Physics.Raycast(ray2, hit2, 100) && hit2.transform.name == "TapSensor")							
		{
			var deltaY 	= Camera.main.ScreenToWorldPoint(Input.mousePosition).y - heroCenter.position.y;
			var deltaX 	= Camera.main.ScreenToWorldPoint(Input.mousePosition).x - heroCenter.position.x;
			rotAngle = (180/3.1416)*Mathf.Atan(deltaY/deltaX);
			print(rotAngle);
		}
	}
	
	heroCenter.eulerAngles.z = Mathf.SmoothDampAngle(heroCenter.eulerAngles.z,rotAngle, zRotationSpeed, 0.1);
	
	
	/*
	if(shotTrigger==true)
	{
		
		Instantiate(shotExplosion, shotOrigin.position, shotOrigin.rotation);
		shotTrigger=false;
		
	}*/
	
}

