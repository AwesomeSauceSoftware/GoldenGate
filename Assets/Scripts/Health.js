var health : float = 100;
var maxhealth : float = 100;
var healrate : float = 0.1;
var isPlayer : boolean = false;
class Drop
{
  var chance : int;
  var item : Item;
}
var rewards : Drop[];
function Die()
{
  if (isPlayer)
    Application.LoadLevel("Init");
  else
  {
    var player : GameObject = gameObject.FindWithTag("Player");
    var givenRewards : Item;
    for (var i : Drop in rewards)
      if (Random.Range(1,i.chance) == 1)
        player.GetComponent(Inventory).items.Add(i.item);
    Destroy(gameObject);
  }
}
function Damage(damage : int)
{
  health -= damage;
}
function Update()
{
  if (health <= 0)
    Die();
  if (health+healrate <= maxhealth)
    health += healrate;
}