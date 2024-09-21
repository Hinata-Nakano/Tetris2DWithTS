// 消去できる行があるかどうかを確認
// 消去できる行がある場合、その行を消去
// 消去できる行がない場合、何もしない
//消去したのちに、上の行を下に移動
import { gameBoard } from "../gameBoard.js";
export class EraserRepository {
    constructor(cells) {
        this.line = 20;
        this.width = 10;
        this.cells = cells;
    }
    erase() {
        const lines = this.AllLines();
        //const goneLines:HTMLElement[] = [];
        if (lines.length > 0) {
            lines.forEach(line => {
                for (let i = 0; i < this.width; i++) {
                    this.cells[line * this.width + i].classList.remove('fixed');
                }
                this.cells.splice(line * this.width, this.width);
            });
            // 新しい行を追加
            /*const newLines = Array(lines.length).fill(null).map(() =>
               Array(this.width).fill(null).map(() => {
                   const newCell = document.createElement('div');
                   return newCell;
               })
           ).flat();*/
            for (let l = 0; l < lines.length; l++) {
                const newLines = [];
                for (let i = 0; i < this.width; i++) {
                    const Newcell = document.createElement('div');
                    if (i % 10 === 0) {
                        Newcell.classList.add('leftWall');
                    }
                    if (i % 10 === 9) {
                        Newcell.classList.add('rightWall');
                    }
                    newLines.push(Newcell);
                }
                this.cells.unshift(...newLines);
            }
            //上の行を下に移動
            gameBoard.innerHTML = '';
            this.cells.map((cell, index) => {
                if (200 <= index && index < 210) {
                    cell.classList.add('taken');
                }
            });
            this.cells.forEach(cell => gameBoard.appendChild(cell));
        }
    }
    AllLines() {
        const Lines = [];
        for (let i = 0; i < this.line; i++) {
            if (this.IsLineFull(i)) {
                Lines.push(i);
            }
        }
        return Lines;
    }
    // 行が埋まっているかどうかを確認
    IsLineFull(index) {
        let flag = true;
        for (let i = 0; i < this.width; i++) { //widthは0から
            if (this.cells[index * this.width + i].classList.contains('fixed')) {
                flag = true;
            }
            else {
                flag = false;
                break;
            }
        }
        return flag;
    }
}
