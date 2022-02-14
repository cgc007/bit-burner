/** @param {import(".").NS} ns */
export async function main(ns) {

	ns.disableLog("ALL");
	ns.clearLog();
	ns.tail();
	//let desiredAugs = ["CashRoot Starter Kit", "The Red Pill", "NeuroFlux Governor", "Neuroreceptor Management Implant", "ECorp HVMind Implant"]
	//let minAugBuy = 6;
	let augList = [];
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
	function hasElement(array, checkPos, checkValue) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][checkPos] == checkValue) {
				return 1;
			}
		}
		return 0;
	}
	for (let oFaction of ns.getPlayer().factions) {
		//ns.print(oFaction);
		//augList.push() = [ns.getAugmentationsFromFaction(oFaction)]
		for (let oAugment of ns.getAugmentationsFromFaction(oFaction)) {
			if (!hasElement(augList, 1, oAugment)) {
				augList.push([ns.getAugmentationPrice(oAugment), oAugment, oFaction]);
				//if (oAugment == "NeuroFlux Governor") { ns.print("NFG from " + ns.getPlayer().currentWorkFactionName + " for " + ns.nFormat(ns.getAugmentationPrice("NeuroFlux Governor"),"$0.00a")); }
			}
		}

	}
	augList = arraySort(augList);

	ns.print("$".padEnd(10, " ") + "| Name".padEnd(60, " ") + "| Faction");

	let totalPrice = 0; let numAffordableAugs = 0; let cannotbuy = 0; let completePrice = 0;

	for (let i = 0; i < augList.length; i++) {
		let price = Math.pow(1.9, i) * augList[i][0];
		completePrice += price;
		if (completePrice < ns.getPlayer().money) { numAffordableAugs = i; }
		let ownedCheck = "";
		if (ns.getOwnedAugmentations(true).includes(augList[i][1])) {
			ownedCheck = "x";
		} else { ownedCheck = " "; }
		ns.print(ns.nFormat(augList[i][0], "$0.00a").padEnd(9, " ") + ownedCheck +
			"| " + augList[i][1].padEnd(58, " ") +
			"| " + augList[i][2]);
	}

	ns.print(eval(numAffordableAugs) + " / " + augList.length + " " + ns.nFormat(totalPrice, "$0.00a") + "/" + ns.nFormat(completePrice, "$0.00a"));
	ns.print(augList.length);
	ns.print(augList);

	//if we only have 1 aug to buy and it's NFG see how many we can buy
	/*
	if (augList.length == 1 && augList[0][1] == "NeuroFlux Governor") {
		let maxNFGbuy = 0;
		let tempMoney = ns.getPlayer().money;
		while (tempMoney > Math.pow(1.9, maxNFGbuy) * augList[0][0]) {
			tempMoney -= Math.pow(1.9, maxNFGbuy) * augList[0][0];
			maxNFGbuy++;
		}
		numAffordableAugs += maxNFGbuy;
	}*/

}