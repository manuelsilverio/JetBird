#pragma strict

var hero 	: Transform;

function Start () {
	transform.position.x = hero.position.x + 2.6;
}

function FixedUpdate () {
	if(Pyon_Control.isDead!=true){
		transform.position.x = hero.position.x + 2.6;
	}
	
}