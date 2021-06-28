var getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; },
fs = require("fs");

module.exports = async (client, oldMember, newMember) => {
    fs.readFile(`./serveur/${newMember.guild.id}.json`, async (err, data) => {
        if (err) return;
let db = JSON.parse(fs.readFileSync(`./serveur/${newMember.guild.id}.json`, "utf8"));
if(!db) return;
if(db.logs.role === false) return;
str_chan = newMember.guild.channels.cache.find(c => c.id === db.logs.role)
if(!str_chan) return;

const fetchedLogs = await oldMember.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_ROLE_UPDATE',
}),
channel = oldMember.guild.channels.cache.find(c => c.name === "logs-roles"),
deletionLog = fetchedLogs.entries.first();

if(!deletionLog) return;
// -- New roles
if(oldMember.roles.cache.size < newMember.roles.cache.size) {
let newroles = null;
deletionLog.changes.forEach(r => {
    newroles = r.new
});


if (!deletionLog) return;
const { executor, target } = deletionLog;

str_chan.send({embed: { description: `**${executor.username}**#${executor.discriminator} (\`${executor.id}\`) a donné à **${newMember.user.username}**#${newMember.user.discriminator} (\`${newMember.user.id}\`) le(s) rôle(s): \`\`\`${newroles.map(r => r.name).join(", ")}\`\`\``, author: { name: `➕ Ajout de rôle a un membre` }, color: 3553599, footer: { text: `🕙 ${getNow().time}` }} });

} else if(oldMember.roles.cache.size > newMember.roles.cache.size) {
let oldroles = null;
deletionLog.changes.forEach(r => {
    oldroles = r.new
});
if (!deletionLog) return;
const { executor, target } = deletionLog;
str_chan.send({embed: { description: `**${executor.username}**#${executor.discriminator} (\`${executor.id}\`) a retiré à **${newMember.user.username}**#${newMember.user.discriminator} (\`${newMember.user.id}\`) le(s) rôle(s): \`\`\`${oldroles.map(r => r.name).join(", ")}\`\`\``, author: { name: `➖ Perte d'un rôle a un membre` }, color: 3553599, footer: { text: `🕙 ${getNow().time}` }} });

}
    });
};


