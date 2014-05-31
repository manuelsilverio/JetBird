#pragma strict

//private var anim 	: Animator;
var speed 		: float;

private var canMove : boolean;

function Start () {
	//anim = GetComponent(Animator);
	canMove=false;
}

function Update () {
	if(transform.position.x>-10 && Pyon_Control.isDead==false){
		canMove=true;
	}

	if(canMove==true){
		transform.Translate(Vector3(-1, 0, 0)*Time.deltaTime*speed);
	}
		
	if(transform.position.x <= -12 || Pyon_Control.isDead==true){
		canMove=false;
	}

}