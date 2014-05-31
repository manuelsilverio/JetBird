#pragma strict

static var canHide 	: boolean = false;
private var anim 	: Animator;

function Start () {
	canHide =false;
	anim = GetComponent(Animator);
}

function Update () {
	if(canHide){
		canHide=false;
		anim.SetTrigger("canHide");
		Destroy(gameObject, 2.5);
	}

}