const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js");
const conf = require("../../../settings/configs/sunucuayar.json")
const emoji = require("../../../settings/configs/emojis.json")
const { green, red } = require("../../../settings/configs/emojis.json")
const allah = require("../../../config.json");
module.exports = {
  conf: {
    aliases: ["help", "y", "help","yardım"],
    name: "yardım",
  },
 
  run: async (client, message, args, embed, prefix) => {
    let kanallar = ["bot-commands","bot-command"];    
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    

    let butttonRow = new ActionRowBuilder()
    .addComponents(
         new ButtonBuilder()
        .setCustomId("papaz")
        .setStyle(2)
        .setLabel(allah.GuildName)
        .setDisabled(true)
    )

let msg = await message.channel.send({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`
> **${message.guild.name}** Kullanılacak Komutlar Aşagıdan Bakarak Görebilirsiniz!

\`\`\`Register\`\`\`
\`.e\` **İD/Kişi İsim Yaş Yada Tek İsim**
\`.k\` **İD/Kişi İsim Yaş Yada Tek İsim**
\`.kayıtsız\` **İD/Kişi Kayıtsız Rolü Veriri**
\`.isim\` **İD/Kişi İsim Yaş Yada Tek İsim**
\`\`\`Stats\`\`\`
\`.stats\` **Sunucu Verisi Görürsün**
\`.rolstat\` **Rol Verisi Görürsün**
\`.topstat\` **Toplam Verisi Görürsün**
\`\`\`User\`\`\`
\`.afk\` **Sunucuda afk Atarsın**
\`.avatar\`
\`.banner\`
\`.cihaz\` **Kişin Hangi Cihaz da onu görürsün**
\`.çek\` **Birini Çekersin Yanına**
\`.git\` **Birini Yanına Gidersin**
\`\`\`General\`\`\`
\`.Kilit\` **Kanalı Kitlersin**
\`.menülock\` **Menü Den Kanalı Seçersin**
\`.menütaşı\` **Menü den Kişi Taşırsın**
\`.rollog\` **Rol deki Kişileri Görürsün**
\`.rolver\` **Kişiye Rol Verirsin**
\`.say\`
\`.seslog\` **Ses Verileri Görürsün**
\`.ship\`
\`.tweet\`
\`.sil\` **100 Kadar Sile Bilirsin**
\`.sn\` **Silinen Mesajı Atar**
\`.svkontrol\` **Sunucu Verilerini Atar**
\`.taşı\`
\`.toplantı\`
\`.yasaklıtag\`
\`.ysay\` **Sunucuda Aktif Sesde Olmayan Yetkili Verisi**
\`.zengin\` **Sunucuda Boost Basanlar İsim Hakkı**
\`\`\`Moderasyon\`\`\`
\`.banliste\` **Sunucu Ban Liste Görürsün**
\`.cezapuan\` **Ceza Skorunu Görürsün**
\`.cezasorgu\` **Atılmış Cezanın Sorgusunu Görürsün**
\`.sicil\` **Kişinin Siciline Bakarsın**
\`.topceza\` **Toplu Cezaları Görürsün**
\`.ban\` 
\`.jail\` 
\`.yargi\` **Kalıcı Ban Atarsın**
\`.karantina\`
\`.mute\`
\`.punish\`
\`.reklam\` **Foto Atarak Cezalandırısın**
\`.sesengel\`
\`.sesmute\`
\`.timeout\` **Zaman Aşımı Uygularsın**
\`.unban\` **Ban Kaldırısın**
\`.unbanall\` **Herkezin Afını Verirsin**
\`.unjail\` **Cezası Kalkar**
\`.unmute\` **Cezası Kalkar**
\`.unsesengel\` **Cezası Kalkar**
\`\`\`Owner İD Olaranlar Kulana Bilir!\`\`\`
\`.setup\` **Botun Ayaranı Yaparsın**
\`.Bots\` **Botu Foto,İsim, Degişme Komut**
\`.emoji\` **Emoji Yüklersin emoji seç isim gir**
\`.giriş\` **Buton Priv Sunuculara Özel**
\`.giveaway\` **Sunucuda Çekiliş Başlatırsın**
\`.reroll\` **Sunucuda Çekilişi Kazanını Seçersin**
\`.pl\` **Kısayoların Komudu**
\`.Kurulum\` **Botun Loglarını Emojilerini Menü Rol Seçimini Yapılandırı**
\`.menü\` **Rol Seçim Menüsü**
\`.özelkomut\` **Kendine Özel Bir Komut Yaratırsın**
\`.pm2\` **restart atarsın Örnek, pm2 restart all**
\`.rolsuz\` **Rolü Olmayan Kişiye rol veriri Sunucuda**

`)], components: [ butttonRow] })


}
} 
