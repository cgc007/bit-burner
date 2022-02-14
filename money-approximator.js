/** @param {NS} ns **/
export async function main(ns) {
	ns.tail();
	ns.disableLog("ALL");

	const gameTickLength = 6; //assume game ticks are 6s
	const sleepTime = 30; //seconds to sleep
	let beginMoney = [];
	ns.print("Priming Stored data for " + sleepTime + "s.");
	for (let i = 0; i < sleepTime/gameTickLength; i++) {
		beginMoney[i] = ns.getServerMoneyAvailable("home");
		await ns.asleep(gameTickLength * 1000);
	}
	while (1) {
		for (let i = 0; i < sleepTime/gameTickLength; i++) {
			beginMoney[i] = ns.getServerMoneyAvailable("home");
			ns.print(ns.nFormat(ns.getTimeSinceLastAug() / 1000, "00:00:00") + "(" + i + "): " +
				ns.nFormat((ns.getServerMoneyAvailable("home") - beginMoney[(i + 1 >= sleepTime/gameTickLength) ? (0) : (i + 1)]) / sleepTime, "$0.00a") + "/s");
			/*
			if (i + 1 > 0) {
				ns.print(ns.nFormat(ns.getTimeSinceLastAug() / 1000, "00:00:00") + ": " + ns.nFormat((ns.getServerMoneyAvailable("home") - beginMoney[0]) / sleepTime, "$0.00a") + "/s");
			} else {
				ns.print(ns.nFormat(ns.getTimeSinceLastAug() / 1000, "00:00:00") + ": " + ns.nFormat((ns.getServerMoneyAvailable("home") - beginMoney[i + 1]) / sleepTime, "$0.00a") + "/s");
			}*/
			await ns.asleep(gameTickLength * 1000);
		}

	}
}