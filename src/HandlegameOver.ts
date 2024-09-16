export function handleGameOver(currentTetromino: number[], currentPosition: number, cells: HTMLElement[]):boolean{
    if(currentTetromino.some(index => cells[index + currentPosition].classList.contains('fixed'))){
        alert('Game Over');
        return true;
    }
    return false;
}