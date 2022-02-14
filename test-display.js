/** @param {import(".").NS} ns */
export async function main(ns) {
	const testValues = [
		2.56e0, 2.56e3, 2.56e6,
		2.56e9, 2.56e12, 2.56e15,
		2.56e18, 2.56e21, 2.56e24,
		2.56e27, 2.56e30, 2.56e33
	];
	let nformatTest = [];
	for (let i=0; i< testValues.length; i++) {
		nformatTest.push(ns.nFormat(testValues[i], "0.00b"))
	}
	ns.tprint(nformatTest);
}