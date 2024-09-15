// テトリミノを下に移動させる関数
export function moveDown(width: number, currentTetromino: number[], currentPosition: number, cells: HTMLElement[]): number {
    undraw(currentTetromino, currentPosition, cells);
    if(!currentTetromino.some(index => cells[index + width +currentPosition].classList.contains('taken'))){
    
    currentPosition += width;
    }/*else{
        //次のテトリミノを生成
    }*/
    draw(currentTetromino, currentPosition, cells);
    return currentPosition;  // 更新された位置を返す
}

// テトリミノを描画
export function draw(currentTetromino: number[], currentPosition: number, cells: HTMLElement[]) {
    currentTetromino.forEach(index => {
        cells[currentPosition + index].classList.add('active');
    });
}

// テトリミノを削除
export function undraw(currentTetromino: number[], currentPosition: number, cells: HTMLElement[]) {
    currentTetromino.forEach(index => {
        cells[currentPosition + index].classList.remove('active');
    });
}