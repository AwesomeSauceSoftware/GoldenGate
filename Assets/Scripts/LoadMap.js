#pragma strict
var mapName : String;
function OnTriggerEnter(collision : Collider)
{
  if (collision.gameObject.tag == "Player" && !(GameObject.Find(mapName)))
  {
    Application.LoadLevelAdditive(mapName);
    Destroy(gameObject);
  }
}