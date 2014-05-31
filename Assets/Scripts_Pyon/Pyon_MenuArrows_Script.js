#pragma strict


var arrowMainMenu 		: Transform;
var arrowMenuHolder1	: Transform;
var arrowMenuHolder2	: Transform;



function Update () 
{
	
	if(Pyon_MenuMain_Script.menuStatus==0)
	{
		arrowMainMenu.transform.rotation  = Quaternion.Euler (0, 0, 0);
		var aniPlay = arrowMainMenu.GetComponent(Pyon_aniSprite);
		aniPlay.aniSprite(12, 1, 0, 0, 9, 12, 0);
	}
	else if(Pyon_MenuMain_Script.menuStatus==1)
	{
		arrowMainMenu.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.08333,0));
		arrowMainMenu.transform.rotation  = Quaternion.Euler (0, 0, 180);
	}

	if(Pyon_MenuMain_Script.menuHolderStatus==1)
	{
		arrowMenuHolder1.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
		arrowMenuHolder2.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
	}
	else if(Pyon_MenuMain_Script.menuHolderStatus==2)
	{
		arrowMenuHolder1.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.2,0));
		arrowMenuHolder2.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.2,0));
	}
	else if(Pyon_MenuMain_Script.menuHolderStatus==3)
	{
		arrowMenuHolder1.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.4,0));
		arrowMenuHolder2.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.4,0));
	}
	else if(Pyon_MenuMain_Script.menuHolderStatus==4)
	{
		arrowMenuHolder1.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.6,0));
		arrowMenuHolder2.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.6,0));
	}
	else if(Pyon_MenuMain_Script.menuHolderStatus==5)
	{
		arrowMenuHolder1.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.8,0));
		arrowMenuHolder2.transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0.8,0));
	}

}