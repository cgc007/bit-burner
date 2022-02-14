/** @param {NS} ns **/
export async function main(ns) {
	if (ns.getServerMaxRam("kserv-" + ns.args[0]) < ns.args[1]) { //if desired memory > old server memory
		ns.killall("kserv-" + ns.args[0]);
		ns.deleteServer("kserv-" + ns.args[0]);
		ns.purchaseServer("qserv-" + ns.args[0], ns.args[1]);
	}
}