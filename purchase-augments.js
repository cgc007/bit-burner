/** @param {import(".").NS} ns */
export async function main(ns) {

	ns.disableLog("ALL");
	ns.clearLog();
	ns.tail();
	ns.print(ns.getTimeSinceLastAug());
	ns.print(ns.getPlayer().factions);
	const nameNFG = "NeuroFlux Governor";
	const desiredAugs =
		["CashRoot Starter Kit", "The Red Pill", nameNFG, "Neuroreceptor Management Implant", "ECorp HVMind Implant"]
	let minAugBuy = 6;
	let augList = [];
	const augmentPriceIncrease = 1.786//1.9 base, 1.824 BN11.1, 1.786 BN11.2, 1.767 BN11.3
	//const reputationPerDollar = 0.0000057020; //this is correct for BN11.2 at least
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
	function hasElement(array, checkPos, checkValue) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][checkPos] == checkValue) {
				return true;
			}
		}
		return false;
	}
	while (ns.getPlayer().money > ns.getUpgradeHomeCoresCost() * 3 && ns.upgradeHomeCores()) {
		ns.toast("Home CPU Upgraded!", "success", 5000);
	}
	while (ns.getPlayer().money > ns.getUpgradeHomeRamCost() * 3 && ns.upgradeHomeRam()) {
		ns.toast("Home Ram Upgraded!", "success", 5000);
	}

	for (let oFaction of ns.getPlayer().factions) {
		//ns.print(oFaction);
		//augList.push() = [ns.getAugmentationsFromFaction(oFaction)]
		for (let oAugment of ns.getAugmentationsFromFaction(oFaction)) {

			if ((ns.getAugmentationRepReq(oAugment) < ns.getFactionRep(oFaction) || //have required rep
				(ns.getFactionFavor(oFaction) > ns.getFavorToDonate(oFaction))) && //OR can buy rep via donation
				ns.getAugmentationPrice(oAugment) < ns.getServerMoneyAvailable("home") &&
				!hasElement(augList, 1, oAugment) &&
				(!ns.getOwnedAugmentations(true).includes(oAugment) ||
					oAugment == nameNFG) &&
				(ns.getAugmentationStats(oAugment).faction_rep_mult > 0 ||
					ns.getAugmentationStats(oAugment).hacking_exp_mult > 0 ||
					ns.getAugmentationStats(oAugment).hacking_grow_mult > 0 ||
					ns.getAugmentationStats(oAugment).hacking_speed_mult > 0 ||
					ns.getAugmentationStats(oAugment).hacking_money_mult > 0 ||
					ns.getAugmentationStats(oAugment).hacking_chance_mult > 0 ||
					ns.getAugmentationStats(oAugment).hacking_mult > 0 ||
					desiredAugs.includes(oAugment))) {

				if (oAugment == nameNFG) { ns.print("NFG from " + oFaction + " for " + ns.nFormat(ns.getAugmentationPrice(oAugment), "$0.00a")); }
				if (ns.getAugmentationRepReq(oAugment) > ns.getFactionRep(oFaction) && //don't have required rep
					ns.getFactionFavor(oFaction) > ns.getFavorToDonate(oFaction)) { //but do have req favor to donate to this faction
					let currentFactionRep = ns.getFactionRep(oFaction);
					if (ns.donateToFaction(oFaction, 1e6)) {
						let deltaFactionRep = ns.getFactionRep(oFaction) - currentFactionRep;
						let reputationPerDollar = deltaFactionRep / 1e6
						let moneyToDonate = (ns.getAugmentationRepReq(oAugment) - ns.getFactionRep(oFaction)) / reputationPerDollar //figure out how much money to donate
						if (!ns.donateToFaction(oFaction, moneyToDonate)) {
							continue;
						} else {
							ns.print(`Donated ${ns.nFormat(moneyToDonate, "$0.00a")} to ${oFaction} and gained ${ns.nFormat(deltaFactionRep, "0.00")} reputation to be able to buy ${oAugment}`)
						}
					} else { continue; }


				}
				augList.push([ns.getAugmentationPrice(oAugment), oAugment, oFaction]);
			}

		}
	}
	if (ns.getPlayer().factions.includes(ns.getPlayer().currentWorkFactionName) && !ns.getOwnedAugmentations(true).includes(nameNFG)) {
		augList.push([ns.getAugmentationPrice(nameNFG), nameNFG, ns.getPlayer().currentWorkFactionName]);
		ns.print("NFG from " + ns.getPlayer().currentWorkFactionName + " for " + ns.nFormat(ns.getAugmentationPrice(nameNFG), "$0.00a"));
	}
	augList = arraySort(augList);


	let alreadyPurchasedNum = ns.getOwnedAugmentations(true).length - ns.getOwnedAugmentations().length;
	let totalPrice = 0; let numAffordableAugs = 0; let cannotbuy = 0;
	let completePrice = 0; let inListNFG = hasElement(augList, 1, nameNFG);
	let currNFGBuy = 0;
	let currAugBuy = 0;
	ns.print(augList.length);
	ns.print(augList);
	ns.print(inListNFG);
	ns.print("$".padEnd(10, " ") + "| Name".padEnd(60, " ") + "| Faction");

	while (totalPrice < ns.getPlayer().money * .9 && (inListNFG || augList.length >= minAugBuy - alreadyPurchasedNum) && cannotbuy == 0) {
		totalPrice = 0;
		numAffordableAugs = 0;
		cannotbuy = 0;
		completePrice = 0;
		currNFGBuy = 0;
		let i = augList.length - minAugBuy;
		if (i < 0) { i = 0; }
		for (i; i < augList.length; i++) {
			/*ns.tprint("NAA:" + numAffordableAugs +
				"\ni: " + i +
				"\ntotalPrice: " + ns.nFormat(totalPrice, "$0.00a") +
				"\ncannotbuy: " + cannotbuy +
				"\ncompletePrice: " + ns.nFormat(completePrice, "$0.00a") +
				"\naugList.length: " + augList.length +
				"\n\naugList: " + augList + "\n\n");*/
			let price = Math.pow(augmentPriceIncrease, numAffordableAugs + cannotbuy) * augList[i][0];
			completePrice += price;
			if (augList[i][1] == nameNFG) {
				let tempMoney = ns.getPlayer().money - totalPrice; //tempMoney = remaining after other aug purchases
				while (tempMoney > Math.pow(augmentPriceIncrease, numAffordableAugs) * Math.pow(1.14, currNFGBuy) * augList[i][0]) {
					//ns.print("Can buy " + currNFGBuy + " NFG levels.");
					//NF can be approximated with log base (augmentPriceIncrease*1.14)
					totalPrice += Math.pow(augmentPriceIncrease, numAffordableAugs) * Math.pow(1.14, currNFGBuy) * augList[i][0];
					tempMoney -= Math.pow(augmentPriceIncrease, numAffordableAugs) * Math.pow(1.14, currNFGBuy) * augList[i][0];
					currNFGBuy++;
					numAffordableAugs++;
				}
			} else {
				if (ns.getPlayer().money < totalPrice + price || cannotbuy > 0) {
					ns.print(ns.nFormat(price, "$0.00a").padEnd(9, " ") + "x| " + augList[i][1].padEnd(58, " ") + "| " + augList[i][2]);
					cannotbuy++;
					//ns.print(ns.getPlayer().money + " < " + totalPrice + price)
				} else {
					ns.print(ns.nFormat(price, "$0.00a").padEnd(10, " ") + "| " + augList[i][1].padEnd(58, " ") + "| " + augList[i][2]);
					totalPrice += price;
					numAffordableAugs++;
				}
			}
		}
		if (numAffordableAugs > minAugBuy) { minAugBuy = numAffordableAugs } else { break; }

	}

	ns.print(eval(numAffordableAugs) + " / " + augList.length + " (P: " + alreadyPurchasedNum + ") " + ns.nFormat(totalPrice, "$0.00a") + "/" + ns.nFormat(completePrice, "$0.00a"));
	//if we only have 1 aug to buy and it's NFG see how many we can buy
	/*if (augList.length == 1 && augList[0][1] == nameNFG) {
		let maxNFGbuy = 0;
		let tempMoney = ns.getPlayer().money;
		while (tempMoney > Math.pow(augmentPriceIncrease, maxNFGbuy) * augList[0][0]) {
			tempMoney -= Math.pow(augmentPriceIncrease, maxNFGbuy) * augList[0][0];
			maxNFGbuy++;
		}
		numAffordableAugs += maxNFGbuy;
	}*/
	ns.print("HRP: " + ns.getOwnedAugmentations().includes("The Red Pill"));
	//ns.print(ns.getHackingLevel());
	//ns.print(ns.getServerRequiredHackingLevel("w0r1d_d43m0n"));
	ns.print("HHL: " + ns.getHackingLevel() + " > " + ns.getServerRequiredHackingLevel("w0r1d_d43m0n"))
	ns.print(ns.getHackingLevel() > ns.getServerRequiredHackingLevel("w0r1d_d43m0n"));
	if (ns.getOwnedAugmentations().includes("The Red Pill") &&
		ns.getHackingLevel() > ns.getServerRequiredHackingLevel("w0r1d_d43m0n")) { //if we have the red pill + skill, hack w0r1d_d43m0n
		ns.exec("install-backdoor.js", "home", 1);
		return 1;
	} else if (numAffordableAugs + alreadyPurchasedNum >= minAugBuy) {
		let i = augList.length - minAugBuy;
		if (i < 0) { i = 0; }
		for (i; i < augList.length; i++) {
			if (ns.purchaseAugmentation(augList[i][2], augList[i][1])) {
				alreadyPurchasedNum++;
				ns.print("Purchased " + augList[i][1]);
				if (augList[i][1] == nameNFG) {
					while (ns.purchaseAugmentation(augList[i][2], augList[i][1])) {
						alreadyPurchasedNum++;
						//continue buying NeuroFlux while we can
					}
				}
			}

		}
		//only when we hit our min purchase do we reset

		if (alreadyPurchasedNum >= minAugBuy) { ns.installAugmentations("startup.js"); }
	} else {
		await ns.writePort(1, numAffordableAugs);
	}
	//ns.print(augList);

}