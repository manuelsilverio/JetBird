#pragma strict




function setFriction (fricVal : float) 
{
	transform.collider.sharedMaterial.dynamicFriction = fricVal;
	transform.collider.sharedMaterial.staticFriction = fricVal;
	
}
