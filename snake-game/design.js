const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const TAMANHO_QUADRADO = 20;
const ALTURA_CANVAS = canvas.height;
const LARGURA_CANVAS = canvas.width;
const TAMANHO_INICIAL_COBRA = 3;

let cobra = [];

function desenharCobra() {
  let x = LARGURA_CANVAS / 2;
  let y = ALTURA_CANVAS / 2;

  for (let i = 0; i < TAMANHO_INICIAL_COBRA; i++) {
    cobra.push({ x: x + i * TAMANHO_QUADRADO, y: y });
    ctx.fillStyle = "#000";
    ctx.fillRect(cobra[i].x, cobra[i].y, TAMANHO_QUADRADO, TAMANHO_QUADRADO);
  }
}

let direcao = "direita";

function moverCobra() {
  let novaCabeca = { x: cobra[0].x, y: cobra[0].y };

  if (direcao === "esquerda") novaCabeca.x -= TAMANHO_QUADRADO;
  if (direcao === "cima") novaCabeca.y -= TAMANHO_QUADRADO;
  if (direcao === "direita") novaCabeca.x += TAMANHO_QUADRADO;
  if (direcao === "baixo") novaCabeca.y += TAMANHO_QUADRADO;

  cobra.unshift(novaCabeca);
  cobra.pop();
}

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft" && direcao !== "direita") direcao = "esquerda";
  if (event.code === "ArrowUp" && direcao !== "baixo") direcao = "cima";
  if (event.code === "ArrowRight" && direcao !== "esquerda") direcao = "direita";
  if (event.code === "ArrowDown" && direcao !== "cima") direcao = "baixo";
});

function detectarColisao() {
    if (
      cobra[0].x < 0 ||
      cobra[0].x >= LARGURA_CANVAS ||
      cobra[0].y < 0 ||
      cobra[0].y >= ALTURA_CANVAS
    ) {
      clearInterval(intervaloJogo);
      alert("Game over!");
    }
  }

  let pontuacao = 0;
  let comida = { x: 0, y: 0 };
  
  function atualizarJogo() {
    ctx.clearRect(0, 0, LARGURA_CANVAS, ALTURA_CANVAS);
  
    desenharCobra();
    moverCobra();
    detectarColisao();
    detectarComida();
  
    // atualizar pontuação somente se a cobra comeu a comida
    if (cobra[0].x === comida.x && cobra[0].y === comida.y) {
      pontuacao += 10;
      document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontuacao;
      gerarComida();
    }
  }
  
  function gerarComida() {
    // verificar se a comida já existe, se não, criar uma nova
    if (!comida.x && !comida.y) {
      comida.x = Math.floor(Math.random() * (LARGURA_CANVAS / TAMANHO_QUADRADO)) * TAMANHO_QUADRADO;
      comida.y = Math.floor(Math.random() * (ALTURA_CANVAS / TAMANHO_QUADRADO)) * TAMANHO_QUADRADO;
    }
    ctx.fillStyle = "yellow"; // alterar a cor da comida para amarelo
    ctx.fillRect(comida.x, comida.y, TAMANHO_QUADRADO, TAMANHO_QUADRADO);
  }
  
  // função para detectar se a cobra comeu a comida
  function detectarComida() {
    if (cobra[0].x === comida.x && cobra[0].y === comida.y) {
      gerarComida();
    }
  }
  
  desenharCobra();
  gerarComida();

// iniciar o jogo
let intervaloJogo = setInterval(atualizarJogo, 100);
