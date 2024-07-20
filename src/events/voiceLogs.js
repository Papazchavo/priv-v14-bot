const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const moment = require("moment");
moment.locale("tr")
const { Mute, Revuu, kirmiziok, green, red } = require("../../settings/configs/emojis.json")
const conf = require("../../settings/configs/sunucuayar.json")
const allah = require("../../config.json");
const client = global.bot;

module.exports = async (oldState, newState) => {
if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
const channel = client.channels.cache.find(x => x.name == "voice_log");
if (!channel) return;

if (!oldState.channel && newState.channel) {
const newchannelmember = newState.channel.members
.map((x) => `<@${x.user.id}>`)
.splice(0, 20)
.join(", ");

channel.wsend({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})}).setThumbnail(newState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
.setDescription(`
${green} ${newState.member} isimli kullanıcı bir sesli kanalına girdi.

Ses Kanalı: <#${newState.channel.id}>
Girdiği Zaman: <t:${Math.floor(Date.now() / 1000)}:R>

\`\`\`fix\n-Kanalında bulunan üyeler şunlardır;\n\`\`\`
${newchannelmember}
`)]});
return }
if (oldState.channel && !newState.channel) {
  const oldchannelmember = oldState.channel.members
  .map((x) => `<@${x.user.id}>`)
  .splice(0, 20)
  .join(", ");

channel.wsend({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})}).setThumbnail(oldState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
.setDescription(`
${red} ${oldState.member} isimli kullanıcı bir sesli kanalından ayrıldı.
  
Ses Kanalı: <#${oldState.channel.id}>
Çıktığı Zaman: <t:${Math.floor(Date.now() / 1000)}:R>

\`\`\`fix\n-Kanalında bulunan üyeler şunlardır;\n\`\`\`
${oldchannelmember}
`)]});
return }
if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id) {
const newchannelmember = newState.channel.members
.map((x) => `<@${x.user.id}>`)
.splice(0, 20)
.join(", ");
const oldchannelmember = oldState.channel.members
.map((x) => `<@${x.user.id}>`)
.splice(0, 20)
.join(", ");

channel.wsend({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})}).setThumbnail(newState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
.setDescription(`
${green} ${newState.member} isimli kullanıcı bir sesli kanal değişimi yaptı.
    
Ses Kanal Değişikliği: <#${oldState.channel.id}> => <#${newState.channel.id}>
Değişim Zamanı: <t:${Math.floor(Date.now() / 1000)}:R> 

\`\`\`fix\n-Eski Kanalında bulunan ilk 20 üye şunlardır;\n\`\`\`
${oldchannelmember}
\`\`\`fix\n-Yeni Kanalında bulunan ilk 20 üye şunlardır;\n\`\`\`
${newchannelmember}
`)]});
return }

const channel2 = client.channels.cache.find(x => x.name == "mute_deaf_log");
if (!channel2) return;

if (oldState.channel.id && oldState.selfMute && !newState.selfMute) {
channel2.wsend({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})}).setThumbnail(newState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
.setDescription(`
${red} ${newState.member} isimli kullanıcı bir sesli kanalda kendi susturmasını kaldırdı.
      
Ses Kanalı: <#${newState.channel.id}>
Susturma Kaldırma Zamanı: <t:${Math.floor(Date.now() / 1000)}:R>
`)]});
return }
if (oldState.channel.id && !oldState.selfMute && newState.selfMute) {
channel2.wsend({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})}).setThumbnail(newState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
.setDescription(`
${green} ${newState.member} isimli kullanıcı bir sesli kanalda kendini susturdu.
      
Ses Kanalı: <#${newState.channel.id}>
Susturma Zamanı: <t:${Math.floor(Date.now() / 1000)}:R>
`)]});
return }
if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) {
channel2.wsend({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})}).setThumbnail(newState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
.setDescription(`
${red} ${newState.member} isimli kullanıcı bir sesli kanalda kendi sağırlaştırmasını kaldırdı.
      
Ses Kanalı: <#${newState.channel.id}>
Sağırlaştırma Kaldırma Zamanı: <t:${Math.floor(Date.now() / 1000)}:R>
`)]});
return }
if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) {
channel2.wsend({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})}).setThumbnail(newState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
.setDescription(`
${green} ${newState.member} isimli kullanıcı bir sesli kanalda kendini sağırlaştırdı.
      
Ses Kanalı: <#${newState.channel.id}>
Sağırlaştırma Zamanı: <t:${Math.floor(Date.now() / 1000)}:R>
`)]});
return }

const channel3 = oldState.guild.channels.cache.get(conf.vmuteLogChannel);
if (!channel3) return;
let logs = await oldState.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberUpdate });
let entry = logs.entries.first();
if (!oldState.serverMute && newState.serverMute) return channel3.wsend({ embeds: [
  new EmbedBuilder()
  .setDescription(`**${newState.member ? newState.member.user.tag : newState.member.user.username}** adlı kullanıcıya **${entry.executor.tag}** tarafından Sağ-tık susturma işlemi yapıldı.`)
  .addFields(
    { name: "Cezalandırılan",  value: `[${newState.member ? newState.member.user.tag : newState.member.user.username}](https://discord.com/users/${newState.member.user.id})`, inline: true },
    { name: "Cezalandıran",  value: `[${entry.executor.tag}](https://discord.com/users/${entry.executor.id})`, inline: true },
    { name: "Atılan Kanal",  value: `<#${newState.channel.id}>`, inline: true },
    )
  .setFooter({ text:`${moment(Date.now()).format("LLL")}` })]});
};

module.exports.conf = {
  name: "voiceStateUpdate",
};