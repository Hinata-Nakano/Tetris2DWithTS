// game.ts

const gameBoard = document.getElementById('game-board')!;

const width = 10; // ボードの横幅 (10列)
let currentPosition = 4; // 初期のテトリミノの位置

// I字型テトリミノの定義（4x1）
const tetrominoI = [
    [1, width+1, width*2+1, width*3+1]
];

// 現在のテトリミノ形状
let currentTetromino = tetrominoI[0];

// ゲームボードを作成
function createBoard() {
    for (let i = 0; i < 200; i++) {
        const cell = document.createElement('div');
        gameBoard.appendChild(cell);
    }
    for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.classList.add('taken');  // ボトムラインとして固定
        gameBoard.appendChild(cell);
    }
}

createBoard();

const cells = Array.from(document.querySelectorAll('#game-board div')) as HTMLElement[];

// テトリミノを描画
function draw() {
    currentTetromino.forEach(index => {
        cells[currentPosition + index].classList.add('active');
    });
}

// テトリミノを削除
function undraw() {
    currentTetromino.forEach(index => {
        cells[currentPosition + index].classList.remove('active');
    });
}

// テトリミノを下に移動させる関数
function moveDown() {
    undraw();
    currentPosition += width;
    draw();
}

// テトリミノを1秒ごとに下に移動
setInterval(moveDown, 1000);
