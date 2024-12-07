export function areTwoNumbersSave(level: [number, number]): boolean {
    return Math.abs(level[0] - level[1]) <= 3 && level[0] !== level[1];
}

export function isSafe(compareFn: (level: [number, number]) => boolean, level: number[]): boolean {
    const direction = level[0] < level[1] ? 'up' : 'down';

    for (let i = 0; i < level.length - 1; i++) {
        if (direction === 'up' && level[i] > level[i + 1]) {
            return false;
        }
        if (direction === 'down' && level[i] < level[i + 1]) {
            return false;
        }

        if (!compareFn([level[i], level[i + 1]])) {
            return false;
        }
    }

    return true;
}

export function isSafeProblemDampener(compareFn: (levels: number[]) => boolean, levels: number[]): boolean {
    let isRealySafe = false;

    for (let x = 0; x < levels.length; x++) {
        const levelsWithoutALevel = levels.filter((_, index) => index !== x);
        const compareResult = compareFn(levelsWithoutALevel);
       if (compareResult) {
           isRealySafe = true;
       }
    }
    return isRealySafe;
}
