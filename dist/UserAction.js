export function userAction(event) {
    if (event.key === "ArrowLeft") {
        moveLeft(width, currentTetromino, currentPosition, cells);
    }
}
function moveLeft(width, currentTetromino, currentPosition, cells) {
    currentTetromino.forEach(index => {
        cells[currentPosition + index - 1].classList.add('active');
    });
}
function moveRight(width, currentTetromino, currentPosition, cells) {
    const result = moveRight(width, currentTetromino, currentPosition, cells);
    const result = moveLeft(width, currentTetromino, currentPosition, cells);
}
