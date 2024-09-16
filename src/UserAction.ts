export function userAction(event: KeyboardEvent){
    if(event.key === "ArrowLeft"){
        moveLeft(width, currentTetromino, currentPosition, cells);
    }
}

function moveLeft(width: number, currentTetromino: number[], currentPosition: number, cells: HTMLElement[]){
    currentTetromino.forEach(index => {
        cells[currentPosition + index - 1].classList.add('active');
    });
}

function moveRight(width: number, currentTetromino: number[], currentPosition: number, cells: HTMLElement[]){
    const result = moveRight(width, currentTetromino, currentPosition, cells);
    const result = moveLeft(width, currentTetromino, currentPosition, cells);       

