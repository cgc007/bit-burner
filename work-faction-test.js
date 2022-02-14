/** @param {import(".").NS} ns */

/*
This should choose to work for the faction that has the highest favor with unpurchased augments
*/
export async function main(ns) {
	let myFactions = [];
	let gangNames = [];
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
	if (ns.gang.inGang()) {
		let oGangInfo = ns.gang.getOtherGangInformation()
		gangNames.push(ns.gang.getGangInformation().faction)
		for (let gangName in oGangInfo) {
			gangNames.push(gangName);
		}
	}
	for (let oFaction of ns.getPlayer().factions) {

		if (!ns.gang.inGang() || !gangNames.includes(oFaction)) {
			let augList = [];
			for (let oAugment of ns.getAugmentationsFromFaction(oFaction)) {
				if (!ns.getOwnedAugmentations(true).includes(oAugment)) {
					augList.push([ns.getAugmentationRepReq(oAugment), oAugment, oFaction]);
				}
			}
			augList = arraySort(augList);
			if (augList.length > 0 && ns.getFactionRep(oFaction) < augList[0][0]) { //only add factions to the list that we don't have all the augs from
				myFactions.push([ns.getFactionFavor(oFaction), oFaction]);
			}
		}
	}
	if (myFactions.length > 0) {
		myFactions = arraySort(myFactions);
		let workType = "hacking";
		ns.tprint("Workable factions with augs: " & myFactions)
		//ns.print(myFactions + ns.gang.getGangInformation().faction);


		//ns.print(ns.isBusy() + " " + ns.workForFaction(myFactions[0][1], workType, false) + " working for " + myFactions[0][1] + " performing " + workType);
		if (myFactions.length > 0 && myFactions[0][1].length > 0) {
			let focusType = true;
			if (ns.getOwnedAugmentations().includes("Neuroreceptor Management Implant")) { focusType = false; }
			if (!ns.workForFaction(myFactions[0][1], workType, focusType)) {
				if (!ns.workForFaction(myFactions[0][1], "field", focusType)) {
					if (!ns.workForFaction(myFactions[0][1], "security", focusType)) {
						ns.tprint("Failed to start working for " + myFactions[0][1])
					}
				}
			}
		} else { ns.tprint("No factions worth working for."); }
		//ns.writePort(2,myFactions[0][1]);
	}
}