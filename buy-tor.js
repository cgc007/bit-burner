/** @param {NS} ns **/
export async function main(ns) {
	let didBuy = ns.purchaseTor();
	if (didBuy) { ns.toast("TOR Router Purchased.", "success", 5000); }
}