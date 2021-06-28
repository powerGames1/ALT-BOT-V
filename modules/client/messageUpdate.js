var getNow = () => { return {time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}},
fs = require("fs")
module.exports = (client, oldMessage, newMessage) => {
fs.readFile(`./serveur/${oldMessage.guild.id}.json`, async (err, data) => {
if (err) return;
    if(!oldMessage.guild) return;
    let db = JSON.parse(fs.readFileSync(`./serveur/${oldMessage.guild.id}.json`, "utf8"));
    if(!db) return;
    if(db.logs.message === false) return;
    str_chan = newMessage.guild.channels.cache.find(c => c.id === db.logs.message)
    if(!str_chan) return;


    // --
    if(!newMessage.author) return;

    if(oldMessage.content === newMessage.content) return;
    if(oldMessage.author.bot) return;

    
    str_chan.send({embed:{ description: `**${oldMessage.author.username}**#${oldMessage.author.discriminator} (\`${oldMessage.author.id}\`) a édité son message dans [\`${oldMessage.channel.name}\`](https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}) \n  **Avant**: \`\`\`${oldMessage.content}\`\`\` **Après:** \`\`\`${newMessage.content}\`\`\``, color: 3553599, author: { name: "📝 Editions" }, footer: { text: `🕙 ${getNow().time}` } }}) 
    
});
    };