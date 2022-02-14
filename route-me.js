/** @param {import(".").NS} ns */
export async function main(ns) {
	//"w0r1d_d43m0n"
	var exes;
	//if (false) { brutessh(); ftpcrack(); relaysmtp(); httpworm(); sqlinject() } //So that the game can calculate the cost before I call them using text, else RAM cost bypass error
	let cTarget;
	if (ns.args.length > 0) { cTarget = ns.args[0]; } else { cTarget = "w0r1d_d43m0n"; }
	//exes = ["BruteSSH", "FTPCrack", "relaySMTP", "SQLInject", "HTTPWorm"];
	//ns.tprint(ns.args.length)
	let temp = ""
	let connectChain = [cTarget];
	ns.connect("home"); //I don't believe this is needed
	ns.tprint("cc.length: " + connectChain.length)
	while (connectChain[connectChain.length - 1] != "home") {
		ns.tprint("cc.length: " + connectChain.length)
		temp = ns.scan(connectChain[connectChain.length - 1]);
		connectChain.push(temp[0]);
	}
	ns.tprint("Routing: " + connectChain)
	for (let cc = connectChain.length - 1; cc >= 0; cc--) {
		ns.connect(connectChain[cc]);
		ns.tprint("Connecting you to " + cTarget + ": bouncing through " + connectChain[cc])
	}

	//for (let i = 0; i <= exes.length - 1; i++) { ns[exes[i].toLowerCase()](cTarget) }//Runs all EXEs you have against it to open ports
	//ns.nuke(cTarget);//Ghandi.jpeg
	//await ns.installBackdoor(); //Singularity required for this
}