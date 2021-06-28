var getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; },
fs = require("fs");

module.exports = async (client, member) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${member.guild.id}.json`, "utf8"));
    if(!db) return;
    if(db.logs.serveur === false) return;
    str_chan = member.guild.channels.cache.find(c => c.id === db.logs.serveur)
    if(!str_chan) return;
str_chan.send({embed:{ description: `**${member.user.username}**#${member.user.discriminator} (\`${member.user.id}\`) a quitté le serveur! \n **Rôles:** \`\`\`${member.roles.cache.map(r => r.name).join(", ")}\`\`\``, color: 3553599, author: { name: "👋 Perte d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 

};


