/** @param {import(".").NS} ns */
export async function main(ns) {
	var files = ["weak3.js", "grow3.js", "hack3.js"];//No touching, unless you understand everything here
	await ns.write(files[0], "/** @param {import(".").NS} ns */export async function main(ns) { if (ns.args.length > 1 ) { await ns.sleep(ns.args[1]); } await ns.weaken(ns.args[0]); }", "w"); 
	await ns.write(files[1], "/** @param {import(".").NS} ns */export async function main(ns) { if (ns.args.length > 1 ) { await ns.sleep(ns.args[1]); } await ns.grow(ns.args[0]); }", "w"); 
	await ns.write(files[2], "/** @param {import(".").NS} ns */export async function main(ns) { if (ns.args.length > 1 ) { await ns.sleep(ns.args[1]); } await ns.hack(ns.args[0]); }", "w");
}