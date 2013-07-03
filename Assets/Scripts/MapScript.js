#pragma strict

function Start () {

}

function Update () {
  if (Input.GetButton("Map"))
  {
    camera.enabled = !camera.enabled;
    if (camera.enabled)
      Time.timeScale = 0;
    else
      Time.timeScale = 1;
  }
}