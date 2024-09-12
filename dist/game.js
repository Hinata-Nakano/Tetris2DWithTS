"use strict";
// game.ts
var gameBoard = document.getElementById('game-board');
var width = 10; // ボードの横幅 (10列)
var currentPosition = 4; // 初期のテトリミノの位置
// I字型テトリミノの定義（4x1）
var tetrominoI = [
    [1, width + 1, width * 2 + 1, width * 3 + 1]
];
// 現在のテトリミノ形状
var currentTetromino = tetrominoI[0];
// ゲームボードを作成
function createBoard() {
    for (var i = 0; i < 200; i++) {
        var cell = document.createElement('div');
        gameBoard.appendChild(cell);
    }
    for (var i = 0; i < 10; i++) {
        var cell = document.createElement('div');
        cell.classList.add('taken'); // ボトムラインとして固定
        gameBoard.appendChild(cell);
    }
}
createBoard();
var cells = Array.from(document.querySelectorAll('#game-board div'));
// テトリミノを描画
function draw() {
    currentTetromino.forEach(function (index) {
        cells[currentPosition + index].classList.add('active');
    });
}
// テトリミノを削除
function undraw() {
    currentTetromino.forEach(function (index) {
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
