document.addEventListener('DOMContentLoaded', (event) => {
  setListeners();
});
// adding event listeners for ROCK-PAPER-SCISSORS buttons
function setListeners() {
  document.getElementById('rock-btn').addEventListener('click', rockBtnPressed);
  document.getElementById('paper-btn').addEventListener('click', paperBtnPressed);
  document.getElementById('scissors-btn').addEventListener('click', scissorsBtnPressed);
}
// removing event listeners for ROCK-PAPER-SCISSORS buttons
function removeListeners() {
  document.getElementById('rock-btn').removeEventListener('click', rockBtnPressed);
  document.getElementById('paper-btn').removeEventListener('click', paperBtnPressed);
  document.getElementById('scissors-btn').removeEventListener('click', scissorsBtnPressed);
}

let playerImgSrc = ''; // This image will display in the player's game box. The value changes every round.
let botImgSrc = ''; // This image will display in the bot's game box. The value changes every round.
let result = ''; // This string is set to 'win', 'loss', 'draw' every round after calculating the outcome. Function called showResult() is based on this variable.
function rockBtnPressed() {
  removeListeners();
  gameAnimation();
  result = calculateResult(0);
  playerImgSrc = './images/rock.png';
}
function paperBtnPressed() {
  removeListeners();
  gameAnimation();
  result = calculateResult(1);
  playerImgSrc = './images/paper.png';
}
function scissorsBtnPressed() {
  removeListeners();
  gameAnimation();
  result = calculateResult(2);
  playerImgSrc = './images/scissors.png';
}

// This animation shrinks and expands the images in the game boxes three times. Once it's done, showResult() is called.
function gameAnimation() {
  const gameBoxImages = document.querySelectorAll('.RPS-box img');
  const originalSize = gameBoxImages[0].width;
  let imageSize = originalSize;
  let animationCount = 0;
  // expand() is called every 20 milliseconds until the animation is done.
  const animator = setInterval(expand, 20);
  function expand() {
    if (gameBoxImages[0].width === originalSize) {
      if (animationCount === 3) {
        clearInterval(animator);
        showResult(result);
        return;
      }
      if (animationCount === 2) {
        gameBoxImages[0].src = botImgSrc;
        gameBoxImages[1].src = playerImgSrc;
      }
      animationCount += 1;
      imageSize = 30;
    }
    imageSize += 10;
    for (const img of gameBoxImages) {
      img.style.width = `${imageSize}px`;
      img.style.height = `${imageSize}px`;
    }
  }
}

function calculateResult(player) {
  const bot = getRndInteger(0, 3);
  switch (bot) {
    case 0:
      botImgSrc = './images/rock.png';
      break;
    case 1:
      botImgSrc = './images/paper.png';
      break;
    case 2:
      botImgSrc = './images/scissors.png';
      break;
    default:
      botImgSrc = './images/rock.png';
  }
  if (player === bot) {
    return 'draw';
  }
  if (player === 0 && bot === 2) {
    return 'win';
  }
  if (player === 1 && bot === 0) {
    return 'win';
  }
  if (player === 2 && bot === 1) {
    return 'win';
  }
  return 'loss';
}

async function showResult(res) {
  const gameBoxes = document.querySelectorAll('.RPS-box');
  const gameBoxImages = document.querySelectorAll('.RPS-box img');
  const resText = document.getElementById('resText');
  let resClassName = '';
  for (const box of gameBoxes) {
    box.classList.remove('border-black');
  }
  if (res === 'win') {
    addPuzzlePiece();
    for (const box of gameBoxes) {
      resClassName = 'success';
      box.classList.add(`border-${resClassName}`);
    }
    resText.textContent = 'WIN';
    resText.classList.add(`text-${resClassName}`);
  } else if (res === 'loss') {
    for (const box of gameBoxes) {
      resClassName = 'danger';
      box.classList.add(`border-${resClassName}`);
    }
    resText.textContent = 'LOSS';
    resText.classList.add(`text-${resClassName}`);
  } else if (res === 'draw') {
    for (const box of gameBoxes) {
      resClassName = 'warning';
      box.classList.add(`border-${resClassName}`);
    }
    resText.textContent = 'DRAW';
    resText.classList.add(`text-${resClassName}`);
  }
  resText.classList.remove('opacity-0');
  await new Promise((r) => setTimeout(r, 1200));
  for (let i = 0; i < gameBoxes.length; i += 1) {
    gameBoxes[i].classList.remove(`border-${resClassName}`);
    gameBoxes[i].classList.add('border-black');
    gameBoxImages[i].src = './images/rock.png';
  }
  resText.classList.add('opacity-0');
  setListeners();
  await new Promise((r) => setTimeout(r, 150));
  resText.classList.remove(`text-${resClassName}`);
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
