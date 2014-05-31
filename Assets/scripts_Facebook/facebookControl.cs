using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

public class facebookControl : MonoBehaviour {
	/*
	public AudioClip buttonPress;

	//public Transform buttonLogout;
	private int best;
	//private string inviteMessage;
	//private bool isInit = false;		// FACEBOOK AUXILIAR VARIABLE

	//private bool canInvite =false;

	private string status;



	//private string lastResponse = "";

	// Use this for initialization
	void Start () {

		FB.Init(OnInitComplete, OnHideUnity);

	}
	*/
	/*
	// Update is called once per frame
	void Update () {


		//HERE I SHOW THE INVITE SCREEN
		if(isInit==true && FB.IsLoggedIn==true &&canInvite==true){
			//best = PlayerPrefs.GetInt("bestScore", 0);
			//inviteMessage = "I'm playing Pyon, look for it in googleplay";
			canInvite=false;
			CallAppRequestAsFriendSelector();
		}

		if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
		{
			
			Ray ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
			RaycastHit hit;
			
			if(Physics.Raycast(ray, out hit, 100) && hit.transform.name == "Button_Facebook")							
			{
				audio.PlayOneShot(buttonPress , 1);
				if(FB.IsLoggedIn==false){
					best = PlayerPrefs.GetInt("bestScore", 0);
					FB.Login("email, publish_actions", AuthCallback);
				}

			}
			else if(Physics.Raycast(ray, out hit, 100) && hit.transform.name == "Button_Facebook2")							
			{
				audio.PlayOneShot(buttonPress , 1);
				FB.AppRequest(
					message:"my best score on pyon is: " + best.ToString(),
					title:"Get Pyon for Android in Googleplay"
					);
			}

		}
	}

	
	
	// AUXILIAR FO LOGIN
	void AuthCallback(FBResult result) {
		if(FB.IsLoggedIn) {

		} else {
			//FB.Logout();
		}
	}
	


	//AUXILIAR FOR FB.INIT

	private void OnInitComplete()
	{
		//Debug.Log("FB.Init completed: Is user logged in? " + FB.IsLoggedIn);
		//isInit = true;
	}
	
	private void OnHideUnity(bool isGameShown)
	{
		//Debug.Log("Is game showing? " + isGameShown);
	}

*/

}



