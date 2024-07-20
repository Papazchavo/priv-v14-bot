const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, Colors, PermissionsBitField } = require('discord.js')

    module.exports = {
        conf: {
          aliases: ["cihaz"],
          name: "cihaz",
          help: "cihaz <papaz/ID>",
          category: "sahip",
          owner: true,
        },
    
  
    run: async (client, message, args) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        let clientStatus = member.presence.clientStatus;
        let cihazEmbed = new EmbedBuilder()
        .setColor(Colors.DarkButNotBlack)
        .setDescription(`${member} üyesinin şu anki cihazları;\n\n${Object.keys(member.presence.clientStatus).map(c => `\`•\` ${c.replace("desktop", "Masaüstü Uygulaması").replace("mobile", "Mobil Cihaz").replace("web", "İnternet Tarayıcısı")} (${clientStatus[c].replace("online", "Çevrim içi").replace("dnd", "Rahatsız etmeyin").replace("idle", "Boşta")})`).join("\n")}`)
        message.channel.send({embeds: [cihazEmbed]});
    },

}