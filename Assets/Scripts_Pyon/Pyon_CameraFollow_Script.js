#pragma strict

var pyonBird 	: Transform;

static var offsetPyon : float = 8.5;
static var followMode : float = 0;				//ON 0 MAKE A TYPICAL FOLLOW TO THE HERO... ON 1 MAKE A DELAYED FOLLOW WHILE TELEPORTING... 
												//ON 2 MAKE A SMOOTH FOLLOW TO CATCH THE HERO

private var velocity : float = 0;			//JUST CREATED TO ACOMPLISH WITH THE SMOOTHDAMP FUNCTION


function LateUpdate () 
{
	if(followMode==0)
	{
		transform.position.x=pyonBird.position.x+offsetPyon;
	}
	else if(followMode==1)
	{
		transform.position.x=pyonBird.position.x+8.7-Pyon_TeleporterGhost.deltaPosX;
	}
	else if(followMode==2)
	{
		transform.position.x = Mathf.SmoothDamp(transform.position.x, pyonBird.position.x+offsetPyon+4, velocity, 0.35);
		
		if(transform.position.x>=pyonBird.position.x+offsetPyon)
		{
			followMode=0;
		}
	}

}