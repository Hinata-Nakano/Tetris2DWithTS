// テトリミノを下に移動させる関数
export function moveDown(width, currentTetromino, currentPosition, cells) {
    undraw(currentTetromino, currentPosition, cells);
    if (!currentTetromino.some(index => cells[index + width + currentPosition].classList.contains('taken'))) {
        currentPosition += width;
    } /*else{
        //次のテトリミノを生成
    }*/
    draw(currentTetromino, currentPosition, cells);
    return currentPosition; // 更新された位置を返す
}
// テトリミノを描画
export function draw(currentTetromino, currentPosition, cells) {
    currentTetromino.forEach(index => {
        cells[currentPosition + index].classList.add('active');
    });
}
// テトリミノを削除
export function undraw(currentTetromino, currentPosition, cells) {
    currentTetromino.forEach(index => {
        cells[currentPosition + index].classList.remove('active');
    });
}
