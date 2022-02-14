/** @param {import(".").NS} ns */
//From: https://playgame.tips/bitburner-intermediate-auto-farm
export async function main(ns) {
	ns.disableLog("ALL");
	var files = ["weak.js", "grow.js", "hack.js"];
	await ns.write(files[0], "/** @param {import(".").NS} ns */export async function main(ns) { if (ns.args.length > 1 ) { await ns.sleep(ns.args[1]); } await ns.weaken(ns.args[0]); }", "w");
	await ns.write(files[1], "/** @param {import(".").NS} ns */export async function main(ns) { if (ns.args.length > 1 ) { await ns.sleep(ns.args[1]); } await ns.grow(ns.args[0]); }", "w");
	await ns.write(files[2], "/** @param {import(".").NS} ns */export async function main(ns) { if (ns.args.length > 1 ) { await ns.sleep(ns.args[1]); } await ns.hack(ns.args[0]); }", "w");
	var serverList; var targetList; var hostList; var exes; var temp; var totalRam;
	var cycle = [0, "─", "\\", "|", "/"]; var latest = [["-", "-"], ["-", "-"], ["-", "-"]];
	function playerMoney() { return ns.getServerMoneyAvailable("home"); };

	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }//Sorts nested arrays based on first number [[1,5],[4,2]], used on targetList and hostList

	async function scanServers() {//Puts all unique servers into serverList
		serverList = ns.scan("home"); let serverCount = [serverList.length, 0]; let depth = 0; let checked = 0; let scanIndex = 0;
		while (scanIndex <= serverCount[depth] - 1) {
			let results = ns.scan(serverList[checked]); checked++;
			for (let i = 0; i <= results.length - 1; i++) {
				if (results[i] != "home" && !serverList.includes(results[i])) {
					temp = ns.getPurchasedServers().includes(results[i])
					if (temp && pServers || !temp) {//If the server is player owned and they allowed, or if it's not player owned
						serverList.push(results[i]); serverCount[depth + 1]++
					}
				}
			}
			if (scanIndex == serverCount[depth] - 1) { scanIndex = 0; depth++; serverCount.push(0) } else { scanIndex++ };
		}
	}
	async function checkServers() {//Sorts servers into lists based on RAM and money/hack time ratio: hostList and targetList
		let backdoorThisLoop = false;
		targetList = []; hostList = [];
		totalRam = ns.getServerMaxRam("home");
		hostList.push([ns.getServerMaxRam("home"), "home"]); hostList = arraySort(hostList)//Pushes to home to hostList and sorts by amount of RAM
		for (let i = 0; i <= serverList.length - 1; i++) {
			let cTarget = serverList[i];
			if (ns.getServerMoneyAvailable(cTarget) > 0 || ns.getServerMaxRam(cTarget) > 2) {//Continues if server has either money or RAM, filters out servers like darkweb
				temp = ns.getPurchasedServers().includes(cTarget);
				if ((ns.getServerMaxRam(cTarget) > 2 && !hostList.includes(cTarget))) {//If server has RAM and is allowed -> hostList] 
					hostList.push([ns.getServerMaxRam(cTarget), cTarget]); hostList = arraySort(hostList)//Pushes to hostList and sorts by amount of RAM
				}
				await ns.scp(files, "home", cTarget);
			}
		}
	}

	async function hackAll() {//Dedicates high RAM servers to attack high profit per second servers
		for (let i = 0; i < hostList.length; i++) {
			;
			let hHost = hostList[i][1]; let hTarget = "joesguns";
			let freeRam = ns.getServerMaxRam(hHost) - ns.getServerUsedRam(hHost)
			if (hHost == "home") { // special processing for home server	
				if (ns.isRunning("gang-manager.js", hHost)) { freeRam -= ns.getScriptRam("gang-manager.js", hHost); }
				freeRam -= ns.getScriptRam("purchase-augments.js", hHost);
				freeRam -= ns.getScriptRam("work-faction-test.js", hHost);
			}
			if (freeRam >= 2) {
				let threads = Math.floor(freeRam / 1.75);
				ns.exec("weak.js", hHost, threads, hTarget);


				/*
				freeRam = ns.getServerMaxRam(hHost) - ns.getServerUsedRam(hHost)
				if (freeRam > 10.5) { i--; await ns.sleep(50); }; //reuse same host if still have ram avail
				*/
			}
		}
	}
	// Need to port this code out into its own module that i can call if i care.

	await scanServers();
	await checkServers();
	while (true) {
		await hackAll();
		await ns.asleep(50);
	}
}