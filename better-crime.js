/** @param {import(".").NS} ns */

const crimes = [
	"heist",
	"assassination",
	"kidnap",
	"grand theft auto",
	"homicide",
	"larceny",
	"mug someone",
	"rob store",
	"shoplift",
];

export async function main(ns) {
	// Disable the log
	ns.disableLog("ALL");

	ns.tail(); // Open a window to view the status of the script
	let timeout = 250; // In ms - too low of a time will result in a lockout/hang

	while (true) {
		await ns.sleep(timeout); // Wait it out first
		if (ns.isBusy()) continue;
		/** Calculate the risk value of all crimes */
		let choices = crimes.map((crime) => {
			let crimeStats = ns.getCrimeStats(crime); // Let us look at the important bits
			let crimeChance = ns.getCrimeChance(crime); // We need to calculate if its worth it
			/** Using probabilty(odds) to calculate the "risk" to get the best reward
				* Risk Value = Money Earned * Odds of Success(P(A) / ~P(A)) / Time taken
				*
				* Larger risk values indicate a better choice
			*/
			let crimeRiskValue =
				(crimeStats.money * Math.log10(crimeChance / (1 - crimeChance + Number.EPSILON))) /
				crimeStats.time;
			return [crime, crimeRiskValue];
		});
		let bestCrime = choices.reduce((prev, current) => {
			return prev[1] > current[1] ? prev : current;
		});
		let i;
		if (ns.args.length > 0) {
			let crime = ns.args[0];
			ns.commitCrime(crime);
			let crimeStats = ns.getCrimeStats(crime); // Let us look at the important bits
			let crimeChance = ns.getCrimeChance(crime); // We need to calculate if its worth it
			/** Using probabilty(odds) to calculate the "risk" to get the best reward
				* Risk Value = Money Earned * Odds of Success(P(A) / ~P(A)) / Time taken
				*
				* Larger risk values indicate a better choice
			*/
			let crimeRiskValue =
				(crimeStats.money * Math.log10(crimeChance / (1 - crimeChance + Number.EPSILON))) /
				crimeStats.time;
			ns.print(
				`Crime: ${crime} Risk Value: ${ns.nFormat(crimeRiskValue, "0a")} Cash to Earn: ${ns.nFormat(ns
					.getCrimeStats(crime)
					.money,"$0.00a")} Karma: ${ns.nFormat(ns.heart.break(), "0a")}`);
		} else {

			ns.commitCrime(bestCrime[0]);
			ns.print(
				`Crime: ${bestCrime[0]} Risk Value: ${ns.nFormat(bestCrime[1], "0a")} Cash to Earn: ${ns.nFormat(ns
					.getCrimeStats(bestCrime[0])
					.money,"$0.00a")} Karma: ${ns.nFormat(ns.heart.break(), "0a")}`
			);
		}
	}
}