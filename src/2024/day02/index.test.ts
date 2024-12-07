import { describe, test, mock } from "node:test";
import assert from "node:assert";

import { areTwoNumbersSave, isSafe, isSafeProblemDampener } from "./index";
import exercise from "./exercise";

describe("areTwoNumbersSave", () => {
    test("it returns false if the numbers are equal", () => {
        assert.strictEqual(areTwoNumbersSave([0, 0]), false);
        assert.strictEqual(areTwoNumbersSave([1, 1]), false);
        assert.strictEqual(areTwoNumbersSave([2, 2]), false);
    });

    test("it returns false if the numbers difference is more than 3", () => {
        assert.strictEqual(areTwoNumbersSave([0, 4]), false);
        assert.strictEqual(areTwoNumbersSave([1, 5]), false);
        assert.strictEqual(areTwoNumbersSave([2, 6]), false);

        assert.strictEqual(areTwoNumbersSave([4, 0]), false);
        assert.strictEqual(areTwoNumbersSave([5, 1]), false);
        assert.strictEqual(areTwoNumbersSave([6, 2]), false);
    });

    test("it returns true if the difference is 1, 2 or 3", () => {
        assert.strictEqual(areTwoNumbersSave([0, 1]), true);
        assert.strictEqual(areTwoNumbersSave([0, 2]), true);
        assert.strictEqual(areTwoNumbersSave([0, 3]), true);

        assert.strictEqual(areTwoNumbersSave([1, 2]), true);
        assert.strictEqual(areTwoNumbersSave([1, 3]), true);
        assert.strictEqual(areTwoNumbersSave([1, 4]), true);

        assert.strictEqual(areTwoNumbersSave([2, 1]), true);
        assert.strictEqual(areTwoNumbersSave([3, 1]), true);
        assert.strictEqual(areTwoNumbersSave([4, 1]), true);
    });
});

describe("is safe", () => {
    test("it applies the compare function and returns true if all the calls return true", () => {
        const returnTrue = () => true;
        assert.strictEqual(isSafe(returnTrue, [0, 1, 2, 3]), true);
    });

    test("it applies the compare function and returns false if any call returns false", () => {
        const returnFalse = () => false;
        assert.strictEqual(isSafe(returnFalse, [0, 1, 2, 3]), false);
    });

    test("returns true if all the numbers goes to the same direction", () => {
        const returnTrue = () => true;
        assert.strictEqual(isSafe(returnTrue, [0, 1, 2, 3]), true);
        assert.strictEqual(isSafe(returnTrue, [3, 2, 1, 0]), true);
    });

    test("returns false if one of the number goes to the opposite direction", () => {
        const returnTrue = () => true;
        assert.strictEqual(isSafe(returnTrue, [0, 1, 0, 3]), false);
        assert.strictEqual(isSafe(returnTrue, [3, 2, 3, 0]), false);
    });

    test("it solves the example", () => {
        assert.strictEqual(isSafe(areTwoNumbersSave, [7, 6, 4, 2, 1]), true);
        assert.strictEqual(isSafe(areTwoNumbersSave, [1, 2, 7, 8, 9]), false);
        assert.strictEqual(isSafe(areTwoNumbersSave, [9, 7, 6, 2, 1]), false);
        assert.strictEqual(isSafe(areTwoNumbersSave, [1, 3, 2, 4, 5]), false);
        assert.strictEqual(isSafe(areTwoNumbersSave, [8, 6, 4, 4, 1]), false);
        assert.strictEqual(isSafe(areTwoNumbersSave, [1, 3, 6, 7, 9]), true);
    });

    describe("isSafeProblemDampener", () => {
        test("it calls the provided function excluding one item each time", () => {
            const mockFn = mock.fn(() => true);

            isSafeProblemDampener(mockFn, [0, 1, 2, 3]);

            assert.strictEqual(mockFn.mock.calls.length, 4);
        });

        test("it returns false if all the calls return false", () => {
            const mockFn = mock.fn(() => false);

            assert.strictEqual(
                isSafeProblemDampener(mockFn, [0, 1, 2, 3]),
                false,
            );
        });

        test("it returns false if at least one of the calls returns true", () => {
            const mockFn = mock.fn(() => false);
            mockFn.mock.mockImplementationOnce(() => false);
            mockFn.mock.mockImplementationOnce(() => true);
            mockFn.mock.mockImplementationOnce(() => false);
            mockFn.mock.mockImplementationOnce(() => true);

            assert.strictEqual(
                isSafeProblemDampener(mockFn, [0, 1, 2, 3]),
                true,
            );
        });

        test("it solves the example", () => {
            const compareFn = (numbers: number[]) =>
                isSafe(areTwoNumbersSave, numbers);
            assert.strictEqual(
                isSafeProblemDampener(compareFn, [7, 6, 4, 2, 1]),
                true,
            );
            assert.strictEqual(
                isSafeProblemDampener(compareFn, [1, 2, 7, 8, 9]),
                false,
            );
            assert.strictEqual(
                isSafeProblemDampener(compareFn, [9, 7, 6, 2, 1]),
                false,
            );
            assert.strictEqual(
                isSafeProblemDampener(compareFn, [1, 3, 2, 4, 5]),
                true,
            );
            assert.strictEqual(
                isSafeProblemDampener(compareFn, [8, 6, 4, 4, 1]),
                true,
            );
            assert.strictEqual(
                isSafeProblemDampener(compareFn, [1, 3, 6, 7, 9]),
                true,
            );
        });
    });
});

test("exercise", () => {
    const compareFn = (numbers: number[]) => isSafe(areTwoNumbersSave, numbers);
    let sum = 0;
    for (let i = 0; i < exercise.length; i++) {
        const isRowSafe = isSafeProblemDampener(compareFn, exercise[i]);
        if (isRowSafe) {
            sum += 1;
        }
    }
    console.log("sum part 2", sum);
});
