/** @param {import(".").NS} ns */
export async function main(ns) {
	/*if (ns.args.length == 0) {
		return 0;
	}*/
	let oldString = "This is a test";
	if (oldString.length > 0) {
		let newString = "";
		for (let i = 0; i < oldString.length; i++) {
			newString += "||" + oldString[i] + "||";
		}
		ns.tprint("Spoiled text=" + newString);
	}
}