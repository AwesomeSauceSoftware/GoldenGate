#pragma strict
    var speed : float = 6.0;
    var jumpSpeed : float = 8.0;
    var gravity : float = 20.0;
    private var moveDirection : Vector3 = Vector3.zero;
    private var jumping : boolean = false;
function Update () {
  
        var controller : CharacterController = GetComponent(CharacterController);
        if (controller.isGrounded) {
            // We are grounded, so recalculate
            // move direction directly from axes
            moveDirection = Vector3(Random.Range(-1,1), 0,
                                    Random.Range(-1,1));
            moveDirection = transform.TransformDirection(moveDirection);
            moveDirection *= speed;
        }
        // Apply gravity
        moveDirection.y -= gravity * Time.deltaTime;
        
        // Move the controller
        controller.Move(moveDirection * Time.deltaTime);
}