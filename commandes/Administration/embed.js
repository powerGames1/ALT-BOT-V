const { brotliDecompressSync } = require("zlib");

// --  Formule pour déclarer les variables
const
      { readdirSync } = require("fs"),
      { Client, Collection} = require("discord.js"),
      client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
      figlet = require('figlet'),
      colors = require('colors'),
      { ReactionCollector, MessageEmbed } = require('discord.js')
      emojis = require("./../../emotes.json"),
       Discord = require('discord.js'),
       fs = require('fs')
     
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    if (message.author.bot) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`)
        let embedBeforeEdit = new MessageEmbed().setDescription('** **') 
        let msgEmbedForEditing = await message.channel.send(embedBeforeEdit)
        const msgwait = await message.channel.send("Veuillez patienter la fin de l'ajout des réactions");
        await Promise.all(['✏️','💬','🕵️','🔻','🔳','🕙','🖼️','🌐','🔵','↩️','❌','📥','✅','📑'].map(r => msgwait.react(r)));
        let embed2 = new Discord.MessageEmbed()
        .setAuthor(`✏️ Menu de création d\'un embed`, message.author.avatarURL({ dynamic: true }))
        .addField(`\`✏️\``, "*Permet de modifier le titre de l'embed*", true)
        .addField(`\`💬\``, "*Permet de modifier la description de l'embed*", true)
        .addField(`\`🕵️\``, "*Permet de modifier l'auteur de l'embed*", true)
        .addField(`\`🔻\``, "*Permet de modifier le footer de l'embed*", true)
        .addField(`\`🔳\``, "*Permet de modifier le thumbnail de l'embed*", true)
        .addField(`\`🕙\``, "*Permet d'ajouter un timestamp à l'embed*", true)
        .addField(`\`🖼️\``, "*Permet de modifier l'image de l'embed*", true)
        .addField(`\`🌐\``, "*Permet de modifier le lien de l'embed*", true)
        .addField(`\`🔵\``, "*Permet de modifier la couleur de l'embed*", true)
        .addField(`\`↩️\``, "*Permet d'ajouter un field à l'embed*", true)
        .addField(`\`❌\``, "*Permet de retirer un field à l'embed*", true)
        .addField(`\`📥\``, "*Permet de copier un embed du bot*", true)
        .addField(`\`✅\``, "*Permet de modifier un embed du bot*", true)
        .addField(`\`📑\``, "*Permet d'envoyer l'embed dans un salon*", true)
        .setColor(db.color)
        .setTimestamp()  
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        await msgwait.edit(embed2)
        
        const filterReaction = (reaction, user) => user.id===message.author.id&&!user.bot;
        const filterMessage = (m) => m.author.id===message.author.id&&!m.author.bot;
        const collectorReaction = await new ReactionCollector(msgwait, filterReaction);
        collectorReaction.on('collect', async reaction => {
            reaction.users.remove(message.author);
            switch(reaction._emoji.name){
                case '✏️':

                    const msgQuestionTitle = await message.channel.send('Quel est votre titre ?');
                    const title = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    message.delete();
                    msgQuestionTitle.delete();
                    title.delete();
                    embedBeforeEdit.setTitle(title.content);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '💬':
                    const msgQuestionDescription = await message.channel.send('Quel est votre description ?');
                    const description = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    msgQuestionDescription.delete();
                    description.delete();
                    embedBeforeEdit.setDescription(description.content);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🕵️':
                    const msgQuestionAuteur = await message.channel.send('Quel est votre auteur ?');
                    const auteur = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    msgQuestionAuteur.delete();
                    auteur.delete();
                    embedBeforeEdit.setAuthor(auteur.content);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🔻':
                    const msgQuestionFooter = await message.channel.send('Quel est votre Footer ?');
                    const footer = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    msgQuestionFooter.delete();
                    footer.delete();
                    embedBeforeEdit.setFooter(footer.content);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🔳':
                    const msgQuestionThumbnail = await message.channel.send('Quel est votre Thumbnail _(insérez un lien)_?');
                    const thumbnail = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    if(!thumbnail.content.includes('http') || !thumbnail.content.includes('https')) return message.channel.send('Thumbnail incorrect bg');
                    msgQuestionThumbnail.delete();
                    thumbnail.delete();
                    embedBeforeEdit.setThumbnail(thumbnail.content);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🕙':
                    embedBeforeEdit.setTimestamp();
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🖼️':
                    const msgQuestionImage = await message.channel.send('Quel est votre Image ? _(insérez un lien)_');
                    const image = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    if(!image.content.includes('http') || !image.content.includes('https')) return message.channel.send('Image incorrect bg');
                    msgQuestionImage.delete();
                    image.delete();
                    embedBeforeEdit.setImage(image.content);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🌐':
                    const msgQuestionURL = await message.channel.send('Quel est votre URL ?');
                    const url = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    msgQuestionURL.delete();
                    url.delete();
                    embedBeforeEdit.setURL(url.content);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🔵':
                    const msgQuestionColor = await message.channel.send('Quel est votre Couleur ?');
                    const color = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    msgQuestionColor.delete();
                    color.delete();
                    embedBeforeEdit.setColor(color.content);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '↩️':
                    const msgQuestionField = await message.channel.send('Quel est votre titre du field ?');
                    const titlefield = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    msgQuestionField.delete();
                    titlefield.delete();
                    const msgQuestionDescField = await message.channel.send('Quel est votre description du field ?');
                    const descfield = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    msgQuestionDescField.delete();
                    descfield.delete();
                    embedBeforeEdit.addField(titlefield.content, descfield.content);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '✅':
                    const msgQuestionChannel = await message.channel.send('Merci de mettre id du salon');
                    const channel = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                    msgQuestionChannel.delete();
                    channel.delete();
                    if(!message.guild.channels.cache.get(channel.content)) return message.channel.send('Salon invalide');
                    else message.guild.channels.cache.get(channel.content).send(embedBeforeEdit);
                break;
                case '❌':
                    const msgQuestionFieldTitle = await message.channel.send('Merci de mettre le titre du field à retirer');
                    const field_title = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first();
                    msgQuestionFieldTitle.delete();
                    field_title.delete();
                    let indexField = '';
                    embedBeforeEdit.fields.map(field => {
                        if (indexField !== '') return;
                        if (field.name === field_title.content) indexField+=embedBeforeEdit.fields.indexOf(field);
                    })
                    if (indexField === '') return message.channel.send('Aucun field trouvé').then(msg => msg.delete({timeout: 50000}))
                    delete embedBeforeEdit.fields[indexField];
                    msgEmbedForEditing.edit(embedBeforeEdit);
                 break;
                 case '📥':
                 const msgQuestionChannelID = await message.channel.send("Merci de mettre l'id du salon");
                 const channel_id = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                 msgQuestionChannelID.delete();
                 channel_id.delete();
                 if(!Number(channel_id.content)||!message.guild.channels.cache.get(channel_id.content)) return message.channel.send('Salon invalide').then(msg => msg.delete({timeout: 5000}));
                const msgQuestionMessageID = await message.channel.send("Merci de mettre l'id du message");
                const message_id = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                msgQuestionMessageID.delete();
                message_id.delete();
                if(!Number(message_id.content)||!message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content)) return message.channel.send('Message Invalide').then(msg => msg.delete({timeout: 5000}));
                const msg = await message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content);
                if (msg.embeds.length === 0) return message.channel.send("Ce message n'est pas un embed").then(msg => msg.delete({timeout: 50000}));
                msgEmbedForEditing.edit(msg.embeds); 

                break;
                case '📑':
                  const msgQuestionChannel_ID = await message.channel.send("Merci de mettre l'id du salon");
                  const channel_ID = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                  msgQuestionChannel_ID.delete();
                  channel_ID.delete();
                if(!Number(channel_ID.content)||!message.guild.channels.cache.get(channel_ID.content)) return message.channel.send('Salon invalide').then(msg => msg.delete({timeout: 5000}));
                const msgQuestionMessage_ID = await message.channel.send("Merci de mettre l'id du message");
                const message_ID = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                msgQuestionMessage_ID.delete();
                message_ID.delete();
                if(!Number(message_ID.content)||!message.guild.channels.cache.get(channel_id.content).messages.fetch(message_ID.content)) return message.channel.send('Message Invalide').then(msg => msg.delete({timeout: 5000}));
                const msg1 = await message.guild.channels.cache.get(channel_ID.content).messages.fetch(message_ID.content)
                msg1.edit(msgEmbedForEditing.embeds);
                  break;
            }
        })
    }
  module.exports.help = {
    name: "embed",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet de créer un embed.",
  };