const conf = require("../../../settings/configs/sunucuayar.json");
const moment = require("moment");
moment.locale("tr");
const { red, green, Tac } = require("../../../settings/configs/emojis.json");
let table = require("string-table");
const ayar = require("../../../settings/configs/ayarName.json");
const allah = require("../../../config.json");
const { Discord, PermissionsBitField, ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    conf: {
        aliases: ["ysay", "yetkilises", "sesteolmayan"],
        name: "ysay",
        help: "ysay",
        category: "yönetim",
    },

    run: async (client, message, args, embed, durum) => {
        let kanallar = ayar.ownerkomutkulanım;
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.` }).then((e) => setTimeout(() => { e.delete(); }, 10000));

        if (!conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply("Yeterli Yetkin yok dostum kulanamasın").then(s => setTimeout(() => s.delete().catch(err => { }), 5000));

        let Row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("Aktif Seste Olmayanlar")
                .setStyle(2)
                .setEmoji(Tac)
                .setCustomId("aktifseste"),
            new ButtonBuilder()
                .setLabel("Toplam Seste Olmayanlar")
                .setStyle(2)
                .setEmoji(Tac)
                .setCustomId("toplam"),
            new ButtonBuilder()
                .setLabel(`Toplam Yetkili Bilgisi`)
                .setStyle(2)
                .setDisabled(false)
                .setEmoji(Tac)
                .setCustomId("testt")
        );
        
        message.react(green);
        message.channel.send({
            embeds: [new EmbedBuilder().setDescription(`
\`\`\`fix
Aşağıda bulunan düğmelerden yetkili aktifliğinin filtresini seçiniz!\`\`\`
            `)],
            components: [Row]
        }).then(async (msg) => {
            var filter = (i) => i.user.id == message.member.id;
            let collector = msg.createMessageComponentCollector({ filter: filter, max: 1 });
            
            collector.on("collect", async (i) => {
                if (i.customId == "testt") {
                    let Aloo = [];
                    let teyitciRolleri = message.guild.roles.cache.get(conf.teyitciRolleri);
                    if (teyitciRolleri) {
                        teyitciRolleri.members.filter(uye => !uye.user.bot && !uye.permissions.has(PermissionsBitField.Flags.Administrator) && !uye.roles.cache.has(conf.teyitciRolleri)).forEach(uye => {
                            if (!Aloo.includes(uye.id)) Aloo.push(uye.id);
                        });
                    }
                    
                    message.channel.send(`${green} Aşağıda **${message.guild.name}** sunucusunun bulunan tüm yetkilileri listelenmektedir. (Yetkili sayısı: **${Aloo.length}**)\n\`\`\`${Aloo.length >= 1 ? Aloo.map(x => `<@${x}>`).join(", ") : "Tebrikler! Tüm yetkilileriniz seste."}\`\`\``).then(x => {
                        // Burada bir şey yapabilirsiniz
                    });
                }
                
                if (i.customId == "aktifseste") {
                    let Genel = [];
                    let teyitciRolleri = message.guild.roles.cache.get(conf.teyitciRolleri);
                    if (teyitciRolleri) {
                        teyitciRolleri.members.filter(uye => !uye.user.bot && !uye.permissions.has(PermissionsBitField.Flags.Administrator) && !uye.roles.cache.has(conf.teyitciRolleri) && uye.presence && uye.presence?.status !== "offline" && !uye.voice.channel).forEach(uye => {
                            if (!Genel.includes(uye.id)) Genel.push(uye.id);
                        });
                    }
                    
                    message.channel.send(`${green} Aşağıda aktif fakat seste olmayan **${message.guild.name}** sunucusunun tüm yetkilileri listelenmektedir. (Seste olmayan yetkili sayısı: **${Genel.length}**)\n\`\`\`${Genel.length >= 1 ? Genel.map(x => `<@${x}>`).join(", ") : "Tebrikler! Tüm yetkilileriniz seste."}\`\`\``).then(x => {
                        // Burada bir şey yapabilirsiniz
                    });
                }
                
                if (i.customId == "toplam") {
                    let Genel = [];
                    let teyitciRolleri = message.guild.roles.cache.get(conf.teyitciRolleri);
                    if (teyitciRolleri) {
                        teyitciRolleri.members.filter(uye => !uye.user.bot && !uye.permissions.has(PermissionsBitField.Flags.Administrator) && !uye.roles.cache.has(conf.teyitciRolleri) && !uye.voice.channel).forEach(uye => {
                            if (!Genel.includes(uye.id)) Genel.push(uye.id);
                        });
                    }
                    
                    message.channel.send(`${green} Aşağıda seste olmayan **${message.guild.name}** sunucusunun tüm yetkilileri listelenmektedir. (Seste olmayan yetkili sayısı: **${Genel.length}**)\n\`\`\`${Genel.length >= 1 ? Genel.map(x => `<@${x}>`).join(", ") : "Tebrikler! Tüm yetkilileriniz seste."}\`\`\``).then(x => {
                        // Burada bir şey yapabilirsiniz
                    });
                }
            });
            
            collector.on("end", i => {
                msg.delete().catch(err => {});
            });
        });
    }
};
