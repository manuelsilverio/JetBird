#pragma strict

private var anim : Animator;

function Start () {
	anim = GetComponent(Animator);
}

function Update () {
	if(Pyon_Control.isDead){
		anim.speed=0;
	}
}