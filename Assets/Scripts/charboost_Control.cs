using UnityEngine;
using System.Collections;
using Chartboost;

public class charboost_Control : MonoBehaviour {

	private int canShowAdd;
	private bool isDead = false;
	
	void Start () {
		isDead =false;
		CBBinding.init();

		
	}
	
	void Update () {
		
		if (Input.GetKeyUp(KeyCode.Escape)) {
			if (CBBinding.onBackPressed())
				return;
			else
				Application.Quit();
		}
		
	}

	void OnCollisionEnter2D(Collision2D other){
		if(other.transform.tag == "obstacle"){
			if(!isDead){
				isDead=true;
				canShowAdd = PlayerPrefs.GetInt("canShowAdd", 0);

				if(canShowAdd%4==0){
					CBBinding.showInterstitial(null);
				}
			}

		}
	}

}





