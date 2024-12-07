import { pagesSequences } from "./input";

export type Rule = [number, number];
export type PagesSequence = number[];

export function applyRule(rule: Rule, pagesSequence: PagesSequence) {
    return !pagesSequence.some(
        (page, i) =>
            page === rule[1] && pagesSequence.slice(i + 1).includes(rule[0]),
    );
}

export function checkSequence(pagesSequence: PagesSequence, rules: Rule[]) {
    return rules.every((rule) => applyRule(rule, pagesSequence));
}

export function getMiddle(pageSequence: PagesSequence | null) {
    if (pageSequence === null) {
        return 0;
    }

    return pageSequence[Math.floor(pageSequence.length / 2)];
}

export function sumMiddleOfValidPagesSequences(
    rules: Rule[],
    pegesSequences: PagesSequence[],
): number {
    return pegesSequences
        .filter((pagesSequence) => checkSequence(pagesSequence, rules))
        .map(getMiddle)
        .reduce((acc, curr) => acc + curr, 0);
}

export function sumMiddleOfInvalidPagesSequences(
    rules: Rule[],
    pegesSequences: PagesSequence[],
): number {
    return pegesSequences
        .filter((pagesSequence) => !checkSequence(pagesSequence, rules))
        .map((pagesSequence) => reorderPagesSequence(rules, pagesSequence))
        .map(getMiddle)
        .reduce((acc, curr) => acc + curr, 0);
}

export function reorderPagesSequence(
    rules: Rule[],
    pagesSequence: PagesSequence,
): PagesSequence | null {
    type IndexRule = {
        [key: number]: Set<number>;
    };

    function indexRules(rules: Rule[]) {
        const result: IndexRule = {};

        for (const rule of rules) {
            const [left, right] = rule;

            if (result[left] === undefined) {
                result[left] = new Set();
            }

            result[left].add(right);
        }

        return result;
    }

    function fixOrder(newPagesSequence: PagesSequence, rulesIndex: IndexRule) {
        return newPagesSequence.sort((a, b) => {
            if (rulesIndex[a]?.has(b)) return -1;
            if (rulesIndex[b]?.has(a)) return 1;
            return 0;
        });
    }

    return fixOrder(pagesSequence, indexRules(rules));
}
