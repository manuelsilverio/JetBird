#pragma strict



public class managerGoogle extends MonoBehaviour {


	function login(){
		if(!Social.localUser.authenticated){	//if it is not logged in
			Social.localUser.Authenticate(aux);
		}
	}

	function showLeaderBoard(){

		if(Social.localUser.authenticated){
			Social.ShowLeaderboardUI();
		}
	}

	function showAchievements(){
		if(Social.localUser.authenticated){
			Social.ShowAchievementsUI();
		}
	}

	function submitAchievement(achieve : String){
		if(Social.localUser.authenticated){
			Social.ReportProgress(achieve, 100.0f,aux);
		}
	}

	function submitLeaderBoard(score : int, leaderboardId : String){

		Social.ReportScore(score, leaderboardId, aux);

	}


	 function aux(result : boolean){

	}
}