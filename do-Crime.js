/** @param {NS} ns **/

export const crimes = [
		"Shoplift",
		"Rob Store",
		"Mug Someone",
		"Larceny",
		"Deal Drugs",
		"Bond Forgery",
		"Traffick illegal Arms",
		"Homicide",
		"Grand Theft Auto",
		"Kidnap and Ransom",
		"Assassinate",
		"Heist"
	]
export async function main(ns) {
	ns.disableLog("ALL"); ns.clearLog();//Visual clarity
	ns.tail();
	
	while (true) { //Run once per second maximum
		if (!ns.isBusy()) {
			//ns.getCrimeChance()
			let crimeTime = ns.commitCrime(crimes[0]);
			ns.print(crimes[0] + "ing for " + crimeTime)
		}
		await ns.asleep(1000);
	}
}