var sounds : AudioClip[];
var index : int = 0;
var onTrigger : boolean = true;
function Play()
{
  audio.clip = sounds[index];
  audio.Play();
  index++;
  if (index > len(sounds)-1)
    index = 0;
}
function OnTriggerEnter()
{
  if (onTrigger) Play();
}