
const fs = require("fs");


  module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    var Discord = require("discord.js");
    const weather = require('weather-js');
    weather.find({search: args[0], degreeType: 'C'}, function (error, result){//args.join(" ")
        if(!args.length){  return message.channel.send (`Veuillez préciser une **Ville**`);

        }else if(result === undefined || result.length === 0){ return message.channel.send (`Veuillez préciser une **Ville Existable**`);
        }else if(error){  return message.channel.send (` **${error}**`);
   
        }else{
            var current = result[0].current;
            var location = result[0].location;
            let servericon = message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 });
            const weatherinfo = new Discord.MessageEmbed()
                .setAuthor("🌡 " + `Météo de ${args[0]}` + "", message.author.avatarURL({dynamic: true}))//current.observationpoint
                .setThumbnail(current.imageUrl)
                .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
                .setTimestamp()  
                .setColor(`${db.color}`)
                .addField('Température', `${current.temperature} ° Celsius`)
                .addField('Vent', current.winddisplay)
                .addField('Humidité', `${current.humidity}%`)
                .addField('Ciel', `${current.skytext}`)
               
            message.channel.send(weatherinfo);
        }  
    });
};

module.exports.help = {
    name: "meteo",

  };