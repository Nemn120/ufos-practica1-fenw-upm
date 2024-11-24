var pid,
  score = 0,
  themissile,
  ya_lanzado = false;

let gameTimeSelect, gameTimeInit;
let missileMovingDisabled = false;
let numUfos;
let hitUfosCount = 0;
function UFOlaunch() {
  setInterval(MoveUFO, 25);
}

function createUFOs(ufoCount) {
  const gameArea = document.body;
  const minTop = 100;

  for (let i = 0; i < ufoCount; i++) {
    const newUfo = document.createElement("img");
    newUfo.src = "imgs/ufo.png";
    newUfo.style.position = "absolute";
    newUfo.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
    const minBottom = 150;
    newUfo.style.bottom = `${Math.max(
      minBottom,
      Math.random() * (window.innerHeight - minTop)
    )}px`;
    newUfo.style.width = "60px";
    newUfo.style.height = "60px";
    newUfo.dataset.direction = Math.random() < 0.5 ? "left" : "right";
    newUfo.classList.add("ufo");
    gameArea.appendChild(newUfo);
  }
}

function MoveUFO() {
  const Rlimit = window.innerWidth;
  const ufos = document.querySelectorAll(".ufo");

  ufos.forEach((ufo) => {
    let hpos_ufo = parseInt(ufo.style.left);
    const width_ufo = parseInt(ufo.style.width);
    const margin = 8;
    if (
      (hpos_ufo + width_ufo + margin > Rlimit &&
        ufo.dataset.direction === "right") ||
      (hpos_ufo - margin < 0 && ufo.dataset.direction === "left")
    ) {
      ufo.dataset.direction =
        ufo.dataset.direction === "right" ? "left" : "right";
    }

    const hstep = 5;
    hpos_ufo += ufo.dataset.direction === "right" ? hstep : -hstep;
    ufo.style.left = hpos_ufo + "px";
  });
}

function pullTrigger() {
  pid = setInterval(launch, 10);
}
function checkForHits() {
  const ufos = document.querySelectorAll(".ufo");
  const vpos_m = parseInt(themissile.style.bottom);
  const hpos_m = parseInt(themissile.style.left);
  const width_m = parseInt(themissile.style.width);
  const height_m = parseInt(themissile.style.height);

  const hitUfos = [];

  ufos.forEach((ufo) => {
    const hpos_ufo = parseInt(ufo.style.left);
    const vpos_ufo = parseInt(ufo.style.bottom);
    const width_ufo = parseInt(ufo.style.width);
    const height_ufo = parseInt(ufo.style.height);

    const isHit =
      vpos_m + height_m > vpos_ufo &&
      vpos_m + height_m < vpos_ufo + height_ufo &&
      hpos_m + width_m / 2 > hpos_ufo &&
      hpos_m + width_m / 2 < hpos_ufo + width_ufo;

    if (isHit) {
      hitUfos.push(ufo);
      hitUfosCount++;
    }
  });

  return hitUfos;
}

function launch() {
  const uLimit = window.innerHeight;
  const vstep = 5;
  let vpos_m = parseInt(themissile.style.bottom);

  const hitUfos = checkForHits();

  if (hitUfos.length > 0) {
    clearInterval(pid);
    vpos_m = 0;
    ya_lanzado = false;

    score += hitUfos.length * 100;
    let scoreHTML = document.getElementById("points");
    scoreHTML.innerHTML = score;
    hitUfos.forEach((ufo) => {
      ufo.src = "imgs/explosion.gif";
      setTimeout(() => ufo.remove(), 1700);
    });
  }
  if (vpos_m > uLimit) {
    clearInterval(pid);
    vpos_m = 0;
    ya_lanzado = false;
    if (hitUfos.length == 0) {
      score = score - 25;
      document.getElementById("points").innerHTML = score;
    }
  } else {
    vpos_m += vstep;
  }

  themissile.style.bottom = vpos_m + "px";
}

function moveMissileRight() {
  var rLimit = window.innerWidth,
    hpos_m = parseInt(themissile.style.left),
    misWidth = parseInt(themissile.style.width),
    hstep = 15,
    margin = 8;
  hpos_m = hpos_m + hstep;
  if (hpos_m + misWidth + margin < rLimit) {
    themissile.style.left = hpos_m + "px";
  }
}

function moveMissileLeft() {
  var rLimit = window.innerWidth,
    hpos_m = parseInt(themissile.style.left),
    misWidth = parseInt(themissile.style.width),
    hstep = 15,
    margin = 8;

  if (hpos_m > 0) {
    hpos_m = hpos_m - hstep;
    themissile.style.left = hpos_m + "px";
  }
}

function toggleMissileMovement(disable) {
  missileMovingDisabled = disable;
}

function keyboardController(theEvent) {
  if (missileMovingDisabled) {
    theEvent.preventDefault();
    return;
  }
  let tecla = theEvent.key;
  switch (tecla) {
    case "ArrowRight":
      moveMissileRight();
      break;
    case "ArrowLeft":
      moveMissileLeft();
      break;
    case " ":
      if (!ya_lanzado) {
        ya_lanzado = true;
        pullTrigger();
      }
      break;
  }
}

function showResults() {
  let finalScore = 0;
   if(score != 0){
    finalScore = score / (gameTimeSelect / 60);
  
    if (hitUfosCount> 1) {
      finalScore -= (hitUfosCount - 1) * 50;
    }
   } 
  
  document.getElementById(
    "finalScore"
  ).innerText = `Puntuación Final: ${finalScore}`;
  document.getElementById(
    "scoreMessage"
  ).innerText = `Número de Ufos vivos: ${numUfos - hitUfosCount}`;
  const myModal = new bootstrap.Modal(document.getElementById("resultsPanel"));
  toggleMissileMovement(true);
  myModal.show();
}

function startGameTimer() {
  const timerDisplay = document.getElementById("timerDisplay");
  if (timerDisplay) {
    timerDisplay.textContent = gameTimeInit;
  }

  timerInterval = setInterval(() => {
    gameTimeInit--;
    if (timerDisplay) {
      timerDisplay.textContent = gameTimeInit;
    }
    if (gameTimeInit <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  showResults();
}

window.onload = function () {
  themissile = document.getElementById("missile");
  numUfos = parseInt(localStorage.getItem("numberUfos")) | 1;
  gameTimeSelect = parseInt(localStorage.getItem("timeGame")) | 60;
  gameTimeInit = gameTimeSelect;  
  createUFOs(numUfos);
  document.onkeydown = keyboardController;
  startGameTimer();

  UFOlaunch();
};

document.querySelector(".btn-secondary").addEventListener("click", function () {
  window.location.href = "index.html";
});
