#pragma strict

private var text 		: TextMesh;

function Start () {
	text = GetComponent(TextMesh);
}

function Update () {
	text.text = Pyon_SceneMan.score.ToString();
}