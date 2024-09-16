export function handleGameOver(currentTetromino, currentPosition, cells) {
    if (currentTetromino.some(index => cells[index + currentPosition].classList.contains('fixed'))) {
        alert('Game Over');
        return true;
    }
    return false;
}
