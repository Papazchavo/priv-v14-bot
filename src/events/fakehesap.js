const { EmbedBuilder } = require("discord.js");
const conf = require("../../settings/configs/sunucuayar.json");
const client = global.bot;

module.exports = async (member) => {

  
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  if (guvenilirlik) {
  if(conf.fakeAccRole) member.roles.add(conf.fakeAccRole).catch();
  }

  const embed = new EmbedBuilder()
  .setColor("Random") // Embed'in kenar rengi
  .setTitle('Şüpheli Üye Bildirimi')
  .setDescription(`${bann} ${member.user.tag} isimli üye sunucuya katıldı fakat hesabı (<t:${accountCreationDate}:R>) açıldığı için şüpheli olarak işaretlendi.`)

client.channels.cache.find(x => x.name == "fake_hesap_log").wsend({ embeds: [embed]})

};

module.exports.conf = {
  name: "fakehesap",
};
