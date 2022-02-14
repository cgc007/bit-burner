/** @param {NS} ns **/
export async function main(ns) {
	//ns.tprint("#".PadEnd(10,"-") + "Ram".PadEnd(10,"-") + "Ramx25".PadEnd(10,"-") + "$".PadEnd(10,"-") + "$x25".PadEnd(10,"-"));
	const colSpace = 9;
	ns.disableLog("ALL");
	ns.clearLog();
	ns.print("#".padEnd(3) +
		"Ram".padEnd(colSpace) +
		"Ramx25".padEnd(colSpace) +
		"$".padEnd(colSpace) +
		"$x25".padEnd(colSpace) +
		"$/Gb");
	for (let i = 1; i <= 20; i++) {
		let serverCost = ns.getPurchasedServerCost(Math.pow(2, i));
		ns.print(ns.nFormat(i, "0").padEnd(3) +
			ns.nFormat(Math.pow(2, i) * 1e9, '0.00b').padEnd(colSpace) +
			ns.nFormat(Math.pow(2, i) * 25e9, '0.00b').padEnd(colSpace) +
			ns.nFormat(serverCost, '$0.00a').padEnd(colSpace) +
			ns.nFormat(serverCost * 25, '$0.00a').padEnd(colSpace) +
			ns.nFormat(serverCost / Math.pow(2, i), '$0.00a'));
	}

	ns.tail();
}