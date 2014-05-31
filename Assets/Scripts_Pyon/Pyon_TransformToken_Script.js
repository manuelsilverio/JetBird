#pragma strict


var timeToDie 				: float=0.5;
var hidePosition 			: Transform;
var pyonOriginal 			: Transform;
var horSpeed 				: float;

private var deltaPosX 		: float;

private var dieTimeControl 	: float;
private var canDie			: boolean;

private var tokenEnable 	: boolean=false;
private var canHaveTrail 	: boolean=false;

function Start () 
{
	canDie=false;
}

function Update () 
{
	
	if(Input.GetKeyDown(KeyCode.D))
	{
		show();
	}
	if(Input.GetKeyDown(KeyCode.F))
	{
		hide();
	}
	
	
	var aniPlay : Pyon_aniSprite;
	aniPlay	= GetComponent("Pyon_aniSprite");
	
	if(deltaPosX<-10)
	{
		hide();
	}
	
	if(canDie==true)
	{
		aniPlay.aniSprite(8, 1, 0, 0, 8, 8/timeToDie, dieTimeControl);
	}
	
	if(tokenEnable==true)
	{
		transform.animation.Play();
		transform.position.x=pyonOriginal.transform.position.x+deltaPosX;
		if(canHaveTrail==true)
		{
			transform.GetComponent(TrailRenderer).time = 2.5;
		}
		else
		{
			canHaveTrail=true;											//WHAT THIS VARIALE DOES IS TO AVOID THE TRAIL RENDERER TO START WORKING ON THE FIRST FRAME
		}																//SO THE PLAYER DONT SEE THAT RENDER EFFECT FROM THE HIDE POSITIION
	}
	else
	{
		canHaveTrail=false;
		transform.GetComponent(TrailRenderer).time = 0;
		transform.animation.Stop();
		transform.position = hidePosition.position;
	}
		
}

function LateUpdate()
{
	if(tokenEnable==true)
	{
		transform.position.x=pyonOriginal.transform.position.x+deltaPosX;
		
	}

}



function OnTriggerEnter(other : Collider)
{
	if(other.collider.name=="Pyon")
	{
		autoKill();
	}
	
}

function autoKill()
{
	dieTimeControl=Time.time;
	canDie=true;
	CancelInvoke();
	transform.GetComponent(TrailRenderer).time = 0;
	hide();
	//Invoke("hide", timeToDie);
	//yield WaitForSeconds(timeToDie/2);
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonNormal)
	{
		pyonOriginal.GetComponent(Pyon_PlayerControls).canTeleport=true;
	}
	
}

function hide()
{
	CancelInvoke();
	tokenEnable=false;
	canDie=false;
	
}

function show()
{
	renderer.material.mainTextureOffset = Vector2(0, 0);
	deltaPosX=25;
	tokenEnable=true;
	InvokeRepeating("moveLeft", 0, 0.001);
}

function moveLeft()
{
	deltaPosX-=horSpeed*0.01;
}