/** @param {NS} ns **/
export async function main(ns) {
	let i = 0
	let array = [0,8,1,1,0,3,10,8,8,8,0,7,1,5,6,3,4,4,5,0,8,5];
	//array = ns.args[0].split(','); 
	//array = JSON.parse(ns.args[0]);
	ns.tail();
	for (i; i < array.length; i++) {
		ns.print("Array[" + i + "]: " + array[i])
	}
	i = 0
	while (i < array.length) {
		let subarray = array.slice(i, i + array[i])
		ns.print("SubArray " + subarray)
		const subarrMax = subarray => Math.max(...subarray);
		ns.print("Jump " + subarrMax(subarray))
		if (subarrMax(subarray) == 0 || subarray.length == 0) { //if we cannot move forward, cannot solve
			ns.print("Solved - 0");
			return 0;
		}
		i += subarrMax(subarray);
	}
	ns.print("Solved - 1");
	return 1; //if we got here we exited the length of the array

}

/*
You could pass a comma-separated string and then call .split(',') on it.
It'll turn this "1,2,3,4" in to ["1", "2", "3", "4"]
*/