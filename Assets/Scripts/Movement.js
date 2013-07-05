#pragma strict
var maxDistance = Vector3(100,100,100);
var minDistance = Vector3(0,0,0);
function Start () {

}

function Update () {
  var playerloc : Vector3 = gameObject.FindWithTag("Player").transform.position;
  var sideways : float = Input.GetAxis("Horizontal2");
  var forward : float = Input.GetAxis("Vertical2");
  var vertical : float = Input.GetAxis("Jump2");
  var reset : boolean = Input.GetButton("Reset");
  var newpos : Vector3 = transform.position-maxDistance;
  var calc1 : boolean = (newpos.x < playerloc.x+sideways && newpos.y < playerloc.y+vertical && newpos.z < playerloc.z+forward);
  newpos = transform.position+maxDistance;
  var calc2 : boolean = (newpos.x > playerloc.x+sideways && newpos.y > playerloc.y+vertical && newpos.z > playerloc.z+forward);
  if (calc1 && calc2)
    transform.Translate(sideways,vertical,forward);
  else
  {
    reset = true;
  }
  if (reset)
  {
    transform.position = playerloc + Vector3(0, 0.9070835, 0);
    transform.rotation = Quaternion.identity;
  }
}