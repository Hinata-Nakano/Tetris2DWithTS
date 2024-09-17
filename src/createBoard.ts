import { gameBoard } from './gameBoard.js';
// ゲームボードを作成
export function createBoard() {//横１０縦２０
    for (let i = 0; i < 200; i++) {
        const cell = document.createElement('div');
        if(i % 10 === 0){
            cell.classList.add('leftWall');
        }
        if(i % 10 === 9){
            cell.classList.add('rightWall');
        }
        gameBoard.appendChild(cell);
    }
    for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.classList.add('taken');  // ボトムラインとして固定
        gameBoard.appendChild(cell);
    }
}