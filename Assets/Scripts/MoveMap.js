#pragma strict
var offset : Vector2;
function Update () {
  try
  {
    transform.position = (Vector3(offset.x, 0, offset.y));
  }
  catch (NullReferenceException)
  {
    print("Failed to get map.");
  }
}