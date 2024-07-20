const { PermissionsBitField } = require("discord.js");
const moment = require("moment");
const emojis = require("../../../settings/configs/emojis.json")
const penals = require("../../../settings/schemas/penals")
const cezapuan = require("../../../settings/schemas/cezapuan")
const ceza = require("../../../settings/schemas/ceza")
moment.locale("tr");
const client = global.bot; 
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["cezasorgu","sorgu","ceza"],
    name: "cezasorgu",
    help: "cezasorgu <Ceza-ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (isNaN(args[0])) return message.channel.send({ content:"Ceza ID'si bir sayı olmalıdır!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    const data = await penals.findOne({ guildID: message.guild.id, id: args[0] });
    if (!data) return message.channel.send({ content:`${args[0]} ID'li bir ceza bulunamadı!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: data.userID });
    const cezapuanData = await cezapuan.findOne({ userID: data.userID });
    var cezasayı = `${cezapuanData ? cezapuanData.cezapuan : 0}`

    let durum;
    if(cezasayı < 5) durum = "Çok Güvenli";
    if(cezasayı >= 5 && cezasayı < 20) durum = "Güvenli";
    if(cezasayı >= 20 && cezasayı < 30) durum = "Şüpheli";
    if(cezasayı >= 30 && cezasayı < 40) durum = "Tehlikeli";
    if(cezasayı >= 50) durum = "Çok Tehlikeli";

    const xd = embed
   // .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setDescription(`
${message.guild.name} sunucusunda <@${data.userID}> kullanıcısının ID'si verilen ceza bilgisi aşağıda listelenmiştir.

**Ceza-i İşlemi**
\`\`\`cs
ID => ${data.id}
Ceza Durumu: ${data.active ? `🟢 (Aktif)` : `🔴 (Bitti)`}
Yetkili => ${client.users.cache.get(data.staff).tag}
Tür => ${data.type}
Sebep => ${data.reason}
Bitiş Tarihi => ${data.finishDate ? `${moment(data.finishDate).format("LLL")}` : "Bulunmamaktadır."}
\`\`\`
**Tüm Ceza-i İşlemler** (\`Toplam ${cezaData ? cezaData.ceza.length : 0} Ceza - ${durum} \`)
`)

    message.channel.send({ embeds: [xd] });
  },
};