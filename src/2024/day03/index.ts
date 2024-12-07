export type NumberCouple = [number, number];

const multiplicationRegex = /^mul\((\d{1,3}),(\d{1,3})\)$/;
const DO = "do()";
const DO_NOT = "don't()";

export function findNotCorruptedMul(input: string): string[] {
    let multiplications: string[] = [];

    let enabled = true;

    for (let i = 0; i < input.length; i++) {
        // mul(1,1) 8 characters
        // mul(111,111) 12 characters
        if (input.slice(i, i + 4) === DO) {
            enabled = true;
        }
        if (input.slice(i, i + 7) === DO_NOT) {
            enabled = false;
        }
        for (let characters = 8; characters <= 12; characters++) {
            if (multiplicationRegex.test(input.slice(i, i + characters))) {
                if (enabled) {
                    multiplications.push(input.slice(i, i + characters));
                }
                i = i + characters - 1;
                break;
            }
        }
    }
    return multiplications;
}

export function multiply(input: string): number {
    const matches = input.match(multiplicationRegex);

    if (!matches) {
        throw new Error(`Invalid input ${input}`);
    }

    return parseInt(matches[1], 10) * parseInt(matches[2], 10);
}

export function solve(input: string): number {
    let result = 0;

    const multiplications = findNotCorruptedMul(input);

    for (let j = 0; j < multiplications.length; j++) {
        result += multiply(multiplications[j]);
    }

    return result;
}
