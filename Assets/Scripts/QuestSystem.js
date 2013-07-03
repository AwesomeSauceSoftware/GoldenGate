#pragma strict
class Quest
{
  var name : String;
  var rewards : Item[];
  var state : int;
  var finishState : int;
  var displayHint : boolean = false;
  var hint = "Boring Quest Hint";
  function Execute(stage : int)
  {
    if (stage == state+1)
    {
      state++;
      if (state == finishState)
      {
        GameObject.FindWithTag("Player").GetComponent(Inventory).AddItems(rewards);
      }
    }
  }
}
var quests : Quest[];
function Start () {

}

function Update () {

}