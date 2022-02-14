/** @param {import(".").NS} ns */
export async function main(ns) {
	while (1) {
	ns.goToLocation("cia");
	ns.goToLocation("alpha ent.");
	await ns.asleep(100);
	}
}