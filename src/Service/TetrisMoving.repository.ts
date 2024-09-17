import { createBoard } from '../createBoard.js';
import { moveDown, draw, undraw } from '../movedown.js';
import { generateTetromino } from '../generate.js';

export class TetrisGame {
    private width: number = 10; // ボードの横幅 (10列)
    private currentPosition: number = 4; // 初期のテトリミノの位置
    private currentTetromino: number[];
    private cells: HTMLElement[];
    private intervalId: NodeJS.Timeout | null = null;

    constructor() {
        // 現在のテトリミノ形状
        this.currentTetromino = generateTetromino(this.width);

        createBoard();

        this.cells = Array.from(document.querySelectorAll('#game-board div')) as HTMLElement[];

        draw(this.currentTetromino, this.currentPosition, this.cells);

        document.addEventListener('keydown',this.handleKeyPress.bind(this));
       
    }

    public startGame(): void {
        // テトリミノを1秒ごとに下に移動
        this.intervalId = setInterval(() => {
            const result = moveDown(this.width, this.currentTetromino, this.currentPosition, this.cells);
            this.currentPosition = result.position;
            this.currentTetromino = result.tetromino;
            if (result.gameOver) {
                this.stopGame();
                return;
            }
            draw(this.currentTetromino, this.currentPosition, this.cells);
        }, 1000);
    }

    public stopGame(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }
    }

    private handleKeyPress(event: KeyboardEvent): void {
        if(this.intervalId === null){
            return;
        }
        if (event.key === "ArrowLeft") {
            if(this.currentTetromino.some
                (index => this.cells[index + this.currentPosition].classList.contains('leftWall'))){
                return;
            }
            this.moveHorizontal(-1);
        }
        if (event.key === "ArrowRight") {
            if(this.currentTetromino.some
                (index => this.cells[index  + this.currentPosition].classList.contains('rightWall'))){
                return;
            }
            this.moveHorizontal(1);
        }
        if (event.key === "ArrowDown") {
            this.moveDown();
        }
        if (event.key === "ArrowUp") {
            this.rotate();
        }
    }
    private moveHorizontal(direction:number): void {
      undraw(this.currentTetromino, this.currentPosition, this.cells);
      this.currentPosition += direction;
      draw(this.currentTetromino, this.currentPosition, this.cells);
    }
    private moveDown(): void {
        undraw(this.currentTetromino, this.currentPosition, this.cells);
        const result = moveDown(this.width, this.currentTetromino, this.currentPosition, this.cells);
        this.currentPosition = result.position;
        this.currentTetromino = result.tetromino;
        if (result.gameOver) {
            this.stopGame();
        } else {
            draw(this.currentTetromino, this.currentPosition, this.cells);
        }
    }
    private rotate(): void {
        undraw(this.currentTetromino, this.currentPosition, this.cells);
        const rotated = this.getRotatedTetromino();
        if (this.isValidMove(this.currentPosition, rotated)) {
            this.currentTetromino = rotated;
        }
        draw(this.currentTetromino, this.currentPosition, this.cells);
    }

    private getRotatedTetromino(): number[] {
        const center = this.getTetrominoCenter();
        const relative = this.currentTetromino.map(index => {
            const x = index % this.width - center.x;
            const y = Math.floor(index / this.width) - center.y;
            return { x, y };
        });
        const rotated = relative.map(point => ({
            x: -point.y,
            y: point.x
        }));
        return this.normalizeRotatedTetromino(rotated, center);
    }

    private getTetrominoCenter(): { x: number, y: number } {
        const minX = Math.min(...this.currentTetromino.map(index => index % this.width));
        const maxX = Math.max(...this.currentTetromino.map(index => index % this.width));
        const minY = Math.min(...this.currentTetromino.map(index => Math.floor(index / this.width)));
        const maxY = Math.max(...this.currentTetromino.map(index => Math.floor(index / this.width)));
        return {
            x: Math.floor((minX + maxX) / 2),
            y: Math.floor((minY + maxY) / 2)
        };
    }

    private normalizeRotatedTetromino(rotated: { x: number, y: number }[], center: { x: number, y: number }): number[] {
        const normalized = rotated.map(point => ({
            x: point.x + center.x,
            y: point.y + center.y
        }));
        const minX = Math.min(...normalized.map(p => p.x));
        const minY = Math.min(...normalized.map(p => p.y));
        return normalized.map(point => (point.y - minY) * this.width + (point.x - minX));
    }

    private isValidMove(newPosition: number, tetromino: number[]): boolean {
        return tetromino.every(index => {
            const newIndex = newPosition + index;
            const x = newIndex % this.width;
            return (
                newIndex >= 0 &&
                newIndex < this.cells.length &&
                x >= 0 && x < this.width &&
                !this.cells[newIndex].classList.contains('taken') &&
                !this.cells[newIndex].classList.contains('fixed')
            );
        });
    }

   
}