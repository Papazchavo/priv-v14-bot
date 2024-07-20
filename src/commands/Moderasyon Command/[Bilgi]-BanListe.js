const { PermissionsBitField } = require("discord.js");
const moment = require("moment");
const ceza = require("../../../settings/schemas/ceza");
const cezapuan = require("../../../settings/schemas/cezapuan")
const banLimit = new Map();
moment.locale("tr");
const conf = require("../../../settings/configs/sunucuayar.json")
const allah = require("../../../config.json");
const { red, green } = require("../../../settings/configs/emojis.json")
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["banlist","yargılist","banliste"],
    name: "banliste",
    help: "banliste",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {

    
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red)
    return }
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    let toplamBan = 0
    await message.guild.bans.fetch().then(async (banned) => {
        toplamBan = banned.size
    })
    if(toplamBan == 0) {
      message.channel.send({ content: `Sunucuda banlanmış üye bulunmamaktadır.` });
    } else if(toplamBan > 0) {
    message.guild.bans.fetch().then(banned => {
    let text = banned.map(user => `ID: | Kullanıcı Adı:\n${user.user.id} | ${user.user.tag}`).join('\n'); 
    message.channel.send({ content:`Sunucudan siktir edilen toplam **${banned.size}** yasaklı kullanıcı listesi;`, files: [{ attachment: Buffer.from(text), name: "banlist.js" }] });
    })
  }
  },
};