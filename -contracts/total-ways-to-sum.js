/** @param {import(".").NS} ns */
export async function main(ns) {
	var ways = [1]
	let data = ns.args[0]
	ways.length = data + 1
	ways.fill(0, 1)
	for (var i = 1; i < data; ++i) {
		for (var j = i; j <= data; ++j) {
			ways[j] += ways[j - i]
		}
	}
	ns.tprint(ways[data])
}