#pragma strict
var enterClip : AudioClip;
var exitClip : AudioClip;
var sound : AudioSource;
function Start()
{
  if (!sound)
    sound = GameObject.FindWithTag("Player").GetComponent(AudioSource);
}
function OnTriggerExit (m : Collider) {
  if (m.gameObject == sound.gameObject)
  {
    sound.clip = exitClip;
    sound.Play();
  }
}

function OnTriggerEnter (m : Collider) {
  if (m.gameObject == sound.gameObject)
  {
    sound.clip = enterClip;
    sound.Play();
  }
}