let terra;
let texturaEstrelas;

function preload() {
  terra = loadImage('terra.jpg');
  // Você precisará de uma imagem de estrelas para isso
  texturaEstrelas = loadImage('estrelas.jpg'); 
}

function setup() {
  createCanvas(1920, 1080, WEBGL);
}

function draw() {
  background(0); // Fundo preto para o espaço

  // Adicione estrelas como um fundo usando uma textura em uma esfera grande
  push();
  noStroke(); // Remove o contorno
  texture(texturaEstrelas);
  // Uma esfera bem grande que age como o "céu"
  sphere(2500); 
  pop();

  // Desenha a Terra girando
  push();
  // Uma luz ambiente para que o lado escuro não fique totalmente preto
  ambientLight(50); 
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  // Uma fonte de luz que segue o mouse
  pointLight(255, 255, 255, locX, locY, 100); 
  
  rotateY(millis() / 2000);
  texture(terra);
  sphere(280);
  pop();
}
