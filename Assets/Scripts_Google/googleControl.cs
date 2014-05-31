using UnityEngine;
using System.Collections;
using GooglePlayGames;
using UnityEngine.SocialPlatforms;

public class googleControl : MonoBehaviour {

	public AudioClip buttonPress;
	public int score;
	private int best;
	private bool isDead;

	//THESE ARE THE CODES FROM GOOGLE PLAY FOR UPDATING THE ACHIVEMENTS
	string newbie ="CgkInrvFmJ0UEAIQCg";
	string rookie ="CgkInrvFmJ0UEAIQAw";
	string amateur ="CgkInrvFmJ0UEAIQBA";
	string advanced	="CgkInrvFmJ0UEAIQBQ";
	string senior  ="CgkInrvFmJ0UEAIQBg";
	string pro ="CgkInrvFmJ0UEAIQBw";
	string expert  ="CgkInrvFmJ0UEAIQCA";
	string master  ="CgkInrvFmJ0UEAIQCQ";
	string phenomenon = "CgkInrvFmJ0UEAIQCw";
	string superhuman = "CgkInrvFmJ0UEAIQDA";

	//Ach STANDS FOR ACHIVEMENT.. BASICALLY IF 0 THEN IT HASN'T BEEN ACHIEVED.. IF 1 IT HAS
	private int newbieAch;
	private int rookieAch;
	private int amateurAch;
	private int advancedAch;
	private int seniorAch;
	private int proAch;
	private int expertAch;
	private int masterAch;
	private int phenomenonAch;
	private int superhumanAch;



	private string leaderboardId = "CgkInrvFmJ0UEAIQAA";
	// Use this for initialization
	void Start () {
		score=0;
		best = PlayerPrefs.GetInt("bestScore", 0);
		if(Social.localUser.authenticated){
			Social.ReportScore(best, leaderboardId, aux);
		}
		checkAchieved(best);
		isDead=false;
	}
	
	// Update is called once per frame
	void Update () {
	
		if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
		{

			Ray ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
			RaycastHit hit;

			if(Physics.Raycast(ray, out hit, 100) && hit.transform.name == "Button_Achivement")							
			{
				audio.PlayOneShot(buttonPress , 1);
				if(!Social.localUser.authenticated){	//if it is not logged in
					Social.localUser.Authenticate(aux);
				}else if(Social.localUser.authenticated){
					Social.ShowAchievementsUI();
				}
			}
			else if(Physics.Raycast(ray, out hit, 100) && hit.transform.name == "Button_Leaderboard")							
			{
				audio.PlayOneShot(buttonPress , 1);
				if(!Social.localUser.authenticated){	//if it is not logged in
					Social.localUser.Authenticate(aux);
				}
				else if(Social.localUser.authenticated){
					((PlayGamesPlatform) Social.Active).ShowLeaderboardUI(leaderboardId);
				}
			}
		}
	}



	void OnTriggerEnter2D(Collider2D other){
		if(other.transform.tag == "checkPoint"){
			score++;
			if(score>best){
				checkAchieved(score);
			}
			if(score > best && isDead==true){
				if(Social.localUser.authenticated){
					Social.ReportScore(score, leaderboardId, aux);
				}
			}

		}
	}
	void OnCollisionEnter2D(Collision2D other){
		if(other.transform.tag == "obstacle"){
			isDead=true;
			if(score > best){
				if(Social.localUser.authenticated){
					Social.ReportScore(score, leaderboardId, aux);
				}
			}
		}
	}
				                 
	void submitAchievement(string achieve){
		if(Social.localUser.authenticated){
			Social.ReportProgress(achieve, 100.0f,aux);
		}
	}
	
	void aux(bool result){
		
	}
	
	void checkAchieved(int points){

		
		newbieAch = PlayerPrefs.GetInt("newbieAch", 0);
		rookieAch = PlayerPrefs.GetInt("rookieAch", 0);
		amateurAch = PlayerPrefs.GetInt("amateurAch", 0);
		advancedAch = PlayerPrefs.GetInt("advancedAch", 0);
		seniorAch = PlayerPrefs.GetInt("seniorAch", 0);
		proAch = PlayerPrefs.GetInt("proAch", 0);
		expertAch = PlayerPrefs.GetInt("expertAch", 0);
		masterAch = PlayerPrefs.GetInt("masterAch", 0);
		phenomenonAch = PlayerPrefs.GetInt("phenomenonAch", 0);
		superhumanAch = PlayerPrefs.GetInt("superhumanAch", 0);

		if(points>=5 && newbieAch!=1){
			newbieAch=1;
			submitAchievement(newbie);
			PlayerPrefs.SetInt("newbieAch", 1);
		}
		if(points>=15 && rookieAch!=1){
			rookieAch=1;
			submitAchievement(rookie);
			PlayerPrefs.SetInt("rookieAch", rookieAch);
		}
		if(points>=25 && amateurAch!=1){
			amateurAch=1;
			submitAchievement(amateur);
			PlayerPrefs.SetInt("amateurAch", amateurAch);
		}
		if(points>=40 && advancedAch!=1){
			advancedAch=1;
			submitAchievement(advanced);
			PlayerPrefs.SetInt("advancedAch", advancedAch);
		}
		if(points>=60 && seniorAch!=1){
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
		if(score>=250 && phenomenonAch!=1){
			phenomenonAch=1;
			submitAchievement(phenomenon);
			PlayerPrefs.SetInt("phenomenonAch", phenomenonAch);
		}
		if(score>=350 && superhumanAch!=1){
			superhumanAch=1;
			submitAchievement(superhuman);
			PlayerPrefs.SetInt("superhumanAch", superhumanAch);
		}
		
	}

}


