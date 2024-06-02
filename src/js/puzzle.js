document.addEventListener('DOMContentLoaded', (event) => {
  createAddOrder();
  setDragListeners();
});

const puzzleAddOrder = [];
let currentAddPuzzlePieceIndex = 0;
function createAddOrder() {
  for (let i = 0; i < 9; i += 1) {
    puzzleAddOrder.push(`puzzle-${i}`);
  }
  shuffleArray(puzzleAddOrder);
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
function setDragListeners() {
  const puzzlePieces = document.querySelector('.puzzle-container').children;
  for (const e of puzzlePieces) {
    e.addEventListener('dragstart', handleDragStart);
    e.addEventListener('drop', handleDrop);
    e.addEventListener('dragover', handleDragOver);
  }
}
function getFreeGridCell() {
  const cells = document.querySelector('.puzzle-container').children;
  for (const cell of cells) {
    if (cell.id === '') {
      return cell;
    }
  }
  return undefined;
}
function addPuzzlePiece() {
  if (currentAddPuzzlePieceIndex === 9) {
    return;
  }
  currentAddPuzzlePieceIndex += 1;
  const div = getFreeGridCell();
  div.id = puzzleAddOrder[currentAddPuzzlePieceIndex];
  div.classList.add('puzzle-piece');
}

let dragSrcEl;
function handleDragStart(e) {
  console.log(this);
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDrop(e) {
  console.log(this);
  e.stopPropagation();
  if (dragSrcEl !== this) {
    console.log(dragSrcEl.innerHTML);
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}
function handleDragOver(e) {
  e.preventDefault();
  return false;
}
