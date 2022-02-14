/** @param {NS} ns **/
export async function main(ns) {
	for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
		while (ns.getServerMoneyAvailable("home") < ns.getPurchasedServerCost(Math.pow(2, ns.args[0]))) { await ns.asleep(1000); }
		ns.purchaseServer("qserv-" + i, Math.pow(2, ns.args[0]));
	}
}