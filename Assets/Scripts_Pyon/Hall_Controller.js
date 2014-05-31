#pragma strict

var hallDown 	:   	GameObject;
var hallUp 		:       GameObject;

private var speed 	:     float;

function Start () 
{
	speed = 0.8;				//while the least the faster it'll go

}

function Update () 
{
	var offset : float = (Time.time%speed)/speed;
	hallDown.renderer.material.SetTextureOffset("_MainTex", Vector2(offset,0));
	hallUp.renderer.material.SetTextureOffset("_MainTex", Vector2(offset,0));

}