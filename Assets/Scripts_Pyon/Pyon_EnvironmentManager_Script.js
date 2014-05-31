//THIS SCRIPT IS FOR CONTROLLING THE VISUAL ENVIRONMENT ELEMENTS... ORTHO, MIDDLE AND BACK ELEMENTS... 4 AT EACH CATEGORY COMPOSE THE GAME WORLD

#pragma strict

//BACK ELEMENTS

var sector1 	: Texture[] 	= new Texture[12];				//AN ARRAY WITH ALL THE TEXTURES FOR SECTOR 1
var sector3 	: Texture[]		= new Texture[12];				//AN ARRAY WITH ALL THE TEXTURES FOR SECTOR 3
var environment : Transform[] 	= new Transform[12];			//AN ARRAY WITH ALL THE TRANSFORM FOR THE GAME ENVIRONMENT


private var aux : int=0;
private var aux2: int;







function Start () 
{
	//aux2 = Random.Range(1, 4);
	aux2=1;
	changeSector();
	
	
}


//THIS FUNCTION CHANGE THE SECTOR/ENVIRONMENT
function changeSector()
{
	aux2++;
	if(aux2>4) aux2=1;
	switch (aux2)
	{
		case 1:
			setSector1();
		break;
		case 2:
			setSector3();
		break;
		case 3:
			setSector1();
		break;
		case 4:
			setSector3();
		break;
			
	}
}


function setSector1()
{
	aux=0;
	while(aux<12)
	{
		environment[aux].renderer.material.SetTexture("_MainTex", sector1[aux]);
		aux++;
	}
	
}

function setSector3()
{
	aux=0;
	while(aux<12)
	{
		environment[aux].renderer.material.SetTexture("_MainTex", sector3[aux]);
		aux++;
	}
}