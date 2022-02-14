/** @param {import(".").NS} ns */
export async function main(ns) {
	const sleepTime = 15000;
	while (ns.getPlayer().strength < 50) {
		ns.gymWorkout("Powerhouse Gym","str",true);
		await ns.asleep(sleepTime);
	}
	while (ns.getPlayer().agility < 50) {
		ns.gymWorkout("Powerhouse Gym","agi",true);
		await ns.asleep(sleepTime);
	}
	while (ns.getPlayer().defense < 50) {
		ns.gymWorkout("Powerhouse Gym","def",true);
		await ns.asleep(sleepTime);
	}
	while (ns.getPlayer().dexterity < 50) {
		ns.gymWorkout("Powerhouse Gym","dex",true);
		await ns.asleep(sleepTime);
	}
	ns.stopAction();
	ns.exec("better-crime.js", "home", 1, "homicide");
	//boop
}