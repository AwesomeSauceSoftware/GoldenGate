var quest : int;
var questStage : int;
function OnTriggerEnter ()
{
  GameObject.FindWithTag("Player").GetComponent(QuestSystem).quests[quest].Execute(questStage);
}