#pragma strict
class ShopItem
{
  var item  : Item;
  var price : int;
}
var inventory : ShopItem[];
var on : boolean = false;
function OnTriggerEnter (c : Collider) {
  if (c.gameObject.tag == "Player")
  {
    on = true;
  }
}

function OnTriggerExit (c : Collider) {
  if (c.gameObject.tag == "Player")
  {
    on = false;
  }
}
function OnGUI()
{
  if (on)
  {
    var pInventory : Array = GameObject.FindWithTag("Player").GetComponent(Inventory).items;
    var money : float = GameObject.FindWithTag("Player").GetComponent(Inventory).money;
    var x : int = 10;
    var y : int = 10;
	  GUI.Label(Rect(x,y,200,20), "Your Items:");
    for (var item : Item in pInventory)
    {
      y += 20;
      if (GUI.Button(Rect(x,y,200,20), item.name ))
      {
        print("Selling Item: "+(y/20));
        GameObject.FindWithTag("Player").GetComponent(Inventory).items.RemoveAt((y/20)-1);
        GameObject.FindWithTag("Player").GetComponent(Inventory).money += 20;
      }
    }
    x += 200;
    y = 10;
	  GUI.Label(Rect(x,y,200,20), "Shop's Items:");
    for (var item : ShopItem in inventory)
    {
      y += 20;
      if (GUI.Button(Rect(x,y,200,20), item.item.name+": %"+item.price ))
      {
        print("Buying Item: "+(y/20));
        if (money > item.price)
        {
          GameObject.FindWithTag("Player").GetComponent(Inventory).AddItems([item.item]);
          GameObject.FindWithTag("Player").GetComponent(Inventory).money -= item.price;
        }
      }
    }
    x += 200;
    y = 10;
	  GUI.Label(Rect(x,y,200,20), "Money: %"+money);
  }
}