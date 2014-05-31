// Animation Sprite Sheet 
// Walker Boys (www.walkerboystudio.com)
// March 18, 2011
// Description: Plays an animated sprite using a sprite sheet
// Instruction: Assign script to a gameObject with a material/texture (sprite sheet) 
// Function arguments: 
// columnSize      - number of frames across (horizontal)
// rowSize         - number of frames down (vertical)
// colFrameStart   - where frame starts (remember 0 is first number in counting)
// rowFrameStart   - where frame starts (remember 0 is first number in counting)
// totalFrames     - number of frames in the animation (count regular)
// framesPerSecond - how fast do you want it to play through (Standard: 12 - 30 fps)

// REARRAGNE BY MANU STUDIOS ON JUN, 2013, WORKING ON PROJECT PYON
// indexReset  	   - this is for making the sprite to start from 0 because before it started at anypoint of the frames


//SUPER SPECIAL NOTE: THE ENTRY VALUES FOR COLFRAMESTART AND ROWFRAMESTART ARE THOUGHT TO BE FROM THE UP TO THE BOTTOM

function aniSprite (columnSize : int, rowSize : int, colFrameStart : int, rowFrameStart : int, totalFrames : int, framesPerSecond : float, indexReset : float)// function for animating sprites
{
	var index : int = (Time.time-indexReset) * framesPerSecond;													// time control fps
	index = index % totalFrames;																	// modulate to total number of frames
	
	var size = Vector2 ( 1.0 / columnSize, 1.0 / rowSize);											// scale for column and row size
	
	var u = index % columnSize;																		// u gets current x coordinate from column size
	var v = index / columnSize;																		// v gets current y coordinate by dividing by column size
	
	var offset = Vector2 ((u + colFrameStart) * size.x,(1.0 - size.y) - (v + rowFrameStart) * size.y); // offset equals column and row
	//var offset = Vector2 ((u + colFrameStart) * size.x, rowFrameStart*size.y);
	//var offset = Vector2 ((u + colFrameStart) * size.x, 1 - (v+rowFrameStart)*size.y);
	
	renderer.material.mainTextureOffset = offset;													// texture offset for diffuse map
	renderer.material.mainTextureScale  = size;														// texture scale  for diffuse map
	
	//renderer.material.SetTextureOffset ("_BumpMap", offset);										// texture offset for bump (normal map)
	//renderer.material.SetTextureScale  ("_BumpMap", size);											// texture scale  for bump (normal map) 
}
