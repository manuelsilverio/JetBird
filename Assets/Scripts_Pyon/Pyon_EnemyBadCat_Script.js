#pragma strict

enum BadCatState
{
	catNormal = 0,
	catScared = 1,
	catHappy  = 2,
	catDead   = 3

}

var changeBadCat : boolean = false;
var badCatState  : int =0;


function Start () 
{

}

function Update () 
{
	if(changeBadCat)
	{
		SetBadCatState();
	}

}


function OnTriggerEnter (other : Collider)
{
	if(other.name=="Pyon")
	{
		changeBadCat=true;							//CAN CHANGE THE BAD CAT STATE
		badCatState=3;								//BAD CAT STATE IS SET TO DEAD
	}
	
}


function SetBadCatState ()
{
	switch(badCatState)
	{
		case BadCatState.catNormal:
		renderer.material.SetTextureOffset("_MainTex",Vector2(0, 0));
		changeBadCat=false;
		break;
		
		case BadCatState.catScared:
		renderer.material.SetTextureOffset("_MainTex",Vector2(0.25, 0));
		changeBadCat=false;
		break;
		
		case BadCatState.catHappy:
		renderer.material.SetTextureOffset("_MainTex",Vector2(0.5, 0));
		changeBadCat=false;
		break;
		
		case BadCatState.catDead:
		renderer.material.SetTextureOffset("_MainTex",Vector2(0.75, 0));
		changeBadCat=false;
		break;
	}
}

