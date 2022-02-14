/** @param {import(".").NS} ns */
//From: https://playgame.tips/bitburner-intermediate-auto-farm
export async function main(ns) {
	let backdoorServerList = ["fulcrumassets", "megacorp", "nwo", "blade", "kuai-gong", "ecorp", "fulcrumtech",
		"clarkinc", "omnitek", "powerhouse-fitness", "stormtech", "b-and-a", "infocomm", "4sigma", "The-Cave",
		"taiyang-digital", "defcomm", "omnia", "icarus", "aerocorp", "univ-energy", "vitalife", "deltaone", "nova-med",
		"zeus-med", "galactic-cyber", "microdyne", "solaris", "global-pharm", "helios", "applied-energetics", "titan-labs",
		"unitalife", "zb-def", "snap-fitness", "zb-institute", "lexo-corp", "syscore", "alpha-ent", "run4theh111z",
		"millenium-fitness", "rho-construction", ".", "summit-uni", "catalyst", "aevum-police", "rothman-uni", "netlink",
		"I.I.I.I", "comptek", "the-hub", "johnson-ortho", "crush-fitness", "avmnite-02h", "omega-net", "silver-helix",
		"iron-gym", "phantasy", "max-hardware", "zer0", "CSEC", "neo-net", "harakiri-sushi", "hong-fang-tea", "nectar-net",
		"joesguns", "sigma-cosmetics", "darkweb", "foodnstuff", "n00dles", "w0r1d_d43m0n"]

	/*["fulcrumassets", "megacorp", "nwo", "ecorp", "fulcrumtech", "clarkinc",
		"omnitek", "powerhouse-fitness", "stormtech", "b-and-a", "4sigma", "run4theh111z",
		"I.I.I.I", "avmnite-02h", "CSEC", "n00dles"] */
	
	ns.disableLog("ALL"); ns.clearLog();//Visual clarity
	await ns.write("farmlog.txt", "", "w");
	//Welcome to the Auto Farm part 2: Electric Boogaloo
	//This script is a little more complicated to explain easily, it dedicates high RAM servers to attack high profit servers
	//This is also set and forget, your EXEs and hacking level are reacquired each second, so new servers are added without needing to reboot it
	//Well I hope this brings you ideas, knowledge and or profits :D
	/* Old File Creation Method
	var files = ["weak.script", "grow.script", "hack.script"];//No touching, unless you understand everything here
	await ns.write(files[0], "weaken(args)", "w"); await ns.write(files[1], "grow(args)", "w"); await ns.write(files[2], "hack(args)", "w");
	*/
	//New File Creation Method
	var files = ["weak.js", "grow.js", "hack.js"];
	await ns.write(files[0], "/** @param {import(".").NS} ns */export async function main(ns) { if (ns.args.length > 1 ) { await ns.sleep(ns.args[1]); } await ns.weaken(ns.args[0]); }", "w");
	await ns.write(files[1], "/** @param {import(".").NS} ns */export async function main(ns) { if (ns.args.length > 1 ) { await ns.sleep(ns.args[1]); } await ns.grow(ns.args[0]); }", "w");
	await ns.write(files[2], "/** @param {import(".").NS} ns */export async function main(ns) { if (ns.args.length > 1 ) { await ns.sleep(ns.args[1]); } await ns.hack(ns.args[0]); }", "w");
	var serverList; var targetList; var hostList; var exes; var temp; var totalRam;
	var cycle = [0, "─", "\\", "|", "/"]; var latest = [["-", "-"], ["-", "-"], ["-", "-"]];
	if (false) { brutessh(); ftpcrack(); relaysmtp(); httpworm(); sqlinject() } //So that the game can calculate the cost before I call them using text, else RAM cost bypass error
	if (ns.args.length == 0) {
		var pServers = await ns.prompt("Use player servers as hosts?")//Let player servers act as hosts?
		var manager = await ns.prompt("Activate Hacknet Manager?"); //Activate Hacknet manager?
		var serverMan = await ns.prompt("Activate Server Purchasing Manager?"); //Activate Server Purchasing manager?
	} else if (ns.args[0] == 0) {
		var pServers = true
		var manager = false
		var serverMan = false
	} else {
		var pServers = false
		var manager = false
		var serverMan = false
	}
	var contractLocation = "";
	function playerMoney() { return ns.getServerMoneyAvailable("home"); };
	ns.tail(); // Open Tail window for Dashboard
	//var serverCounter = ns.getPurchasedServers().length;
	async function scanExes() {
		exes = ["BruteSSH", "FTPCrack", "relaySMTP", "SQLInject", "HTTPWorm"];
		//This will buy files when we have BN4
		//Buy TOR if not owned
		if (!ns.getPlayer().tor && playerMoney() > 2e5) { ns.exec("buy-tor.js", "home", 1); };
		//Buy Programs if not owned
		if (playerMoney() > 5e5 && !ns.fileExists("BruteSSH.exe")) { ns.exec("buy-program.js", "home", 1, "BruteSSH.exe"); }
		if (playerMoney() > 1.5e6 && !ns.fileExists("FTPCrack.exe")) { ns.exec("buy-program.js", "home", 1, "FTPCrack.exe"); }
		if (playerMoney() > 5e6 && !ns.fileExists("relaySMTP.exe")) { ns.exec("buy-program.js", "home", 1, "relaySMTP.exe"); }
		if (playerMoney() > 30e6 && !ns.fileExists("HTTPWorm.exe")) { ns.exec("buy-program.js", "home", 1, "HTTPWorm.exe"); }
		if (playerMoney() > 250e6 && !ns.fileExists("SQLInject.exe")) { ns.exec("buy-program.js", "home", 1, "SQLInject.exe"); }
		if (playerMoney() > 5e5 && !ns.fileExists("DeepscanV1.exe")) { ns.exec("buy-program.js", "home", 1, "DeepscanV1.exe"); }
		if (playerMoney() > 25e6 && !ns.fileExists("DeepscanV2.exe")) { ns.exec("buy-program.js", "home", 1, "DeepscanV2.exe"); }
		if (playerMoney() > 1e6 && !ns.fileExists("AutoLink.exe")) { ns.exec("buy-program.js", "home", 1, "AutoLink.exe"); }

		for (let i = 0; i <= exes.length - 1; i++) {
			if (!ns.fileExists(exes[i] + ".exe")) {
				exes.splice(i, 1);
				i--
			}
		}//Removes EXEs from list if you don't have them
	}
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }//Sorts nested arrays based on first number [[1,5],[4,2]], used on targetList and hostList
	function logBalance(server) {//For the balance section in display
		return [ns.nFormat(ns.getServerMoneyAvailable(server), '0a')] + " / " + [ns.nFormat(ns.getServerMaxMoney(server), '0a')]
			+ " : " + ns.nFormat(ns.getServerMoneyAvailable(server) / ns.getServerMaxMoney(server), '0%')
	}
	async function log() {//The display
		if (cycle[0] >= 4) { cycle[0] = 0 }; cycle[0]++;//Speen
		ns.clearLog();
		ns.print("╔═══╦═╣ HOST ╠════════════════╣ TARGET ╠═╗");
		ns.print("║ G ║ " + latest[0][0] + latest[0][1].padStart(34 - latest[0][0].length) + " ║")
		ns.print("║ W ║ " + latest[1][0] + latest[1][1].padStart(34 - latest[1][0].length) + " ║")
		ns.print("║ H ║ " + latest[2][0] + latest[2][1].padStart(34 - latest[2][0].length) + " ║")
		ns.print("║ " + cycle[cycle[0]] + " ╠════════════════════════════════════╣")

		let maxShown = Math.min(targetList.length, 10);
		ns.print("╠═══╝ Prioritized Balance                ║")
		//temp = [targetList[0][1], targetList[1][1], targetList[2][1]];
		temp = [];
		for (let ik = 0; ik < maxShown; ik++) {
			temp.push(targetList[ik][1]);
		}
		for (let ix = 0; ix < maxShown; ix++) {

			ns.print("║ > " + temp[ix] + logBalance(temp[ix]).padStart(36 - temp[ix].length) + " ║")
		}

		ns.print("╠═════Total Ram " + ns.nFormat(totalRam * 1000000000, '0.00b').padEnd(19, "═") + ns.nFormat(loopNum, "0").padStart(5, "═") + "═╣")
		ns.print("║ EXE " + exes.length + "/5 ║ HOSTS " + ns.nFormat(hostList.length, "0").padEnd(2) + " ║ TARGETS " + ns.nFormat(targetList.length, "0").padEnd(2) + "        ║")
		if (contractLocation.length > 0) { ns.print("╠══════╣ " + contractLocation + " ╠".padEnd(33 - contractLocation.length - 1, "═") + "╣") }
		if (manager) {
			ns.print("╚══════╣ Managing " + ns.hacknet.numNodes() + " HNet Nodes ╠".padEnd(22, "═") + "╝")
		} else {
			ns.print("╚════════════════════════════════════════╝")
		}
		//log width = 42 chars

	}
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
				if (ns.getServerNumPortsRequired(cTarget) <= exes.length || ns.hasRootAccess(cTarget)) {//If server can be broken into OR have root already
					for (let i = 0; i <= exes.length - 1; i++) { ns[exes[i].toLowerCase()](cTarget) }//Runs all EXEs you have against it to open ports
					ns.nuke(cTarget);//Ghandi.jpeg

					//ns.exec("install-backdoor.js","home",1,cTarget); //Singularity Needed for this
					temp = [Math.floor([ns.getServerMaxMoney(cTarget) * 1000 / ns.getServerMinSecurityLevel(cTarget)] / ns.getHackTime(cTarget)), cTarget];
					if (ns.getServerMoneyAvailable(cTarget) != 0 && !targetList.includes(cTarget) && ns.getServerRequiredHackingLevel(cTarget) <= ns.getHackingLevel()) {//And if server has money -> targetList, we only want servers with money that we can hack
						targetList.push(temp); targetList = arraySort(targetList);//Pushes to list and sorts list by profit
					}
					temp = ns.getPurchasedServers().includes(cTarget);

					if ((ns.getServerMaxRam(cTarget) > 2 && !hostList.includes(cTarget)) && (temp && pServers || !temp) && !cTarget.includes("hacknet-node")) {//If server has RAM and is allowed -> hostList] 
						hostList.push([ns.getServerMaxRam(cTarget), cTarget]); hostList = arraySort(hostList)//Pushes to hostList and sorts by amount of RAM
						totalRam += ns.getServerMaxRam(cTarget);
					}
					await ns.scp(files, "home", cTarget);
					if (backdoorServerList.includes(cTarget) && ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(cTarget) && !ns.getServer(cTarget).backdoorInstalled && !backdoorThisLoop) {

						let backdoorRam = ns.getScriptRam("install-backdoor.js", "home");
						if (backdoorRam > 0 && backdoorRam < (ns.getServerMaxRam("home") - ns.getServerUsedRam("home"))) {
							ns.exec("install-backdoor.js", "home", 1, cTarget);
						} else {
							backdoorThisLoop = true;
						}

						/*
						await ns.scp("install-backdoor.js", "home", cTarget);
						let connectChain = [cTarget];
						//ns.connect("home"); //I don't believe this is needed
						
						while (connectChain[connectChain.length - 1] != "home") {
							temp = ns.scan(connectChain[connectChain.length - 1]);
							connectChain.push(temp[0]);
						}
						for (let cc = connectChain.length - 1; cc >= 0; cc--) {
							ns.connect(connectChain[cc]);
							//ns.tprint("Backdooring " + cTarget + ": connecting to " + connectChain[cc])
						}
						await ns.installBackdoor();
						//if (ns.exec("install-backdoor.js", cTarget, 1)) {
						ns.toast(cTarget + " successfully backdoored.", "success", 5000)
						let position = backdoorServerList.indexOf(cTarget);
						if (~position) { backdoorServerList.splice(position, 1); }
						ns.connect("home");
						//}
						*/
					}
				}
			}
		}
	}
	async function hackAll() {//Dedicates high RAM servers to attack high profit per second servers
		let tarIndex = 0;
		for (let i = 0; i <= hostList.length - 1; i++) {
			if (tarIndex > Math.min(targetList.length - 1, 10)) { tarIndex = 0; };
			let hHost = hostList[i][1]; let hTarget = targetList[tarIndex][1];
			let freeRam = ns.getServerMaxRam(hHost) - ns.getServerUsedRam(hHost)
			if (hHost == "home") { // special processing for home server	
				if (ns.isRunning("gang-manager.js", hHost)) { freeRam -= ns.getScriptRam("gang-manager.js", hHost); }
				freeRam -= ns.getScriptRam("purchase-augments.js", hHost);
				freeRam -= ns.getScriptRam("work-faction-test.js", hHost);
			}
			if (freeRam >= 2) {
				let threads = Math.floor(freeRam / 1.75); let bThreads = 0;
				if (ns.getServerSecurityLevel(hTarget) > ns.getServerMinSecurityLevel(hTarget) + 5) {//Security target here
					latest[1][0] = hHost; latest[1][1] = hTarget;
					let weakThreads = (ns.getServerSecurityLevel(hTarget) - ns.getServerMinSecurityLevel(hTarget)) / 0.05
					if (weakThreads < threads) { //We have more threads available than needed to drop to minimum sec
						ns.exec("weak.js", hHost, weakThreads, hTarget);
						let nThreads = threads - weakThreads;
						if (nThreads > 1) {
							let gThreads = Math.max(Math.floor(0.92 * nThreads), 1);
							gThreads = Math.ceil(
								Math.min(
									ns.growthAnalyze(
										hTarget,
										Math.max(
											ns.getServerMaxMoney(hTarget) / (ns.getServerMoneyAvailable(hTarget) + 1)
											, 1)
									),
									gThreads));
							let wThreads = Math.max(gThreads * 0.004, 1);
							ns.exec("weak.js", hHost, wThreads, hTarget);
							if (gThreads > 0) { ns.exec("grow.js", hHost, gThreads, hTarget); }
							/*if (nThreads - gThreads - wThreads > 0) {
								let gTime = ns.getGrowTime(hTarget);
								let wTime = ns.getWeakenTime(hTarget);
								let hTime = ns.getHackTime(hTarget);
								let delayTime = Math.max(gTime, wTime) - hTime + 200;
								ns.exec("hack.js", hHost, nThreads - gThreads, hTarget, delayTime);
							}*/
						}
						tarIndex++
					} else { ns.exec("weak.js", hHost, threads, hTarget); } //if we need to weaken this target more, keep the target the same for the next one
				} else if (ns.getServerMoneyAvailable(hTarget) < ns.getServerMaxMoney(hTarget) * .75) {//Server money target here
					latest[0][0] = hHost; latest[0][1] = hTarget;
					ns.exec("weak.js", hHost, Math.ceil(0.08 * threads), hTarget);
					ns.exec("grow.js", hHost, Math.max(Math.floor(0.92 * threads), 1), hTarget);
					tarIndex++
				} else {
					if (freeRam >= 1.75 * 3) { //New Method
						latest[2][0] = hHost; latest[2][1] = hTarget;
						let tTake = .5; // percentage to take per round of the hack
						let hThreads = Math.floor(ns.hackAnalyzeThreads(hTarget, ns.getServerMaxMoney(hTarget) * tTake));
						//ns.tprint(hThreads + " threads to pull " + ns.nFormat(ns.getServerMaxMoney(hTarget) * tTake, "$0.00a") + " from " + hTarget);
						let gThreads = Math.ceil(ns.growthAnalyze(hTarget, 1 / tTake + .15)); //Grow money lost back + 15%
						//ns.tprint(gThreads + " to regrow to 100%")
						let wThreads = Math.ceil((gThreads / 25) + (hThreads / 12.5));
						//ns.tprint(wThreads + " to weaken back to min")
						let aThreads = hThreads + gThreads + wThreads
						//ns.tprint(aThreads + " total Threads needed, " + aThreads * 1.75 + " GB ram needed")
						let aRam = aThreads * 1.75
						if (aRam > freeRam) { //if ram needed > free ram
							let scaleF = freeRam / aRam;
							gThreads = Math.max(Math.floor(gThreads * scaleF), 1);
							hThreads = Math.max(Math.floor(hThreads * scaleF), 1);
							wThreads = Math.max(Math.ceil(wThreads * scaleF), 1);

						}
						let gTime = ns.getGrowTime(hTarget);
						let wTime = ns.getWeakenTime(hTarget);
						let hTime = ns.getHackTime(hTarget);
						let pTime = 200; //pad of x ms for asleep
						//ns.tprint("wTime: " + wTime);
						//ns.tprint("gTime: " + gTime);
						//ns.tprint("hTime: " + hTime);

						ns.exec("weak.js", hHost, wThreads, hTarget);
						ns.exec("grow.js", hHost, gThreads, hTarget, (wTime - gTime - pTime));  //sleep to sync time between weaken and grow
						ns.exec("hack.js", hHost, Math.max(hThreads, 1), hTarget, (wTime - hTime - (pTime * 2)));  //sleep to sync time between weak and hack
						await ns.write("farmlog.txt", hHost + "->" + hTarget + " [W:" + wThreads + "][G:" + gThreads + "][H:" + hThreads + "][T:" + wTime + "]\n", "a");
						tarIndex++


					} else {
						while (parseFloat(ns.hackAnalyze(hTarget)) * threads > .1) { threads--; bThreads++ }//Hack limit here
						latest[2][0] = hHost; latest[2][1] = hTarget;
						ns.exec("hack.js", hHost, Math.max(threads, 1), hTarget);
						if (bThreads > 0) { ns.exec("weak.js", hHost, bThreads, hTarget) }
						tarIndex++
					}
				}
			}
			/*
			freeRam = ns.getServerMaxRam(hHost) - ns.getServerUsedRam(hHost)
			if (freeRam > 10.5) { i--; await ns.sleep(50); }; //reuse same host if still have ram avail
			*/
		}
	}
	// Need to port this code out into its own module that i can call if i care.
	async function hnManagerold() {
		let mode = ["Level", "Ram", "Core", "Cache"]
		function check(q) { return eval(q < playerMoney() / 1.1) }//Bigger number = tighter money restriction :)
		if (check(ns.hacknet.getPurchaseNodeCost()) && ns.hacknet.numNodes() < 20) {
			ns.hacknet.purchaseNode();
		}
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			for (let n = 0; n < mode.length; n++) {
				if (check(ns.hacknet["get" + mode[n] + "UpgradeCost"](i))) {
					if ((mode[n] == "Cache" && ns.hacknet.numHashes() / ns.hacknet.hashCapacity() > .8) || mode[n] != "Cache") { //only do cache upgrades if we're near the ceiling of hashes
						ns.hacknet["upgrade" + mode[n]](i);
					}
				}
			}
		}

	} //
	async function hnManager() {
		const getProd = (level, ram, cores) => (level * 1.5) * Math.pow(1.035, ram - 1) * ((cores + 5) / 6);
		// your production multiplier
		const PROD_MULTIPLIER = ns.getHacknetMultipliers().production;
		const ratios = [];
		function check(q) { return eval(q < playerMoney() / 1.1) }//Bigger number = tighter money restriction :)
		// loop through all nodes
		for (let index = 0; index < ns.hacknet.numNodes(); index++) {
			// get current node stats
			const { level, ram, cores, production } = ns.hacknet.getNodeStats(index);

			// get upgrades cost
			const levelUpgradeCost = ns.hacknet.getLevelUpgradeCost(index);
			const ramUpgradeCost = ns.hacknet.getRamUpgradeCost(index);
			const coreUpgradeCost = ns.hacknet.getCoreUpgradeCost(index);
			// get prod. growth / cost ratios
			const levelUpgradeRatio = ((getProd(level + 1, ram, cores) * PROD_MULTIPLIER) - production) / levelUpgradeCost;
			const ramUpgradeRatio = ((getProd(level, ram * 2, cores) * PROD_MULTIPLIER) - production) / ramUpgradeCost;
			const coreUpgradeRatio = ((getProd(level, ram, cores + 1) * PROD_MULTIPLIER) - production) / coreUpgradeCost;
			// possible upgrades of current node
			const currentNodeUpgrades = [
				{ ratio: levelUpgradeRatio, cost: levelUpgradeCost, nodeIndex: index, upgrade: "Level" },
				{ ratio: ramUpgradeRatio, cost: ramUpgradeCost, nodeIndex: index, upgrade: "Ram" },
				{ ratio: coreUpgradeRatio, cost: coreUpgradeCost, nodeIndex: index, upgrade: "Core" }
			];
			// push current node upgrades to all upgrades
			ratios.push(...currentNodeUpgrades);

			// get the most profitable upgrade
			const { cost, nodeIndex, upgrade } = ratios.sort((a, b) => b.ratio - a.ratio)[0];

			// execute upgrade
			if (check(ns.hacknet["get" + upgrade + "UpgradeCost"](nodeIndex, 1))) {
				ns.hacknet["upgrade" + upgrade](nodeIndex)
			}

			// check if you can purchase new node
			if (ns.hacknet.getPurchaseNodeCost() - playerMoney() < 0) {
				ns.hacknet.purchaseNode();
			}
		}
	}
	/*
	async function hnSpendHash() {
		let upgList = ns.hacknet.getHashUpgrades();
		let upgItem;
		let maxServer = "omega-net";
		//if (loopNum > 1200) { upgItem = 0; loopNum = 0 }; //if it's been longer than 20m, infuse some cash
		//ns.hacknet.hashCapacity();
		//Spends all remaining Hashes
		if (ns.getServerMinSecurityLevel(maxServer) > 5) {
			upgItem = 2;
		} else {
			upgItem = 3;
		}
		upgItem = 0;
		if (ns.hacknet.hashCost(upgList[upgItem]) > ns.hacknet.hashCapacity()) { upgItem = 9 }
		for (let i = 0; i <= Math.floor(ns.hacknet.numHashes() / ns.hacknet.hashCost(upgList[upgItem])); i++) {
			if (upgItem == 2 || upgItem == 3) {
				ns.hacknet.spendHashes(upgList[upgItem], maxServer);
			} else {
				ns.hacknet.spendHashes(upgList[upgItem]);
			}
		}
		//upgList[0] = "Sell for Money"
		//upgList[1] = "Sell for Corporation Funds"
		//upgList[2] = "Reduce Minimum Security"
		//upgList[3] = "Increase Maximum Money"
		//upgList[4] = "Improve Studying"
		//upgList[5] = "Improve Gym Training"
		//upgList[6] = "Exchange for Corporation Research"
		//upgList[7] = "Exchange for Bladeburner Rank"
		//upgList[8] = "Exchange for Bladeburner SP"
		//upgList[9] = "Generate Coding Contract"
		//"Increase Maximum Money",[ServName]
		//ns.hacknet.spendHashes("Increase Maximum Money","silver-helix");
	}*/
	async function findCodingContracts() {
		let servers = serverList;
		const boughtServers = ns.getPurchasedServers(ns);
		servers = servers.filter(s => !boughtServers.includes(s));
		const hostname = servers.find(s => ns.ls(s).find(f => f.endsWith(".cct")))
		if (!hostname) {
			contractLocation = "No contracts available";
			return;
		}

		contractLocation = `cct on '${hostname}'`
		ns.exec("/coding-contracts/solve-all.js", "home", 1);
	}
	async function servManager() {

		//If we have enough money then:
		// 1. Check to see if we can purchase a server (<25)
		//    Yes: Then buy server
		//	  No:  Then check to see how much ram current lowest ram server has:
		//			then kill all, Delete, then purchase
		let pservList = ns.getPurchasedServers();
		let currRamBuy = 32;  //Start @ 32GB if we don't have any servers
		let pservRam = [];
		for (let xram = 0; xram < pservList.length - 1; xram++) {
			pservRam[xram] = ns.getServerMaxRam(pservList[xram]);
		}
		let pservMinRam = Math.min(...pservRam);
		let pservMaxRam = Math.max(...pservRam);
		//ns.tprint("MinRam: " + pservMinRam + "\nMaxRam: " + pservMaxRam)
		if (ns.getServerMaxRam("home") >= 1048576) {
			currRamBuy = 1048576;
		} else if (ns.getServerMaxRam("home") >= 32768) {
			currRamBuy = 32768;
		} else if (ns.getServerMaxRam("home") >= 1024) {
			currRamBuy = 1024;
		} else {
			//ns.tprint(pservList.length)
			/*
			if (pservList.length > 0) { //Figure out most recently bought ram size
				currRamBuy = ns.getServerMaxRam(pservList[pservList.length - 1]);
				pservMinRam = ns.getServerMaxRam(pservList[0]);
				for (let xram = 0; xram < pservList.length - 1; xram++) {
					if (xram == 0) { pservMinRam = ns.getServerMaxRam(pservList[xram])} else { pservMinRam = Math.min(pservMinRam, ns.getServerMaxRam(pservList[xram])); }
					pservMaxRam = Math.max(pservMaxRam, ns.getServerMaxRam(pservList[xram]));
				}
			}*/
		}
		if (pservList.length == 25) { //We have the max of servers
			if (pservMinRam == pservMaxRam) {
				currRamBuy = Math.min(currRamBuy * 32, 1048576);
			} else {
				currRamBuy = pservMaxRam
			}
			if (playerMoney() > ns.getPurchasedServerCost(currRamBuy)) {
				for (let xd = 0; xd < 25; xd++) {
					if (ns.getServerMaxRam(pservList[xd]) < currRamBuy) {
						ns.killall(pservList[xd]);
						ns.deleteServer(pservList[xd]);
						ns.purchaseServer(pservList[xd], currRamBuy);
						ns.tprint("Server Purchased: " + pservList[xd] + "[" + currRamBuy + "GB] for " + ns.nFormat(ns.getPurchasedServerCost(currRamBuy), "$0.00a"));
						break; //only need to buy 1 server per loop
					}
				}

			}


		} else { //less than 25 servers
			if (playerMoney() > ns.getPurchasedServerCost(currRamBuy)) {
				let newserv = ns.purchaseServer("pserv", currRamBuy);
				ns.tprint("Server Purchased: " + newserv + "[" + currRamBuy + "GB] for " + ns.nFormat(ns.getPurchasedServerCost(currRamBuy), "$0.00a"));
				pservList = ns.getPurchasedServers();
				//ns.tprint("New Server List is now: " + pservList);
			}
		}


	}

	async function joinFactions() {
		let nonautofaction = ["Sector-12", "Chongqing", "New Tokyo", "Ishima", "Aevum", "Volhaven"]
		let factionJoinable = ns.checkFactionInvitations();
		for (let i = factionJoinable.length - 1; i >= 0; i--) {
			if (!nonautofaction.includes(factionJoinable[i])) { //If the joinable faction isn't in the unjoinable list
				if (ns.joinFaction(factionJoinable[i])) { //join the faction
					ns.toast("Joined " + factionJoinable[i], "success", 5000) //talk about it
					//if (factionJoinable[i] == "Daedalus") {
					//	ns.workForFaction("Daedalus");
					//} else if (factionJoinable[i] == "BitRunners") {
					//	ns.workForFaction("BitRunners");
					//}
				}
			}
		}

	}
	/*
	async function workFaction() {
		let me = ns.getPlayer()
		let myFactions = me.factions
		if me.currentWorkFactionName
		
	
		
	}*/

	let loopNum = 1;
	while (true) {
		await scanExes()
		await scanServers()
		await checkServers()
		if (loopNum % 60 == 0) { await findCodingContracts() }
		if (serverMan) { await servManager() }
		if (manager) { await hnManager() }
		await joinFactions()
		//await hnSpendHash()
		//if (loopNum % 400 == 0) { await workFaction() }

		if (loopNum % 120 == 0) {
			if (!ns.isRunning("better-crime.js", "home") && !ns.isRunning("better-crime.js", "home", "homicide")) {
				ns.exec("work-faction-test.js", "home", 1);
			} else if ((ns.isRunning("better-crime.js", "home") || ns.isRunning("better-crime.js", "home", "homicide")) &&
				ns.heart.break() <= -54000) {
				ns.kill("better-crime.js", "home"); // we can be done doing crime now
				ns.kill("better-crime.js", "home", "homicide");
				ns.gang.createGang("Slum Snakes");
				ns.exec("gang-manager.js", "home", 1);
				ns.exec("work-faction-test.js", "home", 1);
			}
			ns.exec("purchase-augments.js", "home", 1);
		}
		await hackAll()
		await log()

		await ns.asleep(1000)//Keeps everything running once per second
		if (loopNum > 1e12) { loopNum = 0; } else { loopNum++; }

	}
}