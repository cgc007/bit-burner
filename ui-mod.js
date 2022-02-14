/** @param {NS} ns **/
export async function main(ns) {
	ns.kill("custom-stats.js", "home");
	ns.exec("custom-stats.js", "home", 1)
}