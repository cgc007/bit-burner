import { getServerGraph } from "/lib/deepscan.js";

export function listCodingContracts(ns) {
    let scans = getServerGraph(ns, ns.getPurchasedServers());
    let contracts = [];
    for (let id in scans) {
        for (let contract of ns.ls(id, ".cct"))
            contracts.push({
                node: id,
                name: contract,
                type: ns.codingcontract.getContractType(contract, id),
                data: ns.codingcontract.getData(contract, id)
            });
    }
    
    return contracts;
}

export async function main(ns) {
    let contracts = listCodingContracts(ns);

    contracts.sort((c1, c2) => {
        if (c1.type < c2.type)
            return -1;
        if (c1.type == c2.type) {
            if (c1.node < c2.node)
                return -1;
            if (c1.node == c2.node) {
                if (c1.name < c2.name)
                    return -1;
                if (c1.name == c2.name)
                    return 0;
                return 1;
            }
            return 1;
        }
        return 1;
    });

    for (let contract of contracts)
        ns.tprint(sprintf("%s/%s: %s (%d), %s", contract.node, contract.name, contract.type,
            ns.codingcontract.getNumTriesRemaining(contract.name, contract.node),
            JSON.stringify(ns.codingcontract.getData(contract.name, contract.node))));
}