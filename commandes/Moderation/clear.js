
const fs = require("fs");
emojis = require("./../../emotes.json")
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("./../../config.json")

    if (parseInt(args[0]) > 100) {
      return message.lineReply(`${emojis.general.no} Vous pouvez supprimer que 100 messages à la fois`)
      .then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 2500);
      })
    }
          if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.lineReply(`${emojis.general.warning} Vous n'avez pas la permission requise \`MANAGE_MESSAGES\``);
          if (!isNaN(message.content.split(' ')[1])) {
            let amount = 0;
            if (message.content.split(' ')[1] === '0' || message.content.split(' ')[1] === '0') {
              amount = 1;
            } else {
              amount = message.content.split(' ')[1];
              if (amount > 100) {
                amount = 100;
              }
            }
            
            await message.channel.bulkDelete(amount, true).then((_message) => {
              message.lineReply(`${emojis.general.yes} \`${_message.size}\` messages éffacés.`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                }, 5000);
              });
            });
          } else {
            message.lineReply(`${emojis.general.warning} Met des chiffres sale aveugle!` ).then((sent) => {
              setTimeout(function () {
                sent.delete();
              }, 2500);
            });
          }
        
        
   


};


module.exports.help = {
    name: "clear",
    category: 'Fun',
    description: ".",
    aliases: ['purge'],

  };