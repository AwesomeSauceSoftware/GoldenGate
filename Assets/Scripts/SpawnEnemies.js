var enemies : Transform[];
var counter : float = 0;
var spawnrate : int = 10;
function Update()
{
  counter += Time.deltaTime;
  if (counter > spawnrate)
  {
    var enemy : Transform = enemies[Random.Range(0,len(enemies))];
    var player : Transform = GameObject.FindWithTag("Player");
    enemy = Instantiate(enemy, Vector3(0,10,0), Quaternion.identity).transform;
    enemy.parent = transform;
    enemy.position = Vector3(Random.Range(-100+player.position.x,100+player.position.x), 100, Random.Range(-100+player.position.y,100+player.position.y));
    counter = 0;
  }
}