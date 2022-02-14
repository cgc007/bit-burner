/** @param {NS} ns **/
export async function main(ns) {
	let x = 47;
	function plusme(x) {
		x++;
		return x;
	}
	ns.tail();
	ns.print("I'm before the if: " + x);
	if (1 && plusme(x)) {
		x++;
		ns.print("I'm inside the if: " + x);
	}
	ns.print("I'm after the if: " + x);
}