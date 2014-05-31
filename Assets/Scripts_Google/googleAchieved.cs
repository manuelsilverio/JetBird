using UnityEngine;
using System.Collections;
using GooglePlayGames;
using UnityEngine.SocialPlatforms;

public class googleAchieved : MonoBehaviour {

		
	int bestScore;

	//THESE ARE THE CODES FROM GOOGLE PLAY FOR UPDATING THE ACHIVEMENTS

	string newbie ="CgkInrvFmJ0UEAIQAA";
	string rookie ="CgkInrvFmJ0UEAIQAw";
	string amateur ="CgkInrvFmJ0UEAIQAw";
	string advanced	="CgkInrvFmJ0UEAIQBQ";
	string senior  ="CgkInrvFmJ0UEAIQBg";
	string pro ="CgkInrvFmJ0UEAIQBw";
	string expert  ="CgkInrvFmJ0UEAIQCA";
	string master  ="CgkInrvFmJ0UEAIQCQ";


	//Ach STANDS FOR ACHIVEMENT.. BASICALLY IF 0 THEN IT HASN'T BEEN ACHIEVED.. IF 1 IT HAS
	int newbieAch;
	int rookieAch;
	int amateurAch;
	int advancedAch;
	int seniorAch;
	int proAch;
	int expertAch;
	int masterAch;
	
	void Start () {
		PlayGamesPlatform.Activate();
	}
	
	public void submitAchievement(string achieve){
		if(Social.localUser.authenticated){
			Social.ReportProgress(achieve, 100.0f,aux);
		}
	}

	void aux(bool result){
		
	}

	public void checkAchieved(int score){
		bestScore = PlayerPrefs.GetInt("bestScore", 0);
		
		newbieAch = PlayerPrefs.GetInt("newbieAch", 0);
		rookieAch = PlayerPrefs.GetInt("newbieAch", 0);
		amateurAch = PlayerPrefs.GetInt("newbieAch", 0);
		advancedAch = PlayerPrefs.GetInt("newbieAch", 0);
		seniorAch = PlayerPrefs.GetInt("newbieAch", 0);
		proAch = PlayerPrefs.GetInt("newbieAch", 0);
		expertAch = PlayerPrefs.GetInt("newbieAch", 0);
		masterAch = PlayerPrefs.GetInt("newbieAch", 0);
		
		if(score>5 && newbieAch!=1){
			newbieAch=1;
			submitAchievement(newbie);
			PlayerPrefs.SetInt("newbieAch", 1);
		}
		if(score>=15 && rookieAch!=1){
			rookieAch=1;
			submitAchievement(rookie);
			PlayerPrefs.SetInt("rookieAch", rookieAch);
		}
		if(score>=25 && amateurAch!=1){
			amateurAch=1;
			submitAchievement(amateur);
			PlayerPrefs.SetInt("amateurAch", amateurAch);
		}
		if(score>=40 && advancedAch!=1){
			advancedAch=1;
			submitAchievement(advanced);
			PlayerPrefs.SetInt("advancedAch", advancedAch);
		}
		if(score>=60 && seniorAch!=1){
			seniorAch=1;
			submitAchievement(senior);
			PlayerPrefs.SetInt("seniorAch", seniorAch);
		}
		if(score>=80 && proAch!=1){
			proAch=1;
			submitAchievement(pro);
			PlayerPrefs.SetInt("proAch", proAch);
		}
		if(score>=100 && expertAch!=1){
			expertAch=1;
			submitAchievement(expert);
			PlayerPrefs.SetInt("expertAch", expertAch);
		}
		if(score>=150 && masterAch!=1){
			masterAch=1;
			submitAchievement(master);
			PlayerPrefs.SetInt("masterAch", masterAch);
		}
		
	}

}

