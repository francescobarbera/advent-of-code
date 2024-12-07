import { describe, test } from "node:test";
import assert from "node:assert";
import { Map, countXmas, exercise1Patterns, exercise2Patterns } from "./index";
import input from "./exercise";
import example from "./example";

describe("countXmas", () => {
    test("it returns 1 if xmas is horizontal from left to right", () => {
        const map: Map = ["........", "....XMAS"];
        assert.strictEqual(countXmas(map, exercise1Patterns, 4), 1);
    });

    test("it returns 1 if xmas is horizontal from left to right", () => {
        const map: Map = ["....XMAS"];
        assert.strictEqual(countXmas(map, exercise1Patterns, 4), 1);
    });

    test("it returns 1 if xmas is horizontal from left to right", () => {
        const map: Map = ["XMAS"];
        assert.strictEqual(countXmas(map, exercise1Patterns, 4), 1);
    });

    test("it returns 1 if xmas is horizontal from left to right", () => {
        const map: Map = ["XMAS",];
        assert.strictEqual(countXmas(map, exercise1Patterns, 4), 1);
    });

    test("it returns 1 if xmas is horizontal from right to left", () => {
        const map: Map = ["SAMX",];
        assert.strictEqual(countXmas(map, exercise1Patterns, 4), 1);
    });

    test("it returns 1 if xmas is oblique from top to bottom, from left to right", () => {
        const map: Map = ["X...", ".M..", "..A.", "...S"];
        assert.strictEqual(countXmas(map, exercise1Patterns, 4), 1);
    });

    test("it returns 1 if xmas is oblique from bottom to top, from rigth to left", () => {
        const map: Map = ["S...", ".A..", "..M.", "...X"];
        assert.strictEqual(countXmas(map, exercise1Patterns, 4), 1);
    });

    test("it returns 1 if xmas is oblique from top to bottom, from rigth to left", () => {
        const map: Map = ["...X", "..M.", ".A..", "S..."];
        assert.strictEqual(countXmas(map, exercise1Patterns, 4), 1);
    });

    test("it returns 1 if xmas is oblique from bottom to top, from left to right", () => {
        const map: Map = ["...S", "..A.", ".M..", "X..."];
        assert.strictEqual(countXmas(map, exercise1Patterns, 4), 1);
    });

    test("it founds all the occurencies in the example 1", () => {
        assert.strictEqual(countXmas(example, exercise1Patterns, 4), 18);
    });

    test("it founds all the occurencies in the example 2", () => {
        assert.strictEqual(countXmas(example, exercise2Patterns, 3), 9);
    });

    test("input1", () => {
        console.log(countXmas(input, exercise1Patterns, 4));
    });

    test("input2", () => {
        console.log(countXmas(input, exercise2Patterns, 3));
    });
});
