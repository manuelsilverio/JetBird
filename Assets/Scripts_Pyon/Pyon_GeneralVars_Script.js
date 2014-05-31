#pragma strict


//THIS SCRIPTS CONTROL ALL THE GENERAL VARIABLES THAT ARE CONSTANT IN ALL OF THE GAME

static var maxDistance	 	: int; 				//THE MAXIMUN DISTANCE DONE BY PLAYER
static var revivalTokens 	: int;			//

//THIS IF FOR LOADING THE UPDATED VALUES OF EACH VARIABLE

function Start () 
{
	
	//PlayerPrefs.DeleteAll();
	
	maxDistance=PlayerPrefs.GetInt("maxDistance",0);
	revivalTokens = PlayerPrefs.GetInt("revivalTokens", 0);
	


	
	
	DontDestroyOnLoad(this);				//THIS AVOID THE SCRIPT TO BE DESTROY ON THE LOAD OF A NEW SCENE
}



function Awake ()
{
	

	DontDestroyOnLoad(this);				//THIS AVOID THE SCRIPT TO BE DESTROY ON THE LOAD OF A NEW SCENE
}

//THIS UPDATES THE VALUES OF EACH VARIABLE BEFORE QUIT THE APPLICATION

function OnApplicationQuit () 
{
	save();
}

function save()
{
	PlayerPrefs.SetInt("maxDistance", maxDistance);
	PlayerPrefs.SetInt("revivalTokens", revivalTokens);
}

