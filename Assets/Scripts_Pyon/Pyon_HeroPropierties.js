#pragma strict

enum PyonState
{
	PyonDead 			= 0,								//PYON IS DEAD
	PyonSleep 			= 1,								//PYON IS SLEEPING
	PyonNormal			= 2,								//PYON IS IN NORMAL STATUS
	PyonTeleporter 		= 3,								//PYON IS IN TELEPORTER STATUS
	PyonPaused	 		= 4,								//NOT USED
	PyonSurprised 		= 5,								//PYON IS SURPRISED AND AWAKING FROM THE SLEEP MODE
	PyonReviving 		= 6									//PYON IS REVIVING FROM THE DEAD MODE
}

static var pyonState 	: float = 1;
static var changePyon	: boolean = true;
static var canMove	 	: boolean = false;
static var canTeleport 	: boolean = false;

function Start () 
{
	pyonState = 1;
	SetPyonState();

}

function Update () 
{
	//print(pyonState);
	if(changePyon)
	{
		SetPyonState();
	}
	
	
}

function FixedUpdate()
{
	//ALLOWS MOVING OR NOT
	if(canMove==false)
	{
		//rigidbody.isKinematic = true;
		rigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationZ 
								| RigidbodyConstraints.FreezePositionY | RigidbodyConstraints.FreezePositionZ;
								
	}
	else if(canMove==true)
	{
		//rigidbody.isKinematic = false;
		rigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationZ 
								| RigidbodyConstraints.FreezePositionZ;
	}
	
	
	//ACTIVATES OR DEACTIVATES FRICTION
	/*if(pyonState == PyonState.PyonDead)
	{
		activateFriction();
	}else
	{
		removeFriction();
	}*/
	
}


function SetPyonState ()
{
	switch(pyonState)
	{
		case PyonState.PyonDead:
		canMove=true;
		changePyon=false;
		activateFriction();
		break;
		
		case PyonState.PyonSleep:
		canMove=false;
		changePyon=false;
		break;
	
		case PyonState.PyonNormal:
		canMove=true;
		changePyon=false;
		removeFriction();
		break;
		
		case PyonState.PyonTeleporter:
		canMove=false;
		changePyon=false;
		break;
		
		
		case PyonState.PyonPaused:
		canMove=false;
		changePyon=false;
		break;
		
		
		case PyonState.PyonSurprised:
		canMove=false;
		changePyon=false;
		break;
		
		case PyonState.PyonReviving:
		canMove=false;
		changePyon=false;
		break;
		
	}


}


function removeFriction()
{
	//BroadcastMessage("setFriction", 0);
	transform.collider.sharedMaterial.dynamicFriction = 0;
	transform.collider.sharedMaterial.staticFriction = 0;
}

function activateFriction()
{
	//BroadcastMessage("setFriction", 0.25);
	transform.collider.sharedMaterial.dynamicFriction = 0.25;
	transform.collider.sharedMaterial.staticFriction = 0.25;
}