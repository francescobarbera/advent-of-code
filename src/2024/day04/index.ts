export type Map = string[];

export type Direction =
    | "horizontal"
    | "vertical"
    | "oblique-top-bottom"
    | "oblique-bottom-top";

// export function canPerformCheck(
//     mapXSize: number,
//     mapYSize: number,
//     startX: number,
//     startY: number,
//     direction: Direction,
// ): boolean {
//     if (startX < 0 || startX >= mapXSize) return false;

//     switch (direction) {
//         case "horizontal":
//             return startX + wordLenght <= mapXSize;
//         case "vertical":
//             return startY + wordLenght <= mapYSize;
//         case "oblique-top-bottom":
//             return (
//                 startX + wordLenght <= mapXSize &&
//                 startY + wordLenght <= mapYSize
//             );
//         case "oblique-bottom-top":
//             return (
//                 startX + wordLenght >= 0 && startY + wordLenght <= mapYSize
//             );
//     }
// }

// export function countXmasV1(map: Map): number {
//     let xmasCount = 0;

//     const getWord = (
//         x: number,
//         y: number,
//         direction: Direction,
//     ): string | null => {
//         const directionsMap: Record<Direction, [number, number]> = {
//             horizontal: [1, 0],
//             vertical: [0, 1],
//             "oblique-top-bottom": [1, 1],
//             "oblique-bottom-top": [-1, 1],
//         };

//         if (!canPerformCheck(map[0].length, map.length, x, y, direction)) {
//             return null;
//         }

//         let word = "";
//         for (let i = 0; i < wordLenght; i++) {
//             const dx = directionsMap[direction][0];
//             const dy = directionsMap[direction][1];

//             word += map[y + i * dy][x + i * dx];
//         }
//         return word;
//     };

//     for (let y = 0; y < map.length; y++) {
//         for (let x = 0; x < map[y].length; x++) {
//             const direction = [
//                 "horizontal",
//                 "vertical",
//                 "oblique-top-bottom",
//                 "oblique-bottom-top",
//             ] as Direction[];

//             direction.forEach((direction) => {
//                 let word = getWord(x, y, direction);
//                 if (word === "XMAS" || word === "SAMX") {
//                     console.log(direction);
//                     xmasCount++;
//                 }
//             });
//         }
//     }

//     return xmasCount;
// }

type Pattern = string[];

export const exercise1Patterns: Pattern[] = [
    ["XMAS", "....", "....", "...."],
    ["SAMX", "....", "....", "...."],
    ["X...", "M...", "A...", "S..."],
    ["S...", "A...", "M...", "X..."],
    ["X...", ".M..", "..A.", "...S"],
    ["S...", ".A..", "..M.", "...X"],
    ["...S", "..A.", ".M..", "X..."],
    ["...X", "..M.", ".A..", "S..."],
];

export const exercise2Patterns: Pattern[] = [
    ["M.S", ".A.", "M.S"],
    ["S.M", ".A.", "S.M"],
    ["S.M", ".A.", "S.M"],
];

export function countXmas(
    map: Map,
    validPatterns: Pattern[],
    wordLenght: number,
): number {
    let xmasCount = 0;

    const fillerRow = ".".repeat(map[0].length);
    map = [...map, ...Array(wordLenght - 1).fill(fillerRow)];
    map = map.map((row) => row + ".".repeat(wordLenght));

    for (let x = 0; x <= map[0].length - wordLenght; x++) {
        for (let y = 0; y <= map.length - wordLenght; y++) {
            for (let pattern of validPatterns) {
                let match = true;
                for (let i = 0; i < wordLenght; i++) {
                    for (let j = 0; j < wordLenght; j++) {
                        if (
                            pattern[j][i] !== "." &&
                            pattern[j][i] !== map[y + j][x + i]
                        ) {
                            match = false;
                        }
                    }
                }
                if (match) {
                    xmasCount++;
                }
            }
        }
    }

    return xmasCount;
}
