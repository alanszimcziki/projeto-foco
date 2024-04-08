const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const comecarOuPausarBt = document.querySelector("#start-pause span");
const tempoNaTela = document.querySelector("#timer");
const musica = new Audio("sons/luna-rise-part-one.mp3");
const iniciar = new Audio("sons/play.wav");
const pausar = new Audio("sons/pause.mp3");
const encerrado = new Audio("sons/beep.mp3");
const imagemPlayePause = document.querySelector(".app__card-primary-butto-icon");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});
focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 2400;
  alterarContexto("foco");
  focoBt.classList.add("active");
});
curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});
longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});
function alterarContexto(contexto) {
  mostrarTempo();
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
    Otimize a sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
    Que tal dar uma respirada? <br><strong class="app__title-strong">faça uma pausa curta!.</strong> `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
    Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    encerrado.play();
    alert("Tempo finalizado!");
    const focoAtivo = html.getAttribute("data-contexto") == "foco";
    if (focoAtivo) {
      const evento = new CustomEvent("focoFinalizado");
      document.dispatchEvent(evento);
    }
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};
startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    pausar.play();
    zerar();
    return;
  }
  iniciar.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  comecarOuPausarBt.textContent = "Pausar";
  imagemPlayePause.setAttribute("src", "./imagens/pause.png");
}
function zerar() {
  clearInterval(intervaloId);
  comecarOuPausarBt.textContent = "Começar";
  imagemPlayePause.setAttribute("src", "./imagens/play_arrow.png");
  intervaloId = null;
}
function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}
