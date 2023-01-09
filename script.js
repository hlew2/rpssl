"use strict";

const title = document.getElementById("banner");
const playerTotal = document.getElementById("player-score");
const hands = document.getElementById("hands");
const result = document.getElementById("result");
const overallResult = document.getElementById("overall-result");
const rpsButtons = document.querySelectorAll(".rpsButton");
const startEndGameBtn = document.getElementById("endGameButton");
const totalScore = { computerScore: 0, playerScore: 0 };
let startTimeout;
let choiceTimeout;
let endTimeout;
let clickTimeout;
let clicks = 0;
let round = 1;
title.innerHTML =
  "Rock | Paper | Scissors | Lizard | Spock <br> Best of 5 Rounds";

const clickBtnFunction = (event) => {
  onClickRPS(event.target.name);
};

const addClickEvent = () => {
  rpsButtons.forEach((button) => {
    button.addEventListener("click", clickBtnFunction);
  });
};

const removeClickEvent = () => {
  rpsButtons.forEach((button) => {
    button.removeEventListener("click", clickBtnFunction);
  });
};

const startGame = () => {
  title.innerText = `Round ${round} of 5`;
  overallResult.innerHTML = `<p class="game-play"><span>${totalScore["playerScore"]} : ${totalScore["computerScore"]}</span></p>`;
  startEndGameBtn.innerText = "🔴";
  clicks++;
  if (clicks === 1) {
    startTimeout = setTimeout(() => {
      playGame();
    }, 2000);
  } else if (clicks === 2) {
    clearTimeout(endTimeout);
    clearTimeout(choiceTimeout);
    clearTimeout(startTimeout);
    clearTimeout(choiceTimeout);
    endGame();
    startEndGameBtn.innerText = "🟢";
    overallResult.innerText = "";
    clicks = 0;
    round = 1;
  }
};

const playGame = () => {
  addClickEvent();
};

const onClickRPS = (playerChoice) => {
  if (round === 1) {
    const computerChoice = getComputerChoice();
    const playerScore = getPlayerResult(playerChoice, computerChoice);
    const computerScore = getComputerResult(playerChoice, computerChoice);
    if (Math.sign(playerScore) === 1) {
      totalScore["playerScore"] += playerScore;
      showResult(playerScore, playerChoice, computerChoice);
    } else if (Math.sign(computerScore) === 1) {
      totalScore["computerScore"] += computerScore;
      showResult(playerScore, playerChoice, computerChoice);
    }
    clickTimeout = setTimeout(() => {
      removeClickEvent();
    }, 100);
    choiceTimeout = setTimeout(() => {
      round++;
      title.innerText = `Round ${round} of 5`;
      playerTotal.innerText = "";
      hands.innerText = "";
      result.innerText = "";
      addClickEvent();
    }, 5000);
  } else if (round < 5) {
    const computerChoice = getComputerChoice();
    const playerScore = getPlayerResult(playerChoice, computerChoice);
    const computerScore = getComputerResult(playerChoice, computerChoice);
    if (Math.sign(playerScore) === 1) {
      totalScore["playerScore"] += playerScore;
      showResult(playerScore, playerChoice, computerChoice);
    } else if (Math.sign(computerScore) === 1) {
      totalScore["computerScore"] += computerScore;
      showResult(playerScore, playerChoice, computerChoice);
    }
    clickTimeout = setTimeout(() => {
      removeClickEvent();
      choiceTimeout = setTimeout(() => {
        round++;
        title.innerText = `Round ${round} of 5`;
        playerTotal.innerText = "";
        hands.innerText = "";
        result.innerText = "";
        addClickEvent();
      }, 5000);
    }, 100);
  } else if (round === 5) {
    const computerChoice = getComputerChoice();
    const playerScore = getPlayerResult(playerChoice, computerChoice);
    const computerScore = getComputerResult(playerChoice, computerChoice);
    if (Math.sign(playerScore) === 1) {
      totalScore["playerScore"] += playerScore;
      showResult(playerScore, playerChoice, computerChoice);
    } else if (Math.sign(computerScore) === 1) {
      totalScore["computerScore"] += computerScore;
      showResult(playerScore, playerChoice, computerChoice);
    }
    clickTimeout = setTimeout(() => {
      removeClickEvent();
      endTimeout = setTimeout(() => {
        startEndGameBtn.innerText = "🟢";
        clicks = 0;
        round = 1;
        if (totalScore["playerScore"] > totalScore["computerScore"]) {
          overallResult.innerHTML = `<p class="game-end"><span>${totalScore["playerScore"]} : ${totalScore["computerScore"]}</span> You Won!</p>`;
        } else if (totalScore["playerScore"] < totalScore["computerScore"]) {
          overallResult.innerHTML = `<p class="game-end"><span>${totalScore["playerScore"]} : ${totalScore["computerScore"]}</span> You Lost!</p>`;
        } else {
          overallResult.innerHTML = `<p class="game-end"><span>${totalScore["playerScore"]} : ${totalScore["computerScore"]}</span> It's a Draw!</p>`;
        }
        endGame();
      }, 5000);
    }, 100);
  }
};

const getComputerChoice = () => {
  const rps = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
  const randomIndex = Math.floor(Math.random() * rps.length);
  return rps[randomIndex];
};

const getPlayerResult = (playerChoice, computerChoice) => {
  if (
    playerChoice === "Rock" &&
    (computerChoice === "Scissors" || computerChoice === "Lizard")
  ) {
    return 1;
  } else if (
    playerChoice === "Scissors" &&
    (computerChoice === "Paper" || computerChoice === "Lizard")
  ) {
    return 1;
  } else if (
    playerChoice === "Paper" &&
    (computerChoice === "Rock" || computerChoice === "Spock")
  ) {
    return 1;
  } else if (
    playerChoice === "Lizard" &&
    (computerChoice === "Spock" || computerChoice === "Paper")
  ) {
    return 1;
  } else if (
    playerChoice === "Spock" &&
    (computerChoice === "Scissors" || computerChoice === "Rock")
  ) {
    return 1;
  } else if (playerChoice === computerChoice) {
    return 0;
  } else {
    return -1;
  }
};

const getComputerResult = (playerChoice, computerChoice) => {
  if (
    computerChoice === "Rock" &&
    (playerChoice === "Scissors" || playerChoice === "Lizard")
  ) {
    return 1;
  } else if (
    computerChoice === "Scissors" &&
    (playerChoice === "Paper" || playerChoice === "Lizard")
  ) {
    return 1;
  } else if (
    computerChoice === "Paper" &&
    (playerChoice === "Rock" || playerChoice === "Spock")
  ) {
    return 1;
  } else if (
    computerChoice === "Lizard" &&
    (playerChoice === "Spock" || playerChoice === "Paper")
  ) {
    return 1;
  } else if (
    computerChoice === "Spock" &&
    (playerChoice === "Scissors" || playerChoice === "Rock")
  ) {
    return 1;
  } else if (computerChoice === computerChoice) {
    return 0;
  } else {
    return -1;
  }
};

const showResult = (playerScore, playerChoice, computerChoice) => {
  playerTotal.innerText = playerScore;
  hands.innerText = `🧑🏼 ${playerChoice} vs ${computerChoice} 🤖`;
  if (playerScore === 1) {
    if (playerChoice === "Rock" && computerChoice === "Scissors") {
      result.innerText = `You Win! ${playerChoice} Crushes ${computerChoice}`;
    } else if (playerChoice === "Rock" && computerChoice === "Lizard") {
      result.innerText = `You Win! ${playerChoice} Crushes ${computerChoice}`;
    } else if (playerChoice === "Scissors" && computerChoice === "Paper") {
      result.innerText = `You Win! ${playerChoice} Cuts ${computerChoice}`;
    } else if (playerChoice === "Scissors" && computerChoice === "Lizard") {
      result.innerText = `You Win! ${playerChoice} Decapitates ${computerChoice}`;
    } else if (playerChoice === "Paper" && computerChoice === "Rock") {
      result.innerText = `You Win! ${playerChoice} Covers ${computerChoice}`;
    } else if (playerChoice === "Paper" && computerChoice === "Spock") {
      result.innerText = `You Win! ${playerChoice} Disproves ${computerChoice}`;
    } else if (playerChoice === "Lizard" && computerChoice === "Spock") {
      result.innerText = `You Win! ${playerChoice} Poisons ${computerChoice}`;
    } else if (playerChoice === "Lizard" && computerChoice === "Paper") {
      result.innerText = `You Win! ${playerChoice} Eats ${computerChoice}`;
    } else if (playerChoice === "Spock" && computerChoice === "Scissors") {
      result.innerText = `You Win! ${playerChoice} Smashes ${computerChoice}`;
    } else if (playerChoice === "Spock" && computerChoice === "Rock") {
      result.innerText = `You Win! ${playerChoice} Vaporizes ${computerChoice}`;
    }
  } else if (playerScore === -1) {
    if (computerChoice === "Rock" && playerChoice === "Scissors") {
      result.innerText = `You Lose! ${computerChoice} Crushes ${playerChoice}`;
    } else if (computerChoice === "Rock" && playerChoice === "Lizard") {
      result.innerText = `You Lose! ${computerChoice} Crushes ${playerChoice}`;
    } else if (computerChoice === "Scissors" && playerChoice === "Paper") {
      result.innerText = `You Lose! ${computerChoice} Cuts ${playerChoice}`;
    } else if (computerChoice === "Scissors" && playerChoice === "Lizard") {
      result.innerText = `You Lose! ${computerChoice} Decapitates ${playerChoice}`;
    } else if (computerChoice === "Paper" && playerChoice === "Rock") {
      result.innerText = `You Lose! ${computerChoice} Covers ${playerChoice}`;
    } else if (computerChoice === "Paper" && playerChoice === "Spock") {
      result.innerText = `You Lose! ${computerChoice} Disproves ${playerChoice}`;
    } else if (computerChoice === "Lizard" && playerChoice === "Spock") {
      result.innerText = `You Lose! ${computerChoice} Poisons ${playerChoice}`;
    } else if (computerChoice === "Lizard" && playerChoice === "Paper") {
      result.innerText = `You Lose! ${computerChoice} Eats ${playerChoice}`;
    } else if (computerChoice === "Spock" && playerChoice === "Scissors") {
      result.innerText = `You Lose! ${computerChoice} Smashes ${playerChoice}`;
    } else if (computerChoice === "Spock" && playerChoice === "Rock") {
      result.innerText = `You Lose! ${computerChoice} Vaporizes ${playerChoice}`;
    }
  } else if (playerScore === 0) {
    result.innerText = `It's a Draw!`;
  }
  overallResult.innerHTML = `<p class="game-play">Your Score = <span>${totalScore["playerScore"]} : ${totalScore["computerScore"]}</span> = Opponent Score</p>`;
};

const endGame = () => {
  playerTotal.innerText = "";
  hands.innerText = "";
  result.innerText = "";
  totalScore["playerScore"] = 0;
  totalScore["computerScore"] = 0;
  title.innerHTML =
    "Rock | Paper | Scissors | Lizard | Spock <br> Best of 5 Rounds";
};

startEndGameBtn.addEventListener("click", startGame);