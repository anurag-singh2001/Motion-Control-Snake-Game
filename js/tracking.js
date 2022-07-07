let video;
let poseNet;
let poses = [];
let time = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  // console.log(video.width,video.height);
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, console.log('ready'));
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
    //console.log(poses);
  });
  // Hide the video element, and just show the canvas
  video.hide();
}



function draw() {
  translate(video.width, 0);
  // then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);
  //draw video capture feed as image inside p5 canvas
  image(video, 0, 0);
  fill('rgba(0, 255, 0,0.25)');
  square(220, 0, 200)
  square(0, 140, 200)
  square(440, 140, 200)
  square(220, 280, 200)

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      // let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      //console.log(pose);
      if (pose.rightWrist.confidence > 0.2) {
        //console.log(poses)
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;

        fill(255, 0, 0);
        noStroke();
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 30);
        if (pose.rightWrist.x > 220 && pose.rightWrist.x < 420 && pose.rightWrist.y > 0 && pose.rightWrist.y < 200) {
          // console.log('up');
          if (lastInputDirection.y !== 0) { }
          else inputDirection = { x: 0, y: -1 }
          fill('rgba(0, 255, 0,0.5)');
          square(220, 0, 200)
        }
        else if (pose.rightWrist.x > 220 && pose.rightWrist.x < 420 && pose.rightWrist.y < 480 && pose.rightWrist.y > 280) {
          // console.log('down');
          if (lastInputDirection.y !== 0) { }
          else inputDirection = { x: 0, y: 1 }
          fill('rgba(0, 255, 0,0.5)');
          square(220, 280, 200)


        }
        else if (pose.rightWrist.x > 0 && pose.rightWrist.x < 200 && pose.rightWrist.y < 340 && pose.rightWrist.y > 140) {
          // console.log('right');
          if (lastInputDirection.x !== 0) { }
          else inputDirection = { x: 1, y: 0 }
          fill('rgba(0, 255, 0,0.5)');
          square(0, 140, 200)

        }
        else if (pose.rightWrist.x > 440 && pose.rightWrist.x < 640 && pose.rightWrist.y > 140 && pose.rightWrist.y < 340) {
          // console.log('left');
          if (lastInputDirection.x !== 0) { }
          else inputDirection = { x: -1, y: 0 }
          fill('rgba(0, 255, 0,0.5)');
          square(440, 140, 200)


        }
      }
    }
  }
}
