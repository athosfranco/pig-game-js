//DOM elements constantes
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
const btnNewGame = document.querySelector(".new-game");
const btnHowToPlay = document.querySelector(".btn-how-to-play");
const btnCloseHowToPlay = document.querySelector(".close-help");
const btnConfig = document.querySelector(".config");
const btnCloseConfig = document.querySelector(".close-config");
const dice = document.querySelector(".dice");
const btnLogMessage = document.querySelector(".btn-log");
const player0Container = document.querySelector(".player-container-0");
const player1Container = document.querySelector(".player-container-1");

//Armazenando todos os valores que serão atualizados em variáveis via DOM
let audioOn = true;
let logMessage = true;
let winsGame = false;

//Scores finais e controle do player ativo
const finalScores = [0, 0];
let playerActive = 0;

//DOM Elements variáveis
let player0Name = document.querySelector(".player-0-name");
let player1Name = document.querySelector(".player-1-name");
let message = document.querySelector(".message");
let diceImage = document.querySelector(".dice");
let playerOneScore = document.getElementById("player-score-0").innerHTML;
let playerTwoScore = document.getElementById("player-score-1").innerHTML;
let volume = document.querySelector(".volume");
let currentScore = 0;

//Efeitos sonoros
let diceRollAudio = new Audio("diceRoll4.wav");
let winGameAudio = new Audio("Wins.ogg");
let clickButton = new Audio("Click.ogg");

//Definições Iniciais
player0Name.textContent = `Player 1`;
player1Name.textContent = `Player 2`;

//Funções genéricas
function getRandom(min, max) {
  // Gera um número aleatório
  return Math.trunc(Math.random() * (max - min) + min);
}
function refreshPage() {
  window.location.reload();
}

//Event Listeners

///////////////////////////////////////////////////// BOTÃO ROLL //////////////////////////////////////////////////////
btnRoll.addEventListener("click", function (diceValue) {
  if (winsGame) {
    alert("The game is over! Start a new game!");
  } else {
    if (audioOn) diceRollAudio.play();
    dice.classList.remove("hidden");
    shake(diceImage, 30, true);
    diceValue = getRandom(1, 6);
    console.log(`Dice = ${diceValue}`);
    diceImage.src = `dice-${diceValue}.png`;

    if (diceValue != 1) {
      currentScore += diceValue;
      document.getElementById(
        `player-score-${playerActive}`
      ).textContent = currentScore;
      message.style.backgroundColor = `rgba(0, 0, 0, 0.60)`;
      if (playerActive == 0) {
        message.textContent = `${player0Name.textContent} rolled 🎲${diceValue}. Current score: ${currentScore}.`;
      } else {
        message.textContent = `${player1Name.textContent} rolled 🎲${diceValue}. Current score: ${currentScore}.`;
      }
    } else {
      //A rodada será terminada e o proximo jogador ficará ativo
      if (playerActive == 0) {
        message.textContent = `${player0Name.textContent} rolled 🎲1! It's ${player1Name.textContent}'s turn now.`;
        player0Container.classList.remove("active");
        player1Container.classList.add("active");
      } else {
        message.textContent = `${player1Name.textContent} rolled 🎲1! It's ${player0Name.textContent}'s turn now.`;
        player1Container.classList.remove("active");
        player0Container.classList.add("active");
      }
      currentScore = 0;
      message.style.backgroundColor = `rgba(255, 0, 0, 0.60)`;
      document.getElementById(
        `player-score-${playerActive}`
      ).textContent = currentScore;
      playerActive == 0 ? (playerActive = 1) : (playerActive = 0);
    }
  }
});

///////////////////////////////////////////////////// BOTÃO HOLD ////////////////////////////////////////////////////

btnHold.addEventListener("click", function () {
  if (winsGame) {
    alert("The game is over! Start a new game!");
  } else {
    if (audioOn) clickButton.play();
    finalScores[playerActive] += currentScore; // Add current score to active player score
    //Check if players score >= 100
    document.getElementById(`player-holding-${playerActive}`).textContent =
      finalScores[playerActive];
    if (finalScores[playerActive] >= 100) {
      message.style.backgroundColor = `rgba(0, 255, 0, 0.60)`;
      if (audioOn) winGameAudio.play();
      if (playerActive == 0) {
        player0Container.classList.add("winner");
        player0Container.classList.remove("active");
        message.textContent = `✅ ${player0Name.textContent} Wins the Game holding 🎲${finalScores[playerActive]}!! 🎉🎉`;
      } else {
        player1Container.classList.add("winner");
        player1Container.classList.remove("active");
        message.textContent = `✅ ${player1Name.textContent} Wins the Game holding 🎲${finalScores[playerActive]}!! 🎉🎉`;
      }
      winsGame = true;
    } else {
      if (playerActive == 0) {
        message.textContent = `${player0Name.textContent} decided to hold ${currentScore}! It's ${player1Name.textContent} turn now.`;
        player0Container.classList.remove("active");
        player1Container.classList.add("active");
      } else {
        message.textContent = `${player1Name.textContent} decided to hold ${currentScore}! It's ${player0Name.textContent} turn now.`;
        player1Container.classList.remove("active");
        player0Container.classList.add("active");
      }
      currentScore = 0;
      message.style.backgroundColor = `rgba(0, 0, 255, 0.60)`;
      document.getElementById(
        `player-score-${playerActive}`
      ).textContent = currentScore;
      playerActive == 0 ? (playerActive = 1) : (playerActive = 0);
    }
  }
});

///////////////////////////////////////////////////// BOTÃO CONFIG/CLOSE /////////////////////////////////////////

btnConfig.addEventListener("click", function () {
  document.querySelector(".configuration-container").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
});

volume.addEventListener("click", function () {
  if (audioOn) {
    document.querySelector(
      ".volume"
    ).innerHTML = `<i class="fas fa-volume-mute"></i> Sound Effects OFF`;
    audioOn = false;
  } else {
    document.querySelector(
      ".volume"
    ).innerHTML = `<i class="fas fa-volume-up"></i> Sound Effects ON`;
    audioOn = true;
    clickButton.play();
  }
  console.log(audioOn);
});

btnLogMessage.addEventListener("click", function () {
  if (logMessage) {
    btnLogMessage.innerHTML = `<i class="fas fa-comment-slash"></i> Log Messages OFF`;
    logMessage = false;
  } else {
    btnLogMessage.innerHTML = `<i class="fas fa-comment"></i> Log Messages ON`;
    logMessage = true;
  }
});

btnCloseConfig.addEventListener("click", function () {
  document.querySelector(".configuration-container").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
  let newPlayer0Name = document.querySelector(".player-0-input").value;
  let newPlayer1Name = document.querySelector(".player-1-input").value;

  if (newPlayer0Name.length == 0) {
    player0Name.textContent = "Player 1";
  } else if (newPlayer0Name == "porkolobo") {
    player0Name.textContent = "🐷 Porkolobo 🐺";
  } else if (newPlayer0Name == "rapopato") {
    player0Name.textContent = "🦊 Rapopato 🦆";
  } else {
    player0Name.textContent = newPlayer0Name;
  }

  if (newPlayer1Name.length == 0) {
    player1Name.textContent = "Player 2";
  } else if (newPlayer1Name == "rapopato") {
    player1Name.textContent = "🦊 Rapopato 🦆";
  } else if (newPlayer1Name == "porkolobo") {
    player1Name.textContent = "🐷 Porkolobo 🐺";
  } else {
    player1Name.textContent = newPlayer1Name;
  }

  if (logMessage)
    document.querySelector(".message").classList.remove("display-none");
  else document.querySelector(".message").classList.add("display-none");
});
///////////////////////////////////////////////////// BOTÃO HELP ////////////////////////////////////////////////////
btnHowToPlay.addEventListener("click", function () {
  document.querySelector(".help-container").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
});

btnCloseHowToPlay.addEventListener("click", function () {
  document.querySelector(".help-container").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});

////////////////////////////////////////// BOTÃO NEW GAME ///////////////////////////////////////////////////////////

btnNewGame.addEventListener("click", function () {
  document.querySelector(".new-game-container").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
});

document.querySelector(".btn-no").addEventListener("click", function () {
  document.querySelector(".new-game-container").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Shake effect by: nils (Stack Overflow)

let shakingElements = [];

let shake = function (element, magnitude = 16, angular = false) {
  //First set the initial tilt angle to the right (+1)
  let tiltAngle = 1;

  //A counter to count the number of shakes
  let counter = 1;

  //The total number of shakes (there will be 1 shake per frame)
  let numberOfShakes = 15;

  //Capture the element's position and angle so you can
  //restore them after the shaking has finished
  let startX = 0,
    startY = 0,
    startAngle = 0;

  // Divide the magnitude into 10 units so that you can
  // reduce the amount of shake by 10 percent each frame
  let magnitudeUnit = magnitude / numberOfShakes;

  //The `randomInt` helper function
  let randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //Add the element to the `shakingElements` array if it
  //isn't already there
  if (shakingElements.indexOf(element) === -1) {
    //console.log("added")
    shakingElements.push(element);

    //Add an `updateShake` method to the element.
    //The `updateShake` method will be called each frame
    //in the game loop. The shake effect type can be either
    //up and down (x/y shaking) or angular (rotational shaking).
    if (angular) {
      angularShake();
    } else {
      upAndDownShake();
    }
  }

  //The `upAndDownShake` function
  function upAndDownShake() {
    //Shake the element while the `counter` is less than
    //the `numberOfShakes`
    if (counter < numberOfShakes) {
      //Reset the element's position at the start of each shake
      element.style.transform = "translate(" + startX + "px, " + startY + "px)";

      //Reduce the magnitude
      magnitude -= magnitudeUnit;

      //Randomly change the element's position
      let randomX = randomInt(-magnitude, magnitude);
      let randomY = randomInt(-magnitude, magnitude);

      element.style.transform =
        "translate(" + randomX + "px, " + randomY + "px)";

      //Add 1 to the counter
      counter += 1;

      requestAnimationFrame(upAndDownShake);
    }

    //When the shaking is finished, restore the element to its original
    //position and remove it from the `shakingElements` array
    if (counter >= numberOfShakes) {
      element.style.transform = "translate(" + startX + ", " + startY + ")";
      shakingElements.splice(shakingElements.indexOf(element), 1);
    }
  }

  //The `angularShake` function
  function angularShake() {
    if (counter < numberOfShakes) {
      //Reset the element's rotation
      element.style.transform = "rotate(" + startAngle + "deg)";

      //Reduce the magnitude
      magnitude -= magnitudeUnit;

      //Rotate the element left or right, depending on the direction,
      //by an amount in radians that matches the magnitude
      let angle = Number(magnitude * tiltAngle).toFixed(2);
      element.style.transform = "rotate(" + angle + "deg)";
      counter += 1;

      //Reverse the tilt angle so that the element is tilted
      //in the opposite direction for the next shake
      tiltAngle *= -1;

      requestAnimationFrame(angularShake);
    }

    //When the shaking is finished, reset the element's angle and
    //remove it from the `shakingElements` array
    if (counter >= numberOfShakes) {
      element.style.transform = "rotate(" + startAngle + "deg)";
      shakingElements.splice(shakingElements.indexOf(element), 1);
      //console.log("removed")
    }
  }
};

// JQUERY - MOVING BACKGROUND

$(function () {
  var x = 0;
  setInterval(function () {
    x -= 1;
    $("html").css("background-position", x + "px 0");
  }, 19);
});
