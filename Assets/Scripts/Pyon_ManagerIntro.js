#pragma strict

var buttonPressSound 	: AudioClip;



function Start () {

	
	
}

function Update () {

	//if(Input.GetMouseButtonDown(0)) //pc pc pc pc pc																//this code is for pc
	if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
	{
		
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
		
		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "Button_Play")							
		{
			playSound(buttonPressSound, 0.25);
			Invoke("loadMainScene", buttonPressSound.length);
			
			
		}
		else if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "Button_Exit")							
		{
			Application.Quit();
		}
		else if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "Button_Rate")							
		{
			playSound(buttonPressSound, 0.25);
			Application.OpenURL("https://play.google.com/store/apps/details?id=com.manustudios.pyon&hl=en_GB");
		}
		
	}
		

}

function loadMainScene(){
	//PlayerPrefs.SetString("currentScene", "mainScene");
	Application.LoadLevel("mainScene");
}

function playSound(soundName : AudioClip, soundVolume : float){
	//AudioSource.PlayClipAtPoint(soundName, Vector3(0,0,0));
	audio.PlayOneShot(soundName , soundVolume);
}





