// Variáveis para as texturas dos planetas e estrelas
let terra;
let texturaEstrelas;
let lua;

// Variáveis para controlar a animação e a câmera
let anguloTerra = 0;
let anguloLua = 0;
let raioOrbitaLua = 500;
let cameraDist = 1200;
let cameraAngleX = 0;
let cameraAngleY = 0;

function preload() {
  // Carrega as imagens para as texturas.
  // Certifique-se de que 'terra.jpg', 'estrelas.jpg' e 'lua.jpg' estão na mesma pasta.
  terra = loadImage('terra.jpg');
  texturaEstrelas = loadImage('estrelas.jpg');
  lua = loadImage('lua.jpg');
}

function setup() {
  // Cria o canvas em modo WEBGL para 3D
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  // Define o fundo preto
  background(0);

  // --- CONTROLES DE CÂMERA ---
  // Rotação da câmera baseada na posição do mouse
  let cameraX = sin(cameraAngleY) * cos(cameraAngleX) * cameraDist;
  let cameraY = sin(cameraAngleX) * cameraDist;
  let cameraZ = cos(cameraAngleY) * cos(cameraAngleX) * cameraDist;
  camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 1, 0);

  // --- ILUMINAÇÃO ---
  // Uma luz ambiente para iluminar todas as partes, mesmo as sombreadas
  ambientLight(50);
  // Uma luz direcional para simular a luz do sol, criando sombras mais realistas
  directionalLight(255, 255, 255, -1, 0, 0);

  // --- FUNDO DE ESTRELAS (SKYBOX) ---
  push();
  noStroke(); // Remove o contorno da esfera
  texture(texturaEstrelas);
  // Esfera gigante que serve como o céu noturno
  sphere(2500);
  pop();

  // --- TERRA ---
  push();
  // Anima a rotação da Terra
  anguloTerra += 0.002;
  rotateY(anguloTerra);
  // Aplica a textura da Terra
  texture(terra);
  // Desenha a esfera da Terra com alta resolução
  sphere(280, 50, 50);
  pop();

  // --- LUA ---
  push();
  // Anima a órbita da Lua em torno da Terra
  anguloLua += 0.005;
  let xLua = raioOrbitaLua * cos(anguloLua);
  let zLua = raioOrbitaLua * sin(anguloLua);
  translate(xLua, 0, zLua); // Move a lua para a sua posição na órbita
  
  // Rotação da lua em torno do próprio eixo
  rotateY(millis() / 2000);
  // Aplica a textura da Lua
  texture(lua);
  // Desenha a esfera da Lua
  sphere(80);
  pop();
}

function mouseDragged() {
  // Permite que o usuário gire a câmera com o mouse
  cameraAngleY += (mouseX - pmouseX) * 0.005;
  cameraAngleX -= (mouseY - pmouseY) * 0.005;
  
  // Limita a rotação vertical da câmera para evitar que ela vire de cabeça para baixo
  cameraAngleX = constrain(cameraAngleX, -PI/2.1, PI/2.1);
}

function mouseWheel(event) {
  // Permite que o usuário dê zoom com a roda do mouse
  cameraDist += event.delta;
  // Limita o zoom
  cameraDist = constrain(cameraDist, 500, 2500);
  // Impede que a página role
  return false;
}

function windowResized() {
  // Garante que o canvas se ajuste ao tamanho da janela
  resizeCanvas(windowWidth, windowHeight);
}
