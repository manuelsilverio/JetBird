#pragma strict

var sortingLayerName	: String;       // The name of the sorting layer .
var	sortingOrder		: int;      //The sorting order



function Start () {

		
       // Set the sorting layer and order.
       renderer.sortingLayerName = sortingLayerName;
       renderer.sortingOrder=sortingOrder;
  		
  		
}
