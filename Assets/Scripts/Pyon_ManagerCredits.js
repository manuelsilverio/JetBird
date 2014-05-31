#pragma strict

function Start () {

}

function Update () {

if(Input.GetMouseButtonDown(0)) //pc pc pc pc pc																//this code is for pc
	//if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
	{
		
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);											//pc pc pc pc pc		//the ray position of the clic
		//var ray : Ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
		var hit : RaycastHit;
		

		if(Physics.Raycast(ray, hit, 100) && hit.transform.name == "Button_mainMenu")							
		{
			Application.LoadLevel("mainScene");
		}

	}
		

}