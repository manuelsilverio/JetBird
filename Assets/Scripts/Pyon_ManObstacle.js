#pragma strict

//var Obstacle	: GameObject;
var creatorPoint : Transform;

var ob1 	: Transform;
var ob2 	: Transform;
var ob3 	: Transform;
var ob4 	: Transform;


private var canInvoke 	: boolean=true;
private var randomHeight 	: float=0;
private var offset 			: Vector3 = Vector3(12,0,0);
private var fairPlay 		: boolean = false;

private var poolOrder 		: int;
private var poolAmount 		: int=4;

function Start () {
	canInvoke = true;
	poolOrder=0;
}

function Update () {
	
	if(Pyon_Control.isDead==true){
		CancelInvoke();
	}
	if(Pyon_Control.gamePhase == 1 && canInvoke == true){
		canInvoke=false;
		createObs();
	}
}

function createObs(){
	InvokeRepeating("makeObs", 0.6, 2.2);
}

function makeObs(){
	while(!fairPlay){
		var newHeight = Random.Range(0.1, 0.7);
		if(Mathf.Abs(newHeight-randomHeight)<0.45){
			fairPlay=true;
			randomHeight=newHeight;
		}	
	}
	
	offset= Camera.main.ScreenToWorldPoint( Vector3(0, randomHeight*Screen.height, 0));
	creatorPoint.position.y = offset.y;
	fairPlay = false;
	poolOrder++;
	var poolTurn = poolOrder % poolAmount;
	switch(poolTurn){
	
	case 0:
		ob1.position = creatorPoint.position;
	break;
	case 1:
		ob2.position = creatorPoint.position;
	break;
	case 2:
		ob3.position = creatorPoint.position;
	break;
	case 3:
		ob4.position = creatorPoint.position;
	break;
	
	
	}
	//Instantiate(Obstacle, creatorPoint.position, creatorPoint.rotation); 
}



