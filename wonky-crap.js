/** @param {NS} ns **/
export async function main(ns) {
	const arr = [1, 2, 3];
	const iter = arr[Symbol.iterator]();
	let loopDone = false;

	while (!loopDone) {
		const { value, done } = iter.next();
		loopDone = done;
		ns.tprint(value);
	}
}