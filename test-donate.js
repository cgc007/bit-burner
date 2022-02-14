/** @param {import(".").NS} ns */
export async function main(ns) {
	const factToDonate = "Daedalus"
	let moneyToDonate = 1e6;
	for (moneyToDonate; moneyToDonate <= 1e9; moneyToDonate *= 10) {
		let currentFactionRep = ns.getFactionRep(factToDonate);
		if (ns.donateToFaction(factToDonate, moneyToDonate)) {
			let deltaFactionRep = ns.getFactionRep(factToDonate) - currentFactionRep;
			ns.tprint(`Donated ${ns.nFormat(moneyToDonate, "$0.00a")} to ${factToDonate} and gained ${ns.nFormat(deltaFactionRep, "0.00")} reputation for a ratio of ${ns.nFormat(deltaFactionRep / moneyToDonate, "0.0000000000")}`)
		}
	}
}