import { gameBoard } from './gameBoard.js';
// ゲームボードを作成
export function createBoard() {
    for (let i = 0; i < 200; i++) {
        const cell = document.createElement('div');
        gameBoard.appendChild(cell);
    }
    for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.classList.add('taken'); // ボトムラインとして固定
        gameBoard.appendChild(cell);
    }
}
