#pragma strict


private var canDie : boolean;
var timeToDie 		: float=0.5;
private var dieTimeControl 	: float;

function Start () 
{
	canDie=false;
}

function Update () 
{
	var aniPlay : Pyon_aniSprite;
	aniPlay	= GetComponent("Pyon_aniSprite");

	if(canDie==true)
	{
		aniPlay.aniSprite(8, 1, 0, 0, 8, 8/timeToDie, dieTimeControl);
	}
}


function OnTriggerEnter(other : Collider)
{
	if(other.collider.tag=="Pyon")
	{
		autoKill();
	}
	
}

function autoKill()
{
	dieTimeControl=Time.time;
	canDie=true;
	Pyon_SceneVariables_Script.foodCollected+=1;
	Destroy(gameObject, timeToDie);
}