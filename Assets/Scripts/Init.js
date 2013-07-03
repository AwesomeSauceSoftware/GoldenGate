#pragma strict
var mainMenu : boolean;
var showGraphicsDropDown : boolean;
var font : Font;
var logo : Texture2D;
var player : Transform;
var bg : Texture2D;
var loaded : boolean = false;
function Start () {
  mainMenu = true;
  audio.Play();
}
function LaunchServer () {
    var useNat = !Network.HavePublicAddress();
    Network.InitializeServer(32, 4534, useNat);
}
function Update()
{
  GetComponent(AudioListener).enabled = audio.isPlaying;
}
function LoadGame()
{
  if (!loaded)
  {
    GetComponent(Camera).enabled = false;
    mainMenu = false;
    Screen.showCursor = false;
    loaded = true;
    Time.timeScale = 1;
    audio.Stop();
    if (PlayerPrefs.HasKey("x") && PlayerPrefs.HasKey("y") && PlayerPrefs.HasKey("z") && PlayerPrefs.HasKey("money") && PlayerPrefs.HasKey("map"))
    {
        var p : Transform = Instantiate(player, Vector3(PlayerPrefs.GetFloat("x"),PlayerPrefs.GetFloat("y"),PlayerPrefs.GetFloat("z")), Quaternion.identity);
        p.GetComponent(Inventory).money = PlayerPrefs.GetInt("money");
        for (var i : int; PlayerPrefs.HasKey("quest"+i); i++)
        {
          p.GetComponent(QuestSystem).quests[i].state = PlayerPrefs.GetInt("quest"+i);
        }
        for (i = 0; i < PlayerPrefs.GetInt("itemcount"); i++)
        {
          p.GetComponent(Inventory).items.length += 1;
          p.GetComponent(Inventory).items[i] = p.GetComponent(Inventory).MakeItem(PlayerPrefs.GetInt("item"+i));
        }
        Application.LoadLevelAdditive(PlayerPrefs.GetString("map"));
    }
    else
    {
      Instantiate(player, Vector3(1000,10,1000), Quaternion.identity);
      Application.LoadLevelAdditive("00");
    }
  }
}
function OnFailedToConnect()
{
  print("Cannot connect to server");
  LoadGame();
  LaunchServer();
  Network.Connect("127.0.0.1", 4534);
}
function OnServerInitialized()
{
  print("Server Running");
}
function OnGUI () {
  GUI.skin.box.font = font;
  GUI.skin.button.font = font;
  if (mainMenu)
  {
    Screen.showCursor = true;
    GUI.Label(Rect(0,0,Screen.width,Screen.height), bg);
		//Make a background box
		GUI.Box(Rect(Screen.width /2 - 200,Screen.height /2 - 300,400,420), logo);
		//Make Main Menu button
		if(GUI.Button(Rect(Screen.width /2 - 130,Screen.height /2-190,250,50), "New Game")){
      GetComponent(Camera).enabled = false;
      Application.LoadLevelAdditive("00");
      mainMenu = false;
      Screen.showCursor = false;
      loaded = true;
      Time.timeScale = 1;
      audio.Stop();
      Instantiate(player, Vector3(1000,10,1000), Quaternion.identity);
		}
		if(GUI.Button(Rect(Screen.width /2 - 130,Screen.height /2-140,250,50), "Connect to Server")){
      Network.Connect("127.0.0.1", 4534);
		}
		if(GUI.Button(Rect(Screen.width /2 - 130,Screen.height /2-90,250,50), "Start Server")){
        LaunchServer();
		}
		if(GUI.Button(Rect(Screen.width /2 - 130,Screen.height /2-40,250,50), "Load Saved Game")){
        LoadGame();
		}
		
		//Make Change Graphics Quality button
			if(GUI.Button(Rect(Screen.width /2 - 130,Screen.height /2+10 ,250,50), "Change Graphics Quality")){
			
			if(showGraphicsDropDown == false){
				showGraphicsDropDown = true;
			}
			else{
				showGraphicsDropDown = false;
			}
		}
		
		//Create the Graphics settings buttons, these won't show automatically, they will be called when
		//the user clicks on the "Change Graphics Quality" Button, and then dissapear when they click
		//on it again....
		if(showGraphicsDropDown == true){
			if(GUI.Button(Rect(Screen.width /2 + 120,Screen.height /2-90 ,250,50), "Fastest")){
				QualitySettings.currentLevel = QualityLevel.Fastest;
			}
			if(GUI.Button(Rect(Screen.width /2 + 120,Screen.height /2 - 40,250,50), "Fast")){
				QualitySettings.currentLevel = QualityLevel.Fast;
			}
			if(GUI.Button(Rect(Screen.width /2 + 120,Screen.height /2 + 10,250,50), "Simple")){
				QualitySettings.currentLevel = QualityLevel.Simple;
			}
			if(GUI.Button(Rect(Screen.width /2 + 120,Screen.height /2 + 60,250,50), "Good")){
				QualitySettings.currentLevel = QualityLevel.Good;
			}
			if(GUI.Button(Rect(Screen.width /2 + 120,Screen.height /2 + 110,250,50), "Beautiful")){
				QualitySettings.currentLevel = QualityLevel.Beautiful;
			}
			if(GUI.Button(Rect(Screen.width /2 + 120,Screen.height /2 + 160,250,50), "Fantastic")){
				QualitySettings.currentLevel = QualityLevel.Fantastic;
			}
			
			if(Input.GetKeyDown("escape")){
				showGraphicsDropDown = false;
			}
		}
		
		//Make quit game button
		if (GUI.Button (Rect (Screen.width /2 - 130,Screen.height /2 + 60,250,50), "Quit Game")){
			Application.Quit();
		}
  }
}