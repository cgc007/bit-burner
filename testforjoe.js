/** @param {import(".").NS} ns */
export async function main(ns) {
	let servers = ns.getPurchasedServers().concat(["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea",
	"harakiri-sushi", "neo-net", "zer0", "max-hardware", "CSEC", "iron-gym", "omega-net", "silver-helix", "avmnite-02h",
	"johnson-ortho", "the-hub", "crush-fitness", "phantasy", "comptek", "summit-uni", "I.I.I.I", "catalyst", "netlink",
	"rho-construction", "millenium-fitness", "rothman-uni", "syscore", "alpha-ent", "aevum-police", "zb-def", "nova-med", "univ-energy",
	"global-pharm", "unitalife", "lexo-corp", "snap-fitness", "omnia", "defcomm", "solaris", "infocomm", "taiyang-digital", "aerocorp",
	"zb-institute", "galactic-cyber", "deltaone", "icarus", "zeus-med", "univ-energy", "defcomm", "microdyne", "helios", "kuai-gong",
	"nwo", "4sigma", "b-and-a", "aerocorp", "run4theh111z", "applied-energetics", "titan-labs", "vitalife", ".", "The-Cave",
	"powerhouse-fitness", "ecorp", "blade", "fulcrumtech", "omnitek", "clarkinc", "fulcrumassets", "megacorp", "darkweb", "w0r1d_d43m0n"]);
	ns.tprint(servers);
}