/** @param {NS} ns **/
export async function main(ns) {
	let nonautofaction = ["Sector-12", "Chongqing", "New Tokyo", "Ishima", "Aevum", "Volhaven"]
	let factionJoinable = ns.checkFactionInvitations();
	ns.tprint("factionJoinable:" + factionJoinable + "\nfactionJoinable.length:" + factionJoinable.length)
	for (let i = factionJoinable.length - 1; i > 0; i--) {
		if (!nonautofaction.includes(factionJoinable[i])) { //If the joinable faction isn't in the unjoinable list
			if (ns.joinFaction(factionJoinable[i])) { //join the faction
				ns.toast("Joined " + factionJoinable[i], "success", null) //talk about it
			}
		}
	}
}