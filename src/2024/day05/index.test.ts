import { describe, test } from "node:test";
import assert from "node:assert";

import {
    applyRule,
    checkSequence,
    getMiddle,
    PagesSequence,
    reorderPagesSequence,
    Rule,
    sumMiddleOfValidPagesSequences,
    sumMiddleOfInvalidPagesSequences,
} from "./index";
import {
    rules as example1Rules,
    pagesSequences as example1PagesSequences,
} from "./example";
import {
    rules as inputRules,
    pagesSequences as inputPagesSequences,
} from "./input";

describe("applyRule", () => {
    describe("if both the numbers of the rule are in the pagesSequence", () => {
        test("it return true if the two numbers are in the correct order", () => {
            assert.equal(applyRule([1, 2], [1, 2]), true);
            assert.equal(applyRule([1, 2], [1, 3, 2]), true);
            assert.equal(applyRule([1, 2], [1, 4, 6, 2]), true);
        });

        test("it returns false if the order is not correct", () => {
            assert.equal(applyRule([1, 2], [2, 1]), false);
            assert.equal(applyRule([1, 2], [2, 6, 1]), false);
            assert.equal(applyRule([1, 2], [3, 2, 1]), false);
            assert.equal(applyRule([1, 2], [1, 2, 1]), false);
        });
    });

    describe("if the numbers of the rule are not in the pagesSequence", () => {
        test("it returns true", () => {
            assert.equal(applyRule([1, 2], [3, 4, 5]), true);
            assert.equal(applyRule([1, 2], [3, 4, 5, 6, 7, 8, 9]), true);
        });
    });

    describe("if only one of the numbers of the rule is in the pagesSequence", () => {
        test("it returns true", () => {
            assert.equal(applyRule([1, 2], [1, 4, 7]), true);
            assert.equal(applyRule([1, 2], [2, 3, 4]), true);
        });
    });
});

describe("checkSequence", () => {
    describe("it applies all the rules to the the sequence and", () => {
        test("it returns true if all the rules pass", () => {
            assert.equal(
                checkSequence(
                    [1, 2, 3, 4, 5],
                    [
                        [1, 2],
                        [2, 3],
                        [3, 4],
                        [4, 5],
                    ],
                ),
                true,
            );
        });

        test("it returns false if one rule does not pass", () => {
            assert.equal(
                checkSequence(
                    [1, 2, 3, 4, 5],
                    [
                        [1, 2],
                        [2, 3],
                        [4, 3],
                        [4, 5],
                    ],
                ),
                false,
            );
        });
    });
});

describe("getMiddle", () => {
    test("it returns the number in the middle", () => {
        assert.equal(getMiddle([1, 2, 3]), 2);
        assert.equal(getMiddle([1, 2, 3, 4, 5]), 3);
    });
});

describe("sumMiddleOfValidPagesSequences", () => {
    test("exercise 1", () => {
        assert.equal(
            sumMiddleOfValidPagesSequences(
                example1Rules,
                example1PagesSequences,
            ),
            143,
        );
    });

    test("input 1", () => {
        console.log(
            "sumMiddleOfValidPagesSequences",
            sumMiddleOfValidPagesSequences(inputRules, inputPagesSequences),
        );
    });
});

describe("sumMiddleOfInvalidPagesSequences", () => {
    test("exercise 1", () => {
        assert.equal(
            sumMiddleOfInvalidPagesSequences(
                example1Rules,
                example1PagesSequences,
            ),
            123,
        );
    });

    test("input 1", () => {
        console.log(
            "sumMiddleOfInvalidPagesSequences",
            sumMiddleOfInvalidPagesSequences(inputRules, inputPagesSequences),
        );
    });
});

describe("reorderPagesSequence", () => {
    test("it reorder one sequence of two numbers", () => {
        assert.deepEqual(reorderPagesSequence([[2, 1]], [1, 2]), [2, 1]);
    });

    test("it reorder one sequence of three numbers", () => {
        assert.deepEqual(reorderPagesSequence([[2, 1]], [1, 2, 3]), [2, 1, 3]);
    });

    test("it reorder one sequence with many problems", () => {
        const rules: Rule[] = [
            [1, 2],
            [4, 1],
        ];
        const pagesSequences: PagesSequence = [2, 1, 2, 3, 4, 5];
        assert.deepEqual(
            reorderPagesSequence(rules, pagesSequences),
            [1, 2, 2, 3, 4, 5],
        );
    });
});
