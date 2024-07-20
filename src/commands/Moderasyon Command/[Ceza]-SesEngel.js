const { PermissionsBitField } = require("discord.js");
const VoiceKickModel = require("../../../settings/schemas/voiceEngel")

module.exports = {
    conf: {
      aliases: ["sesengel"],
      name: "sesengel",
      help: "sesengel",
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
  
      // Veritabanına kayıt ekleme
      await VoiceKickModel.findOneAndUpdate({ guildID, userID }, { guildID, userID }, { upsert: true });
  
      message.channel.send(`${member} artık sese girdiğinde atılacak.`);
    }
  };