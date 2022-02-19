/** @param {import(".").NS} ns */
export async function main(ns) {
	ns.tail();
	ns.disableLog("ALL");
	//ns.disableLog("getServerMoneyAvailable");

	let namePool = [
		"Bob", //1
		"Joe", //2
		"Dan", //3
		"Rob", //4
		"Knives", //5
		"Steakface", //6
		"Juicebar", //7
		"Arms", //8
		"Calves", //9
		"Neck", //10
		"Lionel", //11
		"Marshall", //12
		"Mathers", //13
		"Porkbottom", //14
		"Laurel", //15
		"Neato", //16
		"Chester", //17
		"Don", //18
		"Norte", //19
		"Yi", //20
		"Neo", //21
		"Singed", //22
		"Archon", //23
		"Burnt", //24
		"Toast",
	]; //25
	function arraySort(array) {
		return array.sort(function (a, b) {
			return b[0] - a[0];
		});
	} //Sorts nested arrays based on first number [[1,5],[4,2]], used on targetList and hostList
	function respectForNextGangMember() {
		let numMembers = ns.gang.getMemberNames().length;

		if (numMembers < 12) {
			return Math.pow(5, numMembers - 2) - ns.gang.getGangInformation().respect;
		}
		return 0;
	}
	function buyEquipment(mbrName, equipName) {
		//If equipment grants any combat stat,
		//we don't have it, and we have 100x the cash, buy it
		//if it is an aug, buy it if we have 10x the cash
		let moneyMult = 0;
		if (ns.gang.getEquipmentType(equipName) != "Augmentation") {
			moneyMult = 0.01;
		} else {
			moneyMult = 0.1;
		}

		if (
			ns.gang.getEquipmentCost(equipName) < ns.getServerMoneyAvailable("home") * moneyMult &&
			!ns.gang.getMemberInformation(mbrName).upgrades.includes(equipName) &&
			!ns.gang.getMemberInformation(mbrName).augmentations.includes(equipName) &&
			(ns.gang.getEquipmentStats(equipName).str > 0 || ns.gang.getEquipmentStats(equipName).def > 0 || ns.gang.getEquipmentStats(equipName).dex > 0)
		) {
			return ns.gang.purchaseEquipment(mbrName, equipName);
		}
		//ns.tprint("Type of " + equipName + ": " + ns.gang.getEquipmentType(equipName));
	}
	function taskSwitch(p, q) {
		let memInfo = ns.gang.getMemberInformation(p);
		if (!memInfo.task.includes(q)) {
			return ns.gang.setMemberTask(p, q);
		}
	}
	function doBestTask(type, member) {
		//types are money, respect, wantedLevel
		//ns.formulas.gang.moneyGain();
		//ns.formulas.gang.respectGain();
		//ns.formulas.gang.wantedLevelGain();
		//ns.formulas.gang.ascensionPointsGain();
		let gangInfo = ns.gang.getGangInformation();
		let memberInfo = ns.gang.getMemberInformation(member);
		let taskList = [];
		//ns.tprint(`type: ${type} member: ${member}`);
		if (type != "wantedLevel") {
			for (let checkTask of gangTasks) {
				//if (checkTask != "unassigned") {
				const taskStat = ns.gang.getTaskStats(checkTask);
				//ns.tprint(`type: ${type + "Gain"}\nmember: ${member}\ngangInfo: ${JSON.stringify(gangInfo)}\nmemberInfo: ${JSON.stringify(memberInfo)}\ncheckTask: ${checkTask}\n`);
				const gain = ns.formulas.gang[type + "Gain"](gangInfo, memberInfo, taskStat);
				taskList.push([gain, checkTask]);
				//}
			}
		} else {
			for (let checkTask of gangTasks) {
				//if (checkTask != "unassigned") {
				const taskStat = ns.gang.getTaskStats(checkTask);
				const gain = ns.formulas.gang.respectGain(gangInfo, memberInfo, taskStat) / ns.formulas.gang.wantedLevelGain(gangInfo, memberInfo, taskStat);
				taskList.push([gain, checkTask]);
				//ns.tprint(`type: ${type + "Gain"}\nmember: ${member}\ngangInfo: ${JSON.stringify(gangInfo)}\nmemberInfo: ${JSON.stringify(memberInfo)}\ncheckTask: ${checkTask}\n`);
				//}
			}
		}
		taskList = arraySort(taskList);
		//ns.tprint(`Attempting to set ${member} to ${taskList[0][1]}.\n${JSON.stringify(taskList)}`)
		taskSwitch(member, taskList[0][1]);
	}
	function getBestTask(type, member) {
		//types are money, respect, wantedLevel
		//ns.formulas.gang.moneyGain();
		//ns.formulas.gang.respectGain();
		//ns.formulas.gang.wantedLevelGain();
		//ns.formulas.gang.ascensionPointsGain();
		let gangInfo = ns.gang.getGangInformation();
		let memberInfo = ns.gang.getMemberInformation(member);
		let taskList = [];
		//ns.tprint(`type: ${type} member: ${member}`);
		if (type != "wantedLevel") {
			for (let checkTask of gangTasks) {
				//if (checkTask != "unassigned") {
				const taskStat = ns.gang.getTaskStats(checkTask);
				//ns.tprint(`type: ${type + "Gain"}\nmember: ${member}\ngangInfo: ${JSON.stringify(gangInfo)}\nmemberInfo: ${JSON.stringify(memberInfo)}\ncheckTask: ${checkTask}\n`);
				const gain = ns.formulas.gang[type + "Gain"](gangInfo, memberInfo, taskStat);
				taskList.push([gain, checkTask]);
				//}
			}
		} else {
			for (let checkTask of gangTasks) {
				//if (checkTask != "unassigned") {
				const taskStat = ns.gang.getTaskStats(checkTask);
				const gain = ns.formulas.gang.respectGain(gangInfo, memberInfo, taskStat) / ns.formulas.gang.wantedLevelGain(gangInfo, memberInfo, taskStat);
				taskList.push([gain, checkTask]);
				//ns.tprint(`type: ${type + "Gain"}\nmember: ${member}\ngangInfo: ${JSON.stringify(gangInfo)}\nmemberInfo: ${JSON.stringify(memberInfo)}\ncheckTask: ${checkTask}\n`);
				//}
			}
		}

		taskList = arraySort(taskList);
		//ns.tprint(`Attempting to set ${member} to ${taskList[0][1]}.\n${JSON.stringify(taskList)}`)
		return taskList[0][1];
	}

	function timeToAscend(member) {
		let memInfo = ns.gang.getMemberInformation(member);
	}
	//ns.gang.getTaskNames(); instead of calling this I'll define the array myself to save 2GB
	let gangTasks = [
		"Mug People",
		"Deal Drugs",
		"Strongarm Civilians",
		"Run a Con",
		"Armed Robbery",
		"Threaten & Blackmail",
		"Traffick Illegal Arms",
		"Terrorism",
		"Human Trafficking",
		"Vigilante Justice",
		"Train Combat",
		"Train Hacking",
		"Train Charisma",
		"Territory Warfare",
	];
	let gangMembers = ns.gang.getMemberNames();
	let gangInfo = ns.gang.getGangInformation();
	let oGangInfo = ns.gang.getOtherGangInformation();
	let clashChances = [];
	let powerAmounts = [];
	let oPowerAmounts = [];
	let tickTime;
	let prevCycleoGangInfo;
	let prevCyclemyGangInfo;
	let sleepAmount = 200;
	let myPowerChange = 0;
	let cycleTime;
	let oPowerChange = 0;
	while (1) {
		cycleTime = ns.getTimeSinceLastAug();
		prevCycleoGangInfo = oGangInfo;
		prevCyclemyGangInfo = gangInfo;
		gangInfo = ns.gang.getGangInformation();
		oGangInfo = ns.gang.getOtherGangInformation();

		for (let gangName in oGangInfo) {
			if (oGangInfo[gangName].power != prevCycleoGangInfo[gangName].power) {
				//we found the tick +- the asleep time
				tickTime = ns.getTimeSinceLastAug() + 20000;
			}
		}
		clashChances = [];
		powerAmounts = [];
		oPowerAmounts = [];
		for (let gangName in oGangInfo) {
			if (gangName != gangInfo.faction) {
				//Ensure we're not gathering info about ourselves

				//if (gangName.territory > 0) { //We only care about other gangs with territory remaining
				//ns.print(gangName + " %: " + ns.gang.getChanceToWinClash(gangName).toPrecision(3));
				clashChances.push(ns.gang.getChanceToWinClash(gangName));
				powerAmounts.push(oGangInfo[gangName].power);
				oPowerAmounts.push(prevCycleoGangInfo[gangName].power);
				//}
			}
		}
		if (prevCyclemyGangInfo.power != gangInfo.power) {
			myPowerChange = gangInfo.power - prevCyclemyGangInfo.power;
			oPowerChange = Math.max(...powerAmounts) - Math.max(...oPowerAmounts);
		}
		ns.clearLog();

		//should be 5 ticks/sec, if there are less than 10m for one member to get another member get one
		//5m is 300s, 1500 ticks
		for (let i = 0; i < gangMembers.length; i++) {
			let memInfo = ns.gang.getMemberInformation(gangMembers[i]);
			let ticksToNextMember =
				respectForNextGangMember() / ns.formulas.gang.respectGain(gangInfo, memInfo, ns.gang.getTaskStats(getBestTask("respect", gangMembers[i])));
			let respectWantedRatio =
				ns.formulas.gang.respectGain(gangInfo, memInfo, ns.gang.getTaskStats(getBestTask("respect", gangMembers[i]))) /
				ns.formulas.gang.wantedLevelGain(gangInfo, memInfo, ns.gang.getTaskStats(getBestTask("respect", gangMembers[i])));
			buyEquipment(gangMembers[i], "Baseball Bat");
			buyEquipment(gangMembers[i], "Katana");
			buyEquipment(gangMembers[i], "Glock 18C");
			let eqList = ns.gang.getEquipmentNames();
			for (let x = 0; x < eqList.length; x++) {
				buyEquipment(gangMembers[i], eqList[x]);
			}
			//buyEquipment(gangMembers[i], "Baseball Bat");

			let ascRes = ns.gang.getAscensionResult(gangMembers[i]);

			if (
				(ascRes != undefined && ascRes.str > 1.6) ||
				(ascRes != undefined && ascRes.str > 1.1 && memInfo.str_asc_mult > 5 && memInfo.earnedRespect < gangInfo.respect * 0.95)
			) {
				//Ascend the members as needed when they pass thresholds of mults, but not if they have all
				//the respect in the gang themselves, this should stagger ascends so we don't wipe out respect
				ns.gang.ascendMember(gangMembers[i]);
			}

			//doBestTask([type] can be "money", "respect", "wantedLevel", [gangMemberName])
			if (
				gangInfo.power < Math.max(...powerAmounts) * 200 &&
				gangInfo.territory > 0 &&
				tickTime >= 0 &&
				cycleTime + sleepAmount * 5 >= tickTime &&
				cycleTime < tickTime &&
				gangInfo.territory < 1
			) {
				//grow the power of our gang right before the tick and cycle back to something different after, if we're still needing to grow power
				taskSwitch(gangMembers[i], "Territory Warfare");
			} else if (
				(respectWantedRatio < 1 &&
					gangInfo.wantedLevel * 2 > gangInfo.respect &&
					gangInfo.wantedLevel > 5 &&
					memInfo.respect > 1e3 &&
					memInfo.str >= 170 &&
					gangInfo.wantedPenalty < 0.75) ||
				(memInfo.task == "Vigilante Justice" && gangInfo.wantedPenalty < 0.9999 && gangInfo.wantedLevel > 5)
			) {
				// && memInfo.str >= 170 && gangInfo.wantedLevel * 4 > gangInfo.respect) {
				//maximize wanted reduction
				//doBestTask("wantedLevel", gangMembers[i]);
				taskSwitch(gangMembers[i], "Vigilante Justice");
			} else if (memInfo.earnedRespect < 1e6 || (gangMembers.length < 12 && ticksToNextMember < 1500)) {
				//maximize respect growth for gang growth to 5 people
				doBestTask("respect", gangMembers[i]);
			} else if (memInfo.str <= memInfo.str_asc_mult * 170 || memInfo.str_asc_mult < 15) {
				//Train stats to ascend
				taskSwitch(gangMembers[i], "Train Combat");
			} else {
				//maximize cash growth
				doBestTask("money", gangMembers[i]);
			}
			ns.print(
				gangMembers[i].padStart(9, " ") +
					"(SAM): " +
					ns.nFormat(memInfo.str_asc_mult, "0.00").padEnd(8) +
					memInfo.task.padEnd(22) +
					ns.nFormat(ticksToNextMember, "0").padEnd(5)
				//ns.nFormat(memInfo.earnedRespect, "0a")
			);
		}
		if (Math.min(...clashChances) > 0.65 && gangInfo.power > Math.max(...powerAmounts) && myPowerChange > oPowerChange) {
			ns.gang.setTerritoryWarfare(true);
		}
		if (ns.gang.canRecruitMember()) {
			let x = 0;
			for (x; x < namePool.length; x++) {
				if (ns.gang.recruitMember(namePool[x])) {
					gangMembers = ns.gang.getMemberNames();
					ns.gang.setMemberTask(namePool[x], "Train Combat");
					break;
				}
			}
		}
		if (gangInfo.territory > 0) {
			ns.print("Territory: " + ns.nFormat(gangInfo.territory, "0.00%"));
		} else {
			ns.print("Territory has been wiped out.");
		}
		ns.print("Min Clash %: " + ns.nFormat(Math.min(...clashChances), "0.00%"));
		ns.print(
			"Their power/My power: " +
				ns.nFormat(Math.max(...powerAmounts), "0.00") +
				" [" +
				ns.nFormat(oPowerChange, "0.00") +
				"] / " +
				ns.nFormat(gangInfo.power, "0.00") +
				" [" +
				ns.nFormat(myPowerChange, "0.00") +
				"]"
		);
		//ns.print("Clash Array: " + clashChances);
		ns.print("MGR: " + ns.nFormat(gangInfo.moneyGainRate * 5, "$0.0a"));
		ns.print("WP: " + ns.nFormat((1 - gangInfo.wantedPenalty) * -1, "0.00%"));
		ns.print("Time: " + (cycleTime % 20000) + "/" + (tickTime % 20000) + " (" + sleepAmount + ")");
		await ns.asleep(sleepAmount);
		//ns.gang.getEquipmentNames()
	}
}
