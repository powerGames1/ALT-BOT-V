const fs = require("fs");

module.exports = async (client, oldPresence, newPresence) => {
fs.readFile(`./serveur/${newPresence.guild.id}.json`, async (err, data) => {
if (err) return;
    if(!oldPresence) return;
    let db = JSON.parse(fs.readFileSync(`./serveur/${oldPresence.guild.id}.json`, "utf8"));
    if(!db) return;
    if(db.statut.module === false) return;
if(newPresence.activities[0] && newPresence.activities[0].state === db.statut.state) {
if(!newPresence.member.roles.cache.some(r => r.id === db.statut.role)) {
    newPresence.member.roles.add(db.statut.role)
}
} else {
if(newPresence.member.roles.cache.some(r => r.id === db.statut.role)) {
        newPresence.member.roles.remove(db.statut.role)
}  
}
});
};
