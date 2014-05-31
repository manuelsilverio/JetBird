#pragma strict

private var anim : Animation;



function Start () {
	anim = GetComponent(Animation);
	Invoke("die", anim.clip.length);
}

function Update () {

}
/*
private function die()
{
	Destroy(gameObject);
}*/