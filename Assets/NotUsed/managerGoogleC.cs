using UnityEngine;
using System.Collections;
using GooglePlayGames;
using UnityEngine.SocialPlatforms;

public class managerGoogleC : MonoBehaviour {

	public void turnOn(){

		PlayGamesPlatform.Activate();
	}



	public void login(){
		if(!Social.localUser.authenticated){	//if it is not logged in
			Social.localUser.Authenticate(aux);
		}
	}

	public void showLeaderBoard(){

		if(Social.localUser.authenticated){
			Social.ShowLeaderboardUI();
		}
	}

	public void showAchievements(){
		if(Social.localUser.authenticated){
			Social.ShowAchievementsUI();
		}
	}

	public void submitAchievement(string achieve){
		if(Social.localUser.authenticated){
			Social.ReportProgress(achieve, 100.0f,aux);
		}
	}

	public void submitLeaderBoard(int score, string leaderboardId){

		Social.ReportScore(score, leaderboardId, aux);

	}


	void aux(bool result){

	}
}
