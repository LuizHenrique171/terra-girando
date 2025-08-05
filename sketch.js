let earth;
let starTexture;

function preload() {
  earth = loadImage('terra.jpg');
  starTexture = loadImage('stars.jpg'); // You'll need to find a star image
}

function setup() {
  createCanvas(1920, 1080, WEBGL);
}

function draw() {
  background(0); // Black background for space

  // Add stars as a background using a texture on a large sphere
  push();
  noStroke();
  texture(starTexture);
  sphere(2500); // A very large sphere to act as the skybox
  pop();

  // Draw the spinning earth
  push();
  ambientLight(50); // A bit of ambient light so the dark side isn't completely black
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(255, 255, 255, locX, locY, 100); // Light source that follows the mouse
  
  rotateY(millis() / 2000);
  texture(earth);
  sphere(280);
  pop();
}
