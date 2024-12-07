export type NumberCouple = [number, number];

export function getDistance(list: NumberCouple[]): number {
    const leftElements = list.map((couple) => couple[0]);
    const rightElements = list.map((couple) => couple[1]);

    // sort the two arrays
    leftElements.sort((a, b) => a - b);
    rightElements.sort((a, b) => a - b);

    const distances = leftElements.map((leftElement, index) => Math.abs(leftElement - rightElements[index]));

    return distances.reduce((acc, distance) => acc + distance, 0);
}

export function getSimilarityScore(list: NumberCouple[]): number {
    const rightEntries = list.map((list) => list[1]);

    return list.reduce((acc, [a]) => {
        const count = rightEntries.filter((el) => el === a).length;

        return acc + a * count;
    }, 0);
}
