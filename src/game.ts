// game.ts
import { createBoard } from './createBoard.js';
import { moveDown, draw } from './movedown.js';
import { generateTetromino } from './generate.js';

const width = 10; // ボードの横幅 (10列)
let currentPosition = 4; // 初期のテトリミノの位置



// 現在のテトリミノ形状
let currentTetromino = generateTetromino(width);



createBoard();

const cells = Array.from(document.querySelectorAll('#game-board div')) as HTMLElement[];

draw(currentTetromino, currentPosition, cells);

// テトリミノを1秒ごとに下に移動
const intervalId = setInterval(() =>{
   const result = moveDown(width, currentTetromino, currentPosition, cells);
   currentPosition = result.position;
   currentTetromino = result.tetromino;
   if(result.gameOver){
    clearInterval(intervalId);
    return;
   }
    draw(currentTetromino, currentPosition, cells);
}, 100);
