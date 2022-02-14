/** @param {NS} ns **/
export async function main(ns) {
	let didBuy = ns.purchaseProgram(ns.args[0]);
	if (didBuy) { ns.toast(ns.args[0] + " Purchased.", "success", 5000); }
}