const { PermissionsBitField } = require("discord.js");
const VoiceKickModel = require("../../../settings/schemas/voiceEngel");

module.exports = {
  conf: {
    aliases: ["sesengelac"],
    name: "sesengelac",
    help: "Belirtilen kullanıcının ses kanallarına giriş engelini kaldırır.",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) // İlgili yetkiyi kontrol et
      return message.channel.send("Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!");

    const member = message.mentions.members.first(); // Etiketlenen kullanıcıyı al
    if (!member) return message.channel.send("Lütfen bir kullanıcı etiketleyin.");

    const guildID = message.guild.id;
    const userID = member.id;

    // Veritabanından kaydı silme
    const voiceKickRecord = await VoiceKickModel.findOneAndDelete({ guildID, userID });
    if (!voiceKickRecord) return message.channel.send(`${member} zaten ses engelli değil.`);

    message.channel.send(`${member} artık ses kanallarına giriş yapabilir.`);
  }
};
