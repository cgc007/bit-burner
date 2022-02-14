/** @param {import(".").NS} ns */
export async function main(ns) {
	ns.tprint(ns.getServer(ns.args[0]))
}