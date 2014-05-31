using UnityEngine;
using System.Collections;
using GooglePlayGames;
using UnityEngine.SocialPlatforms;



public class googleInitializer : MonoBehaviour {

	public AudioClip buttonPress;

	private string leaderboardId = "CgkInrvFmJ0UEAIQAA";

	void Start(){
		PlayGamesPlatform.Activate();
		if(!Social.localUser.authenticated){	//if it is not logged in
			Social.localUser.Authenticate(aux);
		}

	}

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



	void aux(bool result){
		
	}
}

