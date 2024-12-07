import path from "node:path/posix";

export type Map = string[];

export type Point = {
    x: number;
    y: number;
};

export type Direction = "N" | "E" | "S" | "W";

export type GuardSymbol = "^" | ">" | "v" | "<";

const DIRECTIONS_SEQUENSE: Direction[] = ["N", "E", "S", "W"];

export function findStartPoint(map: Map, guardSymbol: GuardSymbol): Point {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === guardSymbol) {
                return { x, y };
            }
        }
    }

    throw new Error("Start point not found");
}

export function getPath(
    startPoint: Point,
    map: Map,
    direction: Direction,
): Point[] {
    const directionDeltas: { [key in Direction]: { dx: number; dy: number } } =
        {
            N: { dx: 0, dy: -1 },
            E: { dx: 1, dy: 0 },
            S: { dx: 0, dy: 1 },
            W: { dx: -1, dy: 0 },
        };

    const { dx, dy } = directionDeltas[direction];
    let { x, y } = startPoint;
    const path: Point[] = [{ x, y }];

    while (true) {
        x += dx;
        y += dy;

        if (
            x < 0 ||
            x >= map[0].length ||
            y < 0 ||
            y >= map.length ||
            map[y][x] === "#"
        ) {
            break;
        }

        path.push({ x, y });
    }

    return path;
}

export function shallContinue(
    mapX: number,
    mapY: number,
    point: Point,
    direction: Direction,
): boolean {
    if (direction === "N") {
        return point.y > 0;
    } else if (direction === "E") {
        return point.x < mapX - 1;
    } else if (direction === "S") {
        return point.y < mapY - 1;
    } else {
        return point.x > 0;
    }
}

export function getNextDirection(
    currentDirection: Direction,
    directionsSequense: Direction[],
): Direction {
    let currentIndex = directionsSequense.indexOf(currentDirection);
    if (currentIndex === directionsSequense.length - 1) {
        return directionsSequense[0];
    } else {
        return directionsSequense[currentIndex + 1];
    }
}

export function countDistinctPositions(map: Map): number {
    let currentPosition = findStartPoint(map, "^");
    let currentDirection: Direction = "W";

    const distinctPositions: Set<string> = new Set();

    do {
        currentDirection = getNextDirection(currentDirection, DIRECTIONS_SEQUENSE);

        const path:Point[] = getPath(
            currentPosition,
            map,
            currentDirection
        );

        currentPosition = path[path.length - 1];

        path.forEach((point) => {
    console.log(point);
            distinctPositions.add(`${point.x},${point.y}`);
        });

    } while (shallContinue(map[0].length, map.length, currentPosition, currentDirection));

    return distinctPositions.size;
}
