#pragma strict

//GENERAL VARIABLES

var pyonOriginal : Transform;    						//THIS IS THE PYON-HERO GAME OBJECT / TRANSFORM
var hidePosition : Transform;

//STATIC VARIABLES

static var deltaPosX 		: float=6;
static var animationToPlay 	: int;						//if 0 play downtoup and if 1 play uptodown
		
						
function Start () 
{
	animationToPlay = 0;

}

function Update () 
{

	if(Pyon_HeroPropierties.pyonState==PyonState.PyonTeleporter && animationToPlay ==0)
	{
		
		transform.animation.Play("PyonGhost");
		transform.position.x=pyonOriginal.transform.position.x+deltaPosX;
	
	}
	else if(Pyon_HeroPropierties.pyonState==PyonState.PyonTeleporter && animationToPlay ==1)
	{
		transform.animation.Play("PyonGhost_UpToDown");
		transform.position.x=pyonOriginal.transform.position.x+deltaPosX;
	}
	else
	{
		transform.position = hidePosition.transform.position;
		transform.animation.Stop();
	}

}

function LateUpdate()
{
	if(Pyon_HeroPropierties.pyonState==PyonState.PyonTeleporter)
	{
		transform.position.x=pyonOriginal.transform.position.x+deltaPosX;
	
	}
	

}