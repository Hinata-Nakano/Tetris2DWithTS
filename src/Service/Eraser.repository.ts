// 消去できる行があるかどうかを確認
// 消去できる行がある場合、その行を消去
// 消去できる行がない場合、何もしない
//消去したのちに、上の行を下に移動
import { gameBoard } from "../gameBoard.js";

export class EraserRepository{
    private line:number = 20;
    private width:number = 10;
    private cells:HTMLElement[];
    constructor(cells:HTMLElement[]){
        this.cells = cells;
    }
    public erase():void{
        const lines = this.AllLines();
        //const goneLines:HTMLElement[] = [];
        if(lines.length > 0){
            lines.forEach(line => {
                for(let i = 0; i < this.width; i++){
                    this.cells[line * this.width + i].classList.remove('fixed');
                }
                this.cells.splice(line * this.width, this.width);
            });
              // 新しい行を追加
              const newLines = Array(lines.length).fill(null).map(() => 
                Array(this.width).fill(null).map(() => {
                    const newCell = document.createElement('div');
                    newCell.classList.add('cell');
                    return newCell;
                })
            ).flat();
            this.cells.unshift(...newLines);
            //上の行を下に移動
            this.cells.forEach(cell => gameBoard.appendChild(cell));
        }
    }   

    private AllLines():number[]{
        const Lines = [];
        for(let i = 0; i < this.line; i++){
           if(this.IsLineFull(i)){
            Lines.push(i);
           }
        }
        return Lines;
    }
    // 行が埋まっているかどうかを確認
    private IsLineFull(index:number):boolean{
        let flag:boolean = true;
        for(let i = 0; i < this.width; i++){ //widthは0から
            if(this.cells[index* this.width + i].classList.contains('fixed')){
                flag = true;
            }else{
                flag = false;
                break;
            }
        }
        return flag;
    }
    
}