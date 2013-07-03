class Item
{
  var name : String;
  var id : int;
  var model : Transform;
  var meta1 : float;
  var meta2 : float;
  var meta3 : float;
}
var itemConstants : Item[];
var oldModel : Transform;
var items : Array = new Array();
var money : float = 100;
function MakeItem(id : int)
{
  return itemConstants[id];
}
//Item Constants
/*
1: %0.1
2: %0.5
3: %1
4: %2
5: %5
6: %10
7: %100
8: %200
9: %500
10:%1000
101: Quest Trigger.
*/
function UseItem(index : int)
{
  var item : Item = items[index];
  if (item.id > 10 && item.id < 100 )
  {
    Destroy(oldModel.gameObject);
    var model : Transform = Instantiate(item.model, Vector3(transform.position.x+item.model.position.x,transform.position.y+item.model.position.y,transform.position.z+item.model.position.z), Quaternion(transform.rotation.x+item.model.rotation.x,transform.rotation.y+item.model.rotation.y,transform.rotation.z+item.model.rotation.z, 0));
    for (i in model.GetComponentsInChildren(Renderer))
      i.enabled = true;
    model.transform.parent = transform;
    oldModel = model;
  }
}
function Start()
{
  oldModel = new GameObject().transform;
}
function Update()
{
  var i : int = 0;
  for (var item : Item in items)
  {
    if (item.id <= 10 && item.id > 0)
    {
      items.RemoveAt(i);
      var amount : int;
      if (item.id == 1)
        amount = 0.1;
      if (item.id == 2)
        amount = 0.5;
      if (item.id == 3)
        amount = 1;
      if (item.id == 4)
        amount = 2;
      if (item.id == 5)
        amount = 5;
      if (item.id == 6)
        amount = 10;
      if (item.id == 7)
        amount = 100;
      if (item.id == 8)
        amount = 200;
      if (item.id == 9)
        amount = 500;
      if (item.id == 10)
        amount = 1000;
      money += amount;
    }
    if (item.id == 101)
      GameObject.FindWithTag("Player").GetComponent(QuestSystem).quests[Mathf.Floor(item.meta1)].Execute(Mathf.Floor(item.meta2));
    i++;
    //Random Save bug fix.
    if (transform.position.y < 0)
      transform.position.y = 10;
  }
}
function AddItems(newItems : Item[])
{
  items = items.Concat(newItems);
  print("Items now: "+items.Join(", "));
}