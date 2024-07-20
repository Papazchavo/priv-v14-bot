const { PermissionsBitField, ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require('discord.js');
const messageUser = require("../../../settings/schemas/messageUser");
const voiceUser = require("../../../settings/schemas/voiceUser");
const voiceUserParent = require("../../../settings/schemas/voiceUserParent");
const inviterSchema = require("../../../settings/schemas/inviter");
const inviteMemberSchema = require("../../../settings/schemas/inviteMember");
const nameData = require("../../../settings/schemas/names")
const allah = require("../../../config.json");
const ayarlar = require("../../../settings/configs/sunucuayar.json")
const { yetkili,gorevli,basvuru,nokta,hac  } = require("../../../settings/configs/emojis.json")
const conf = require("../../../settings/configs/sunucuayar.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["pl"],
    name: "buttonpanel",
    help: "buttonpanel",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    const bpanelrow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('kısayollar')
            .setPlaceholder(`Seçim Yap`)
            .addOptions([
                { label: 'Katılım Tarihi',description: 'Sunucuya Giriş Tarihinizi Öğrenin.', value: 'I',},
                { label: 'Hesap Tarihi',description: 'Hesabınızın Açılış Tarihini Öğrenin.', value: 'III',},
                { label: 'Rol Bilgi',description: 'Üzerinizde Bulunan Rollerin Listesini Atar.', value: 'II',},
                { label: 'HaftalıK İstatistikler',description: 'Sunucudaki HaftalıK İstatistikler Görüntüleyin.', value: 'VIII',},
                { label: 'İsim Geçmişi',description: 'Önceki İsim Bilgilerinizi Öğrenin.', value: 'VII',},
             ]),
    );

const msg = await message.reply({ content : `${hac}**${allah.GuildName}** Kullanıcı Menüsü`, components: [bpanelrow] });

  },
};

client.on('interactionCreate', async interaction => {
  
    if (!interaction.isSelectMenu()) return;

    const member = interaction.user;
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    const data = await nameData.findOne({ guildID: allah.GuildID, userID: member.id });
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    const messageData = await messageUser.findOne({ guildID: allah.GuildID, userID: interaction.user.id });
    const voiceData = await voiceUser.findOne({ guildID: allah.GuildID, userID: interaction.user.id });
    
      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    const category = async (parentsArray) => {
      const data = await voiceUserParent.find({ guildID: allah.GuildID, userID: member.id });
      const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
      let voiceStat = 0;
      for (var i = 0; i <= voiceUserParentData.length; i++) {
        voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
      }
      return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    

if(interaction.values[0] === "I")
{
await interaction.reply({ content: `**Sunucuya Giriş Tarihiniz :** <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}> (<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:R>)`, ephemeral: true });
}

if(interaction.values[0] === "II")
{
await interaction.reply({ content: `**Üzerinde Bulunan Rollerin Listesi ;**
        
${(await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`, ephemeral: true });
}

if(interaction.values[0] === "III")
{
await interaction.reply({ content: `**Hesabınız** <t:${Math.floor(member.createdTimestamp / 1000)}>  (<t:${Math.floor(member.createdTimestamp / 1000)}:R>) **Tarihinde Açılmış**`, ephemeral: true });
}

if(interaction.values[0] === "V")
{
await interaction.guild.members.cache.get(member.id).roles.cache.has(conf.boosterRolu) ? interaction.guild.members.cache.get(member.id).roles.set([conf.boosterRolu, conf.unregRoles[0]]) : interaction.guild.members.cache.get(member.id).roles.set(conf.unregRoles)
await interaction.reply({ content: `${member.toString()} üyesi başarıyla kayıtsıza atıldı!`, ephemeral: true });
}

if(interaction.values[0] === "V")
  {
  await interaction.guild.members.cache.get(member.id).roles.cache.has(conf.boosterRolu) ? interaction.guild.members.cache.get(member.id).roles.set([conf.boosterRolu, conf.unregRoles[0]]) : interaction.guild.members.cache.get(member.id).roles.set(conf.unregRoles)
  await interaction.reply({ content: `${member.toString()} üyesi başarıyla kayıtsıza atıldı!`, ephemeral: true });
  }
  

if(interaction.values[0] === "VI")
{
await interaction.reply({ content: `
**Sesli Kanallardaki Toplam Üye Sayısı :** \`${(interaction.guild.members.cache.filter((x) => x.voice.channel).size)}\`
**Sunucudaki Toplam Üye Sayısı :** \`${(interaction.guild.memberCount)}\`
**Sunucunun Oluşturulma Tarihi :** \`${moment(interaction.guild.createdAt).locale("tr").format("LLL")}\`
**Sunucu Destek/Id Numarası :** \`${(interaction.guild.id)}\`
`, ephemeral: true });
}

if(interaction.values[0] === "VII")
{
const ambed = new EmbedBuilder()
.setAuthor({ name: `${member.username} üyesinin isim bilgileri;`})
.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setDescription(data ? data.names.splice(0, 10).map((x, i) => `\` ${i + 1} \` \` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""} ${x.yetkili ? `(<@${x.yetkili}>)` : ""} <t:${Math.floor(x.date / 1000)}:R>`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")         
await interaction.reply({ embeds: [ambed], ephemeral: true });
}

if(interaction.values[0] === "VIII")
{
await interaction.reply({ content: `
${member.toString()}

Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`

Haftalık Ses: \`${voiceWeekly} ses\`
Günlük Ses: \`${voiceDaily} ses\`
`, ephemeral: true });
}

if (!interaction.isSelectMenu()) return;

if(interaction.customId === "VVVV")
  {
  await interaction.guild.members.cache.get(member.id).roles.cache.has(ayarlar.boosterRolu) ? interaction.guild.members.cache.get(member.id).roles.set([ayarlar.boosterRolu, ayarlar.unregRoles[0]]) : interaction.guild.members.cache.get(member.id).roles.set(ayarlar.unregRoles)
  await interaction.reply({ content: `${member.toString()} üyesi başarıyla kayıtsıza atıldı!`, ephemeral: true });
  }


})