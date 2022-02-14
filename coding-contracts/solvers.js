import { solve as algoStockI } from "/coding-contracts/solvers/algorithmic-stock-trader-i.js";
import { solve as algoStockII } from "/coding-contracts/solvers/algorithmic-stock-trader-ii.js";
import { solve as algoStockIII } from "/coding-contracts/solvers/algorithmic-stock-trader-iii.js";
import { solve as algoStockIV } from "/coding-contracts/solvers/algorithmic-stock-trader-iv.js";
import { solve as arrayJumping } from "/coding-contracts/solvers/array-jumping-game.js";
import { solve as mathExpr } from "/coding-contracts/solvers/find-all-valid-math-expressions.js";
import { solve as primeFactor } from "/coding-contracts/solvers/find-largest-prime-factor.js";
import { solve as ipAddresses } from "/coding-contracts/solvers/generate-ip-addresses.js";
import { solve as mergeIntervals } from "/coding-contracts/solvers/merge-overlapping-intervals.js";
import { solve as triangle } from "/coding-contracts/solvers/minimum-path-sum-in-a-triangle.js";
import { solve as sanitizeParens } from "/coding-contracts/solvers/sanitize-parentheses-in-expression.js";
import { solve as spiralize } from "/coding-contracts/solvers/spiralize-matrix.js";
import { solve as subarraySum } from "/coding-contracts/solvers/subarray-with-maximum-sum.js";
import { solve as totalWays } from "/coding-contracts/solvers/total-ways-to-sum.js";
import { solve as uniqPathsI } from "/coding-contracts/solvers/unique-paths-in-a-grid-i.js";
import { solve as uniqPathsII } from "/coding-contracts/solvers/unique-paths-in-a-grid-ii.js";

const solverByType = {
    "Find Largest Prime Factor": primeFactor,
    "Subarray with Maximum Sum": subarraySum,
    "Total Ways to Sum": totalWays,
    "Spiralize Matrix": spiralize,
    "Array Jumping Game": arrayJumping,
    "Merge Overlapping Intervals": mergeIntervals,
    "Generate IP Addresses": ipAddresses,
    "Algorithmic Stock Trader I": algoStockI,
    "Algorithmic Stock Trader II": algoStockII,
    "Algorithmic Stock Trader III": algoStockIII,
    "Algorithmic Stock Trader IV": algoStockIV,
    "Minimum Path Sum in a Triangle": triangle,
    "Unique Paths in a Grid I": uniqPathsI,
    "Unique Paths in a Grid II": uniqPathsII,
    "Sanitize Parentheses in Expression": sanitizeParens,
    "Find All Valid Math Expressions": mathExpr,
};

export function hasSolver(type) {
    return solverByType[type] != null;
}

export function solve(ns, type, data) {
    //ns.tprint(sprintf("solvers.solve(%s, %s)", JSON.stringify(type), JSON.stringify(data)));
    let solver = solverByType[type];
    if (!solver)
        throw new Error(sprintf("No solver for type: %s", type));

    return solver(ns, data);
}

export async function main(ns) {
    let name = ns.args[0];
    let node = ns.args[1];

    let type = ns.codingcontract.getContractType(name, node);
    let data = ns.codingcontract.getData(name, node);

    if (!hasSolver(type)) {
        ns.tprint(sprintf("No solver for type: %s", type));
    } else {
        let solution = solve(ns, type, data);

        ns.tprint(sprintf("Contract %s @ %s: '%s' data %s\nSolution: %s",
            name, node, type, JSON.stringify(data), JSON.stringify(solution)));
    }
}