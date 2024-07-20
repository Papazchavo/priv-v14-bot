const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const conf = require("../../../settings/configs/sunucuayar.json")
const snipe = require("../../../settings/schemas/snipe");
const moment = require("moment");
require("moment-duration-format");
const {  green, red } = require("../../../settings/configs/emojis.json");
const ayar = require("../../../settings/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["snipe","sn"],
    name: "snipe",
    help: "snipe",
    category: "yetkili",
  },

  run: async (client, message, args) => {
    
    if(!conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
      message.react(red)
      return
    }
    let hembed = new EmbedBuilder().setAuthor({name: message.member.displayName, iconURL: message.author.displayAvatarURL({dynamic: true})})
    message.react(green)

    const data = await snipe.findOne({ guildID: message.guild.id, channelID: message.channel.id });
    if (!data) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu kanalda silinmiş bir mesaj bulunmuyor`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }

const author = await client.user.fetch(data.author);
hembed.setDescription(`
\`\`\`fix\n${data.messageContent ? `${data.messageContent}` : ""}\`\`\`

__Mesaj Sahibi__ <@${data.userID}> - (\`${data.userID}\`)

__Mesajın Yazılma Tarihi__ <t:${Math.floor(data.createdDate / 1000)}:R>

__Mesajın Silinme Tarihi__ <t:${Math.floor(data.deletedDate / 1000)}:R>
`);
 message.channel.send({ embeds: [hembed] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
  
},
};
