const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const conf = require("../../../settings/configs/sunucuayar.json")
const { red, green } = require("../../../settings/configs/emojis.json")
const ayar = require("../../../settings/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["rolver","rol-ver","r"],
    name: "rolver",
    help: "rolver <papaz/ID> <Role/ID>",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if(!conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.reply({ content:`Malesef yetkin bulunmamakta dostum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }

    if (!args[0]) return message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Kullanımı: !r al/ver Kullanıcı Rol`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    if (args[0] != "al") {
        if (args[0] != "ver") {
            return message.reply({ embeds: [new EmbedBuilder()
              .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
              .setThumbnail()
              .setDescription(`${red} Kullanımı: !r al/ver Kullanıcı Rol`)
              ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        }
    }

    if (!args[1]) return message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bir üye etiketle ve tekrardan dene`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[1])
    if (!rMember) return message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bir üye etiketle ve tekrardan dene`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));

    if (!args[2]) return message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Rolü belirtmelisin`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
        if (!role) return message.reply({ embeds: [new EmbedBuilder()
          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setThumbnail()
          .setDescription(`${red} Belirtmiş olduğun rolü bulamadım ! Düzgün bir rol etiketle veya ID belirtip tekrar dene`)
          ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        if (message.member.roles.highest.rawPosition <= role.rawPosition) return message.reply({ embeds: [new EmbedBuilder()
          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setThumbnail()
          .setDescription(`${red} Kendi rolünden yüksek veya eşit bir rolle işlem yapamazsın`)
          ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
       

        if (args[0] == "al") {
          if (rMember.roles.cache.has(role.id)) {
            rMember.roles.remove(role.id)
            message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${rMember} Kişisinden ${role} rolünü aldım.`)]})
          } else {
            message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${rMember} Kişisinde ${role} rolü mevcut değil.`)]})
          }
      }
      if (args[0] == "ver") {
          if (!rMember.roles.cache.has(role.id)) {
            rMember.roles.add(role.id)
            message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${rMember} Kişisine ${role} rolünü ekledim.`)]})
          } else {
            message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${rMember} Kişisinde ${role} rolü zaten mevcut.`)]})
          }
      }
   },
 };
