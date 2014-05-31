#pragma strict



function Start () 
{
	//var badCatScript : Pyon_Enemy1_Script;
	//badCatScript = transform.parent.GetComponent(Pyon_Enemy1_Script);

}

function Update () {

}

function OnTriggerEnter (other : Collider)
{
	if(other.name=="Pyon" && transform.name=="PyonDetectorScared")
	{
		transform.parent.GetComponent(Pyon_EnemyBadCat_Script).badCatState=1;
		transform.parent.GetComponent(Pyon_EnemyBadCat_Script).changeBadCat=true;
	}
	
}