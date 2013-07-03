#pragma strict
var damage : int = 10;
var defense : int = 1;
var isPlayer : boolean = true;
function OnCollisionEnter(collision : Collision)
{
  var defense : int;
  if (isPlayer)
  {
    if (collision.gameObject.tag == "Enemy")
    {
      transform.parent.GetComponent(InformationScreen).enemyHP = collision.gameObject.GetComponent(Health).health;
      if (collision.gameObject.GetComponentInChildren(Weapon))
        defense = collision.gameObject.GetComponentInChildren(Weapon).defense;
      else
        defense = 0;
      print("Damaging for:"+(damage-defense));
      collision.gameObject.GetComponent(Health).Damage(damage-defense);
    }
  }
  else
  {
    if (collision.gameObject.tag == "Player")
    {
      if (collision.gameObject.GetComponentInChildren(Weapon))
        defense = collision.gameObject.GetComponentInChildren(Weapon).defense;
      else
        defense = 0;
      collision.gameObject.GetComponent(Health).Damage(damage-defense);
    }
  }
}