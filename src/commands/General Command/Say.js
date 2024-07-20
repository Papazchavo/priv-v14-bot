const { PermissionsBitField,EmbedBuilder,ActionRowBuilder, ButtonBuilder,ButtonStyle } = require("discord.js");
const conf = require("../../../settings/configs/sunucuayar.json")
const { red, green,Loading  } = require("../../../settings/configs/emojis.json")
const emoji = require("../../../settings/configs/emojis.json")
const allah = require("../../../config.json");
const ayar = require("../../../settings/configs/ayarName.json");
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));  

    if(!conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
    let Tag = conf.tag 
    

    var takviye = (message.guild.premiumSubscriptionCount)
    var takviyesayı = (message.guild.premiumTier)
    var TotalMember = (message.guild.memberCount)
    var AktifMember = (message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)
    var sesli = (message.guild.members.cache.filter((x) => x.voice.channel).size)

    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("detaylısay")
        .setLabel("Detaylı Say")
        .setEmoji(green)
        .setStyle(ButtonStyle.Secondary),
        
      new ButtonBuilder()
        .setCustomId("yenile")
        .setLabel("Yenile")
        .setEmoji(Loading)
        .setStyle(ButtonStyle.Secondary),
  
    );

    message.react(green)
let sayembed = new EmbedBuilder()
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\`•\` Sunucuda Toplam **${TotalMember}** (\`${AktifMember} Aktif\`) Kullanıcı Bulunmakta.
\`•\` Şu An Sesli Kanallarda **${sesli}** (\`+${message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size} Bot\`) Kişi Bulunmakta.
\`•\` Sunucumuzda toplam (**${takviye}**) boost bulunmakta.
`)

let msg = await message.channel.send({ embeds: [sayembed], components : [row],})
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

  if(button.customId === "yenile") {

   let sayembed1 = new EmbedBuilder()
   .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
               .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\`•\` Sunucuda Toplam **${TotalMember}** (\`${AktifMember} Aktif\`) Kullanıcı Bulunmakta.
\`•\` Şu An Sesli Kanallarda **${sesli}** (\`+${message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size} Bot\`) Kişi Bulunmakta.
\`•\` Sunucumuzda toplam (**${takviye}**) boost bulunmakta.
`)

button.update({
      embeds: [sayembed1], components: [row]
  })
}

  if(button.customId === "detaylısay") {

    const row2 = new ActionRowBuilder()
		.addComponents(
  new ButtonBuilder().setCustomId("yenile").setLabel("◀️ Geri").setStyle(ButtonStyle.Secondary),
	);

    var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.teyitciRolleri[0])).size

    button.update({
      embeds: [embed
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setDescription(`
\`\`\`fix
Aşağıda Sunucu Verilerini Daha Detaylı Görebilirsiniz.
\`\`\`
       \`•\` **Sunucunun Toplam Üye Sayısı :** \`${(message.guild.memberCount)}\`
       \`•\` **Sunucudaki Toplam Aktif Kullanıcı Sayısı :** \`${AktifMember}\`
       \`•\` **Sesli Kanallardaki Toplam Üye Sayısı :** \`${sesli}\`
       \`•\` **Sesli Kanallardaki Toplam Bot Sayısı :** \`${message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size}\`
       \`•\` **Sunucunun Toplam Yetkili Sayısı :** \`${ToplamYetkili}\`  
       \`•\` **Sunucunun Boost Sayısı :** \`${takviye}\`
       \`•\` **Sunucudaki Bot Sayısı :** \`${message.guild.members.cache.filter(x => x.user.bot).size}\`
\`\`\`fix
Aşağıda Saate Göre Giriş İstatistiği Verilmiştir.
\`\`\`
       \`•\` **1 saat :** \`${(message.guild.members.cache.filter(papaz => (new Date().getTime() - papaz.joinedTimestamp) < 1000 * 60 * 60).size)}\` kullanıcı giriş yapmış.
       \`•\` **1 gün :** \`${(message.guild.members.cache.filter(papaz => (new Date().getTime() - papaz.joinedTimestamp) < 1000 * 60 * 60 * 24).size)}\` kullanıcı giriş yapmış.
       \`•\` **1 hafta :** \`${(message.guild.members.cache.filter(papaz => (new Date().getTime() - papaz.joinedTimestamp) < 1000 * 60 * 60 * 24 * 7).size)}\` kullanıcı giriş yapmış.
       \`•\` **1 ay :**\`${(message.guild.members.cache.filter(papaz => (new Date().getTime() - papaz.joinedTimestamp) < 1000 * 60 * 60 * 24 * 30).size)}\` kullanıcı giriş yapmış.
      `)

    ], components: [row2]
  })
}


})
            collector.on('end', () => {
  const timeoutroww = new ActionRowBuilder()
  .addComponents(
  new ButtonBuilder().setCustomId("detaylısay").setLabel("Detaylı").setStyle(ButtonStyle.Secondary).setDisabled(true),
  new ButtonBuilder().setCustomId("yenile").setLabel("♻️ Yenile").setStyle(ButtonStyle.Secondary).setDisabled(true),
);
 msg.edit({components: [timeoutroww]})
            });

          } }