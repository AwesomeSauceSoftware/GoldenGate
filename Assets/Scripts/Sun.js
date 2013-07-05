var sunSpeed : float = 1;
var direction : Vector3 = Vector3.up;
function Update()
{
  transform.Rotate(direction*sunSpeed*Time.deltaTime);
  var boxchooser : SkyboxChooser = GameObject.FindWithTag("MainCamera").GetComponent(SkyboxChooser);
  boxchooser.UseBox(Mathf.Floor(GGUtils.NumWithinParameters(transform.rotation.eulerAngles.x)/36));
}