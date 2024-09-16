import { generateTetromino } from './generate.js';
import { handleGameOver } from './HandlegameOver.js';
// テトリミノを下に移動させる関数
export function moveDown(width, currentTetromino, currentPosition, cells) {
    if (!currentTetromino.some(index => cells[index + width + currentPosition].classList.contains('taken'))
        && !currentTetromino.some(index => cells[index + width + currentPosition].classList.contains('fixed'))) { //地面やほかのミノにぶつからない
        undraw(currentTetromino, currentPosition, cells);
        currentPosition += width;
    }
    else {
        //fixされた物にクラスリストを追加
        currentTetromino.forEach(index => {
            cells[currentPosition + index].classList.add('fixed');
        }); //fixされた物にクラスリストを追加
        //次のテトリミノを生成
        currentTetromino = generateTetromino(width);
        currentPosition = 4;
    }
    const gameOver = handleGameOver(currentTetromino, currentPosition, cells);
    return { position: currentPosition, tetromino: currentTetromino, gameOver: gameOver }; // 更新された位置を返す
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
