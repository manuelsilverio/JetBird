#pragma strict

private var VerFlySpeed 	: float = 5.0;  				//DEFINES HOW FAST PYON CAN FLY UP
private var HorFlySpeed 	: float = 5.0;  			//DEFINES HOW FAST PYON CAN FLY UP
private var fallSpeed		: float = 2.0;				// speed of falling down
private var gravity			: float = 8.0;					// force applied on character
private var afterHitForce	: float = 0.2;				//force player down if head hit anything


static var velocity 		: Vector3 = Vector3.zero;		// speed of player and direction


function Start () 
{

}

function Update () 
{
	//var aniPlay	= GetComponent("aniSprite");
	var controller : CharacterController = GetComponent(CharacterController);
	
	
	
	if(Input.GetMouseButtonDown(0)) //pc pc pc pc pc									//this code is for pc
	//if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 			//android android android	
	{
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);		//pc pc pc pc pc		//the ray position of the clic
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
	
		//VERTICAL MOVEMENT
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "tapbackground" && Pyon_HeroPropierties.canTeleport==false && Pyon_HeroPropierties.canMove==true)							
		{
			
			velocity.y+=VerFlySpeed;
		}
	}
	
	
	if(controller.isGrounded)															//if player is in the air
	{
		print("down");
		velocity.y=0;													//set velocity to 0, stop going upward													
        velocity.y+=afterHitForce;										//apply force downward so player doesn't stay in the air
		
	}
	
	if(!controller.isGrounded)															//if player is in the air
	{
		
	}
	
	if (controller.collisionFlags == CollisionFlags.Above)
	{
		velocity.y=0;													//set velocity to 0, stop going upward													
        velocity.y-=afterHitForce;										//apply force downward so player doesn't stay in the air
    }
    velocity.x=HorFlySpeed;
	velocity.y -= gravity*Time.deltaTime;								//apply gravity
	print(velocity.y);
	controller.Move(velocity*Time.deltaTime);							//move the controller
}

function moveRight()
{
	Pyon_HeroPropierties.pyonState=2;
	Pyon_HeroPropierties.changePyon=true;
	rigidbody.AddForce (Vector3.right * HorFlySpeed, ForceMode.Acceleration);
}

function stop()
{
	Pyon_HeroPropierties.pyonState=1;
	Pyon_HeroPropierties.changePyon=true;	
}


/*
if(Input.GetKeyDown(KeyCode.A))
	{
		moveRight();
	}
	if(Input.GetKeyDown(KeyCode.S))
	{
		stop();
	}


//print(rigidbody.velocity.y);
			if(rigidbody.velocity.y<=0)
			{
				//rigidbody.AddForce (Vector3.up * VerFlySpeed, ForceMode.Impulse);
				rigidbody.AddForce (Vector3.up * VerFlySpeed, ForceMode.VelocityChange);
			}else if(rigidbody.velocity.y>0)
			{
				//rigidbody.AddForce (Vector3.up*VerFlySpeed*0.7, ForceMode.Impulse);
				rigidbody.AddForce (Vector3.up*VerFlySpeed*0.7, ForceMode.VelocityChange);
			}


*/