const { PermissionsBitField, EmbedBuilder,ActionRowBuilder,ButtonBuilder } = require("discord.js");
const moment = require("moment");
const ceza = require("../../../settings/schemas/ceza");
const cezapuan = require("../../../settings/schemas/cezapuan")
const banLimit = new Map();
moment.locale("tr");
const conf = require("../../../settings/configs/sunucuayar.json")
const allah = require("../../../config.json");
const { red, green, bann } = require("../../../settings/configs/emojis.json")
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["ban","yargı"],
    name: "ban",
    help: "ban <papaz/ID> <Sebep>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 


    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red)
    return }
    if (!args[0]) { message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Bir üye belirtmelisin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    message.react(red)
    return }
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!user) { message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Böyle bir kullanıcı bulunamadı!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    message.react(red)
    return }
    const ban = await client.fetchBan(message.guild, args[0]);
    if (ban) { message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Bu üye zaten banlı!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    message.react(red)
    return }
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    const member = message.guild.members.cache.get(user.id);

    if (message.guild.members.cache.has(user.id) && message.guild.members.cache.get(user.id).permissions.has(PermissionsBitField.Flags.ViewAuditLog)) return message.channel.send({ content:"Üst yetkiye sahip kişileri yasaklayamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    if (message.guild.members.cache.has(user.id) && message.member.roles.highest.position <= message.guild.members.cache.get(user.id).roles.highest.position) return message.channel.send({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    if (member && !member.bannable) return message.channel.send({ content:"Bu üyeyi banlayamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    if (allah.Main.banlimit > 0 && banLimit.has(message.author.id) && banLimit.get(message.author.id) == allah.Main.banlimit) return message.channel.send({ content:"Saatlik ban sınırına ulaştın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(green)
    if (allah.Main.dmMessages) user.send({ content:`\`${message.guild.name}\` sunucusundan \`${message.author.tag}\` tarafından \`${reason}\` sebebiyle banlandınız!`}).catch(() => {});
    message.guild.members.ban(user.id, { reason: `${reason} | Yetkili: ${message.author.tag}` , days:1}).catch(() => {});
    const penal = await client.penalize(message.guild.id, user.id, "BAN", true, message.author.id, reason);
    const papazbuton = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('papaz').setLabel("Sunucudan Yasaklandı").setStyle(2).setEmoji(bann).setDisabled(true))

    message.reply({ content:`${bann} ${member ? member.toString() : user.username} Üyesi Sunucudan \`${reason}\` Sebebiyle ${message.author} Tarafından banlandı Ceza Numarası: (\`#${penal.id}\`)
    
    `,components:[papazbuton],files:["https://i.makeagif.com/media/5-03-2019/VMiwHX.gif"]}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    
    message.react(green)
 
    const log = new EmbedBuilder()
      .setDescription(`**${member ? member.user.tag : user.username}** adlı kullanıcı **${message.author.tag}** tarafından banlandı.`)
      .addFields(
        { name: "Cezalandırılan",  value: `[${member ? member.user.tag : user.username}](https://discord.com/users/${user.id})`, inline: true },
        { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
        { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
        )
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
      message.guild.channels.cache.get(conf.banLogChannel).send({ embeds: [log]});

    if(!member) return;
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { BanAmount: 1 } }, {upsert: true});
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 100 } }, { upsert: true });

    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi ban cezası alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (allah.Main.banlimit > 0) {
        if (!banLimit.has(message.author.id)) banLimit.set(message.author.id, 1);
        else banLimit.set(message.author.id, banLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (banLimit.has(message.author.id)) banLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
  },
};

