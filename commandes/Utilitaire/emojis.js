const { RichEmbed } = require("discord.js");

  module.exports.run = async(client, message, args) => {
  
    try {
        let notAnimated = [];
        let animated = [];
        message.guild.emojis.cache.forEach(async emoji => {
          if (emoji.animated) animated.push(emoji.toString());
          else notAnimated.push(emoji.toString());
        });
        if (!animated[0]) animated = ['None'];
        if (!notAnimated[0]) notAnimated = ['None'];
        message.lineReply('**__ANIMÉS :__**\n' + animated.join(' ') + '\n**__NORMAUX :__**\n' + notAnimated.join(' '), {split:true});
      } catch (err) {
        message.channel.send('Il y a eu une ERREUR!\n' + err).catch();
      }
      
}
module.exports.help = {
  name: "emojis",
  category: "utilitaire",
  description: "montre les emojis du serv",
};