import { solve as solveIV } from "/coding-contracts/solvers/algorithmic-stock-trader-iv.js";

export function solve(ns, data) {
    // eg. [137,187,12,95,36,105,67,111,142,129,28,83,38,113,31] = 215
    
    return solveIV(ns, [2, data]);
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}