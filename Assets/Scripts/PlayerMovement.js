  /// This script moves the character controller forward 
    /// and sideways based on the arrow keys.
    /// It also jumps when pressing space.
    /// Make sure to attach a character controller to the same game object.
    /// It is recommended that you make only one call to Move or SimpleMove per frame.    
    var speed : float = 6.0;
    var jumpSpeed : float = 8.0;
    var gravity : float = 20.0;
    private var moveDirection : Vector3 = Vector3.zero;
    private var jumping : boolean = false;
    function GetInputAxis (type : int)
    {
      if (type == 1)
        return Input.GetAxis("Vertical");
      if (type == 2)
        return Input.GetAxis("Horizontal");
    }
    function GetInputButton (type : int)
    {
      if (type == 3)
        return Input.GetButton("Jump");
    }
    function Update() {
        var controller : CharacterController = GetComponent(CharacterController);
        if (controller.isGrounded) {
            // We are grounded, so recalculate
            // move direction directly from axes
            moveDirection = Vector3(0, 0,
                                    GetInputAxis(1));
            moveDirection = transform.TransformDirection(moveDirection);
            moveDirection *= speed;
            transform.Rotate(0, GetInputAxis(2), 0);
            if (GetInputButton(3)) {
                moveDirection.y = jumpSpeed;
                animation.Play("jump_pose");
            }
            else if (GetInputAxis(1) != 0)
              animation.CrossFade("run");
            else
              animation.CrossFade("idle");
        }
        // Apply gravity
        moveDirection.y -= gravity * Time.deltaTime;
        
        // Move the controller
        controller.Move(moveDirection * Time.deltaTime);
    }