#pragma strict
// Smoothly tilts a transform towards a target rotation.
var smooth = 2.0;
var tiltAngle : float;
private var tiltAroundZ : float;

function Update ()
{
	if(!Pyon_Control.isDead){
		if(rigidbody2D.velocity.y>0)
		{
			tiltAroundZ = rigidbody2D.velocity.y * tiltAngle;
		}else
		{
			tiltAroundZ = 0;
		}
	    
	
	}else{
		
		tiltAroundZ = -90;
	}
	
	var target = Quaternion.Euler (0, 0, tiltAroundZ);
	    // Dampen towards the target rotation
	    transform.rotation = Quaternion.Slerp(transform.rotation, target,
	                                   Time.deltaTime * smooth);;	
}