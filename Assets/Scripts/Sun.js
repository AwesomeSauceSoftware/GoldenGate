var sunSpeed : float = 1;
var direction : Vector3 = Vector3.up;
function Update()
{
  transform.Rotate(direction*sunSpeed*Time.deltaTime);
}