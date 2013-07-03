//*******************************************************************************
//*																							*
//*							Written by Grady Featherstone								*
//										© Copyright 2011										*
//*******************************************************************************
var font : Font;
private var pauseEnabled = false;
private var inventory : Array;
private var quests : Quest[];
var enemyHP : float;

function Start(){
	pauseEnabled = false;
	Time.timeScale = 1;
	AudioListener.volume = 1;
	Screen.showCursor = false;
}

function Update(){

	//check if pause button (escape key) is pressed
	if(Input.GetButton("Inventory")){
	
		//check if game is already paused		
		if(pauseEnabled == true){
			//unpause the game
			pauseEnabled = false;
			Time.timeScale = 1;
			AudioListener.volume = 1;
			Screen.showCursor = false;			
		}
		
		//else if game isn't paused, then pause it
		else if(pauseEnabled == false){
			pauseEnabled = true;
			AudioListener.volume = 0;
			Time.timeScale = 0;
			Screen.showCursor = true;
		}
	}
}

private var showGraphicsDropDown = false;

function OnGUI(){

  inventory = GameObject.FindWithTag("Player").GetComponent(Inventory).items;
  quests = GameObject.FindWithTag("Player").GetComponent(QuestSystem).quests;
  var money : float = GameObject.FindWithTag("Player").GetComponent(Inventory).money;
  GUI.skin.box.font = font;
  GUI.skin.button.font = font;
	if(pauseEnabled == true){
    var x : int = 10;
    var y : int = 10;
	  GUI.Label(Rect(x,y,200,20), "Quests:");
    for (var quest : Quest in quests)
    {
      if (quest.state > 0 && quest.state < quest.finishState)
      {
        y += 20;
        if (GUI.Button(Rect(x,y,200,20), quest.name+": "+(quest.state-1)+"/"+(quest.finishState-1) ) && !quest.displayHint)
        {
          if (money > 10)
          {
            quest.displayHint = true;
            GameObject.FindWithTag("Player").GetComponent(Inventory).money -= 10;
          }
        }
        else if (quest.displayHint)
          GUI.Label(Rect(x,y+400,1000,20), quest.name+":"+quest.hint);
      }
    }
    x += 200;
    y = 10;
	  GUI.Label(Rect(x,y,200,20), "Items:");
    for (var item : Item in inventory)
    {
      y += 20;
      if (GUI.Button(Rect(x,y,200,20), item.name ))
      {
        print("Using Item: "+(y/20));
        GameObject.FindWithTag("Player").GetComponent(Inventory).UseItem(y/20-1);
      }
    }
    x += 200;
    y = 10;
	  GUI.Label(Rect(x,y,200,20), "Money: %"+money);
    if (Network.isClient)
      GUI.Label(Rect(Screen.width-210, Screen.height-30, 200,20), "Connected.");
    else if (Network.isServer)
      GUI.Label(Rect(Screen.width-210, Screen.height-30, 200,20), "Hosting.");
    else
      GUI.Label(Rect(Screen.width-210, Screen.height-30, 200,20), "Not Connected.");
	}
  else
  {
    GUI.Label(Rect(10, Screen.height-30, 200,20), "HP:"+GameObject.FindWithTag("Player").GetComponent(Health).health);
    GUI.Label(Rect(Screen.width-210, Screen.height-30, 200,20), "Enemy HP:"+enemyHP);
  }
}