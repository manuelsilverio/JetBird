#pragma strict

var gameOverCreator 			: Transform;
var scoreText 					: TextMesh;
var bestText 					: TextMesh;

var newRecordSprite 			: GameObject;	//THE WORD NEW FOR WHEN THE PLAYER BEATS ITS OWN RECORD

private var auxGameOver 		: boolean = true;





function Start () {
	
}

function Update () {

	if(Pyon_Control.isDead==true && auxGameOver==true){
		auxGameOver=false;
		if(Pyon_Control.newRecord == true){
			newRecordSprite.SetActive(true);
		}else{
			newRecordSprite.SetActive(false);
		}
		Invoke("popGameOver", 2);
	}
	scoreText.text = Pyon_SceneMan.score.ToString();
	bestText.text = PlayerPrefs.GetInt("bestScore", 0).ToString();
}


function popGameOver(){
	transform.position = gameOverCreator.position;
}

