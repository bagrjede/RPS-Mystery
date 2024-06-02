// The puzzle system uses HTML grid.
// This allows me to change the order of the grid elements without changing the html structure.
// I am only using css classes to determine each puzzle piece's position.


document.addEventListener('DOMContentLoaded', (event) => {
  randomizePositions();
  setDragListeners();
});

// This function is called on load. It shuffles the puzzle board.
function randomizePositions() {
  const order = []
  for (let i = 0; i < 9; i += 1) {
    order.push(`puzzle-pos-${i}`);
  }
  shuffleArray(order);
  const cells = document.querySelector('.puzzle-container').children;
  for (let i = 0; i < 9; i += 1) {
    cells[i].classList.add(order[i])
  }
}
function shuffleArray(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
// Setting listeners for every puzzle piece.
function setDragListeners() {
  const puzzlePieces = document.querySelector('.puzzle-container').children;
  for (const e of puzzlePieces) {
    e.addEventListener('dragstart', handleDragStart);
    e.addEventListener('drop', handleDrop);
    e.addEventListener('dragover', handleDragOver);
  }
}
// removing listeners for every puzzle piece.
function removeDragListeners() {
  const puzzlePieces = document.querySelector('.puzzle-container').children;
  for (const e of puzzlePieces) {
    e.removeEventListener('dragstart', handleDragStart);
    e.removeEventListener('drop', handleDrop);
    e.removeEventListener('dragover', handleDragOver);
  }
}

// This function is called from the other script every time the player wins a game of rock-paper-scissors. The puzzle piece is already in the DOM. The function only makes it visible by adding the bg image.
function addPuzzlePiece() {
  const cells = document.querySelector('.puzzle-container').children;
  for (const cell of cells) {
    if (!cell.classList.contains('puzzle-piece')) {
      cell.classList.add('puzzle-piece');
      return;
    }
  }
}

let dragSrcEl;
let dragSrcElPos;
function handleDragStart(e) {
  // storing the element that is being dragged
  dragSrcEl = this;
  // finding the puzzle-pos class
  for (const c of this.classList) {
    if (c.includes('puzzle-pos')) {
      dragSrcElPos = c;
    }
  }
}
function handleDrop(e) {
  e.stopPropagation(); // stops the browser from redirecting
  if (dragSrcEl !== this) {
    // finding the puzzle-pos class
    for (const c of this.classList) {
      if (c.includes('puzzle-pos')) {
        // switching positions

        dragSrcEl.classList.remove(dragSrcElPos);
        dragSrcEl.classList.add(c);

        this.classList.remove(c);
        this.classList.add(dragSrcElPos);
      }
    }
  }

  checkPuzzleOrder();
  return false;
}
function handleDragOver(e) {
  e.preventDefault();
  return false;
}

// This function check if the puzzle is completed by checking the order of puzzle-pos classes. If it is, dragging becomes disabled.
function checkPuzzleOrder(){
  const cells = document.querySelector('.puzzle-container').children;
  for (let i = 0; i < 9; i += 1) {
    if (!cells[i].classList.contains(`puzzle-pos-${i}`)) {
      return;
    }
  }
  removeDragListeners();
}
