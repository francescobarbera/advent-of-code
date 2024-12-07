import { describe, test } from "node:test";
import assert from "node:assert";

import {
    Map,
    Point,
    countDistinctPositions,
    findStartPoint,
    getNextDirection,
    getPath,
    shallContinue,
} from "./index";
import example from "../day06/example";
import exercise from "../day06/exercise";

describe("findStartPoint", () => {
    test("it returns the coordinates of the start symbol ^", () => {
        const map: Map = ["   ", " ^ ", "   "];

        const actual = findStartPoint(map, "^");

        assert.deepStrictEqual(actual, { x: 1, y: 1 });
    });

    test("it throws an expection if not start symbol is present", () => {
        const map: Map = ["   ", "   ", "   "];

        assert.throws(() => findStartPoint(map, "^"), {
            message: "Start point not found",
        });
    });
});

describe("getPath", () => {
    test("it returns the path when direction is north and there is an obstructions on the way", () => {
        const map: Map = ["###", "...", "...", "#^#"];

        const actual = getPath({ x: 1, y: 3 }, map, "N");

        assert.deepStrictEqual(actual, [
            { x: 1, y: 3 },
            { x: 1, y: 2 },
            { x: 1, y: 1 },
        ]);
    });

    test("it returns the path when direction is east and there is an obstructions on the way", () => {
        const map: Map = ["...#", ">..#", "...#"];

        const actual = getPath({ x: 0, y: 1 }, map, "E");

        assert.deepStrictEqual(actual, [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
        ]);
    });

    test("it returns the path when direction is south and there is an obstructions on the way", () => {
        const map: Map = [".v.", "...", "...", "###"];

        const actual = getPath({ x: 1, y: 0 }, map, "S");

        assert.deepStrictEqual(actual, [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
        ]);
    });

    test("it returns the path when direction is west and there is an obstructions on the way", () => {
        const map: Map = ["#...", "#..<", "#..."];

        const actual = getPath({ x: 3, y: 1 }, map, "W");

        assert.deepStrictEqual(actual, [
            { x: 3, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 1 },
        ]);
    });

    test("it returns the path when direction is north and there is no obstructions on the way", () => {
        const map: Map = ["...", "...", "...", "#^#"];

        const actual = getPath({ x: 1, y: 3 }, map, "N");

        assert.deepStrictEqual(actual, [
            { x: 1, y: 3 },
            { x: 1, y: 2 },
            { x: 1, y: 1 },
            { x: 1, y: 0 },
        ]);
    });

    test("it returns the path when direction is east and there is no obstructions on the way", () => {
        const map: Map = ["....", ">...", "...."];

        const actual = getPath({ x: 0, y: 1 }, map, "E");

        assert.deepStrictEqual(actual, [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
        ]);
    });

    test("it returns the path when direction is south and there is no obstructions on the way", () => {
        const map: Map = ["#v#", "...", "...", "..."];

        const actual = getPath({ x: 1, y: 0 }, map, "S");

        assert.deepStrictEqual(actual, [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
        ]);
    });

    test("it returns the path when direction is west and there is no obstructions on the way", () => {
        const map: Map = ["....", "...<", "...."];

        const actual = getPath({ x: 3, y: 1 }, map, "W");

        assert.deepStrictEqual(actual, [
            { x: 3, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
        ]);
    });
});

describe("shallContinue", () => {
    test("it returns true if the point is on the upper limit of the map and direction is north", () => {
        const actual = shallContinue(3, 3, { x: 1, y: 0 }, "N");

        assert.strictEqual(actual, false);
    });

    test("it returns true if the point is on the lower limit of the map and direction is south", () => {
        const actual = shallContinue(3, 3, { x: 1, y: 2 }, "S");

        assert.strictEqual(actual, false);
    });

    test("it returns true if the point is on the left limit of the map and direction is west", () => {
        const actual = shallContinue(3, 3, { x: 0, y: 1 }, "W");

        assert.strictEqual(actual, false);
    });

    test("it returns true if the point is on the right limit of the map and direction is east", () => {
        const actual = shallContinue(3, 3, { x: 2, y: 1 }, "E");

        assert.strictEqual(actual, false);
    });

    test("it returns false if the point is not on the limit of the map", () => {
        const actual = shallContinue(3, 3, { x: 1, y: 1 }, "N");

        assert.strictEqual(actual, true);
    });
});

describe("getNextDirection", () => {
    test("it returns the next direction of the list if there is another element in the provided direction sequence", () => {
        assert.strictEqual(getNextDirection("N", ["N", "E", "S", "W"]), "E");
        assert.strictEqual(getNextDirection("E", ["N", "E", "S", "W"]), "S");
        assert.strictEqual(getNextDirection("S", ["N", "E", "S", "W"]), "W");
    });

    test("it returns the first direction of the list if the provided direction is the last in the sequense", () => {
        assert.strictEqual(getNextDirection("W", ["N", "E", "S", "W"]), "N");
    });
});

describe("countDistinctPositions", () => {
    test("it works for a simple map, case 1", () => {
        const map: Map = ["###", "...", "#^#", "###"];

        assert.equal(countDistinctPositions(map), 3);
    });

    test("it works for a simple map, case 2", () => {
        const map: Map = ["###", "...", "#^#", "..."];

        assert.equal(countDistinctPositions(map), 3);
    });

    test("it works for a simple map, case 3", () => {
        const map: Map = ["######",
                          ".....#",
                          ".....",
                          ".^...#",
                          "######"];

        assert.equal(countDistinctPositions(map), 11);
    });

    test("it works for the example", () => {
        assert.equal(countDistinctPositions(example), 41);
    });

    test('it solves the exercise 1', () => {
        assert.equal(countDistinctPositions(exercise), 4890);
    })
});
