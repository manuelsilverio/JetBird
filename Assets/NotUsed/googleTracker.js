#pragma strict

private var googleTracker 	: managerGoogle;

private var bestScore 			: int;

private var newbie 		: String="CgkInrvFmJ0UEAIQAA";
private var rookie 		: String="CgkInrvFmJ0UEAIQAw";
private var amateur		: String="CgkInrvFmJ0UEAIQAw";
private var advanced	: String="CgkInrvFmJ0UEAIQBQ";
private var senior 		: String="CgkInrvFmJ0UEAIQBg";
private var pro			: String="CgkInrvFmJ0UEAIQBw";
private var expert 		: String="CgkInrvFmJ0UEAIQCA";
private var master 		: String="CgkInrvFmJ0UEAIQCQ";

private var levelAchieved	: int;

function Start () {
	bestScore = PlayerPrefs.GetInt("bestScore", 0);
	levelAchieved = PlayerPrefs.GetInt("levelAchieved", 0);
}


function checkAchieved(){
	levelAchieved = PlayerPrefs.GetInt("levelAchieved", 0);

	if(Pyon_SceneMan.score>bestScore && Pyon_SceneMan.score>5 && levelAchieved<1){
		levelAchieved++;
		googleTracker.submitAchievement(newbie);
		PlayerPrefs.SetInt("levelAchieved", levelAchieved);
	}
	else if(Pyon_SceneMan.score>bestScore && Pyon_SceneMan.score>=15 && levelAchieved<2){
		levelAchieved++;
		googleTracker.submitAchievement(rookie);
		PlayerPrefs.SetInt("levelAchieved", levelAchieved);
	}
	else if(Pyon_SceneMan.score>bestScore && Pyon_SceneMan.score>=25 && levelAchieved<3){
		levelAchieved++;
		googleTracker.submitAchievement(amateur);
		PlayerPrefs.SetInt("levelAchieved", levelAchieved);
	}
	else if(Pyon_SceneMan.score>bestScore && Pyon_SceneMan.score>=40 && levelAchieved<4){
		levelAchieved++;
		googleTracker.submitAchievement(advanced);
		PlayerPrefs.SetInt("levelAchieved", levelAchieved);
	}
	else if(Pyon_SceneMan.score>bestScore && Pyon_SceneMan.score>=50 && levelAchieved<5){
		levelAchieved++;
		googleTracker.submitAchievement(senior);
		PlayerPrefs.SetInt("levelAchieved", levelAchieved);
	}
	else if(Pyon_SceneMan.score>bestScore && Pyon_SceneMan.score>=80 && levelAchieved<6){
		levelAchieved++;
		googleTracker.submitAchievement(pro);
		PlayerPrefs.SetInt("levelAchieved", levelAchieved);
	}
	else if(Pyon_SceneMan.score>bestScore && Pyon_SceneMan.score>=100 && levelAchieved<7){
		levelAchieved++;
		googleTracker.submitAchievement(expert);
		PlayerPrefs.SetInt("levelAchieved", levelAchieved);
	}
	else if(Pyon_SceneMan.score>bestScore && Pyon_SceneMan.score>=150 && levelAchieved<8){
		levelAchieved++;
		googleTracker.submitAchievement(master);
		PlayerPrefs.SetInt("levelAchieved", levelAchieved);
	}

}










