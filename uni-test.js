/** @param {NS} ns **/
export async function main(ns) {
	let uniName
	let courseName = "Algorithms"
	if (ns.travelToCity("Volhaven")) {
		uniName = "ZB Institute of Technology"
	} else {
		uniName = "Rothman University"
	}
	ns.universityCourse(uniName,courseName,false) 
}