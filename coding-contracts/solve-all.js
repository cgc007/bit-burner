import { listCodingContracts } from "/coding-contracts/list.js";
import { hasSolver, solve } from "/coding-contracts/solvers.js";
import { tlog } from "/lib/logging.js";

/** @param {import(".").NS} ns */
export async function main(ns) {
    let contracts = listCodingContracts(ns);
    let solverless = new Set();

    for (let contract of contracts) {
        if (hasSolver(contract.type)) {
            let start = Date.now();
            let solution = solve(ns, contract.type, contract.data);
            let end = Date.now();

            if (end - start > 200)
                tlog(ns, "WARN", "Warning: calculating solution for '%s' data '%s' took over 200msec (%dmsec)",
                    contract.type, contract.data, end - start);

            tlog(ns, "INFO", "Attempting to solve contract %s @ %s: '%s' data '%s' solution: %s",
                contract.name, contract.node, contract.type, JSON.stringify(contract.data), JSON.stringify(solution));

            let accepted = ns.codingcontract.attempt(solution, contract.name, contract.node);

            if (!accepted) {
                tlog(ns, "ERROR", "Wrong solution for %s @ %s, type '%s', data %s",
                    contract.name, contract.node, contract.type, JSON.stringify(contract.data));
            }
            else {
                let rewardEntry = ns.getScriptLogs().reverse().find(entry => /Reward: (.+)/.test(entry));
                await ns.write("cc-rewards.log.txt", rewardEntry + "\n", "a");
                tlog(ns, "SUCCESS", "Was accepted, got %s", rewardEntry);
            }

            // Sleep a bit so we don't murder the UI
            await ns.sleep(200);
        } else {
            solverless.add(contract.type);
        }
    }

    for (let type of solverless)
        tlog(ns, "WARN", "No solver for contract type: %s", type);
}