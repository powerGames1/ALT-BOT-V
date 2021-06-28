const fs = require("fs");
// -- Exporte les modules 
module.exports = (client, message) => {
if(!message.guild) return;
fs.readFile(`./serveur/${message.guild.id}.json`, async (err, data) => {
if (err) return;
var config = require("./../../config.json"),
db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
if(!db) return;
  // -- Vérifie que le message commence par le prefixe et que l'auteur n'est pas un bot 
  if (!message.content.startsWith(db.prefix) || message.author.bot) return;

  // -- Récupere le contenue du message après le prefixe, définis le nom de la commande 
    var args = message.content.slice(db.prefix.length).split(/ +/),
    commandName = args.shift().toLowerCase(),
    command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    // -- Si il ne s'agit pas d'une commande, ne rien faire
    if (!command) return;

    // -- Lancer la commande
  command.run(client, message, args);
});
};
