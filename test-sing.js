/** @param {NS} ns **/
export async function main(ns) {
	ns.commitCrime("Rob Store");
	while (ns.isBusy()) {
		await ns.asleep(1000)
	}
}