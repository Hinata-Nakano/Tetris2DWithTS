import { createBoard } from '../createBoard.js';
import { moveDown, draw } from '../movedown.js';
import { generateTetromino } from '../generate.js';
export class TetrisGame {
    constructor() {
        this.width = 10; // ボードの横幅 (10列)
        this.currentPosition = 4; // 初期のテトリミノの位置
        this.intervalId = null;
        // 現在のテトリミノ形状
        this.currentTetromino = generateTetromino(this.width);
        createBoard();
        this.cells = Array.from(document.querySelectorAll('#game-board div'));
        draw(this.currentTetromino, this.currentPosition, this.cells);
    }
    startGame() {
        // テトリミノを1秒ごとに下に移動
        const intervalId = setInterval(() => {
            const result = moveDown(this.width, this.currentTetromino, this.currentPosition, this.cells);
            this.currentPosition = result.position;
            this.currentTetromino = result.tetromino;
            if (result.gameOver) {
                this.stopGame(intervalId);
                return;
            }
            draw(this.currentTetromino, this.currentPosition, this.cells);
        }, 100);
    }
    stopGame(intervalId) {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
    }
}
