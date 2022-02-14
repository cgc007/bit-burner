/** @param {import(".").NS} ns */
export async function main(ns) {
	let i =0;
	listenHereYou: 
	for (i = i + 5; i < 4e12; i) {
		//what? there should be something here?
	}
	ns.tprint(i);
	if (i++ < 100) { continue listenHereYou; }
}