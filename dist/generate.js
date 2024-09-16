class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }
    // 0以上1未満の乱数を生成
    random() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
}
// グローバルな SeededRandom インスタンスを作成
const globalRandom = new SeededRandom(Date.now());
export function generateTetromino(width) {
    const tetrominos = [
        [0, 1, 2, 3],
        [0, 1, width, width + 1], //四角
        [1, width, width + 1, width + 2], // T字
        [0, 1, width + 1, width + 2], // Z字
        [0, 1, 2, width + 2], // 逆L字
        [0, 1, 2, width], // L字
    ];
    // グローバルな SeededRandom インスタンスを使用
    const index = Math.floor(globalRandom.random() * tetrominos.length);
    return tetrominos[index];
}
