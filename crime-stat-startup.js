/** @param {NS} ns **/
export async function main(ns) {
	while (ns.getPlayer().strength < 50) {
		ns.gymWorkout("Powerhouse Gym","str",true);
		await ns.asleep(5000);
	}
	while (ns.getPlayer().agility < 50) {
		ns.gymWorkout("Powerhouse Gym","agi",true);
		await ns.asleep(5000);
	}
	while (ns.getPlayer().defense < 50) {
		ns.gymWorkout("Powerhouse Gym","def",true);
		await ns.asleep(5000);
	}
	while (ns.getPlayer().dexterity < 50) {
		ns.gymWorkout("Powerhouse Gym","dex",true);
		await ns.asleep(5000);
	}
	
}