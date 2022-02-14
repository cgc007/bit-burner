/** @param {import(".").NS} ns */
export async function main(ns) {
	let me = ns.getPlayer()
	ns.tprint(me)
	me.money *= me.money;
	for (let i = 0; i < me.length; i++) {
		ns.tprint(i + ": " + me[0])
	}
}