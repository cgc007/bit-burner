/** @param {import(".").NS} ns */
export async function main(ns) {
	await ns.write("queue.txt", ns.args, "a");
}