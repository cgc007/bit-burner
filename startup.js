/** @param {NS} ns **/
export async function main(ns) {
	if (ns.gang.inGang()) {
		let uniName
		let courseName = "Algorithms"
		if (ns.getServerMoneyAvailable("home") >= 2e5 && ns.travelToCity("Volhaven")) {
			uniName = "ZB Institute of Technology"
		} else {
			uniName = "Rothman University"
		}
		ns.universityCourse(uniName, courseName, false);
		ns.exec("gang-manager.js", "home", 1);
	} else {
		ns.exec("better-crime.js", "home", 1);
	}
	
	ns.exec("autofarmv2.js", "home", 1, "0");
	ns.exec("custom-overview.js", "home", 1);
	//ns.exec("money-approximator.js", "home", 1);
}