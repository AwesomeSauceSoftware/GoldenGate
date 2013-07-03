#pragma strict
var skyboxes : Material[];
function UseBox (num : int) {
  GetComponent(Skybox).material = skyboxes[num];
}