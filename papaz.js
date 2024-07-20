const { Client, Collection, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const client = global.bot = new Client({ fetchAllMembers: true, intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const discordModals = require('discord-modals');
discordModals(client);
const conf = require("./settings/configs/sunucuayar.json");
const fs = require("fs");
const moment = global.moment = require("moment");
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
const { Discord,Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder,EmbedBuilder,ButtonBuilder,ActivityType } = require("discord.js")
const { Database } = require("ark.db");
const papazdb = (global.papazsetupxd = new Database("./settings/configs/sunucuayar.json"));
const emojidb = (global.emojidb = new Database("./settings/configs/emojis.json"));
const allah = require("./config.json");
//KOMUT ÇALIŞTIRMA
fs.readdir('./src/Commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[Papaz] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/Commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/Commands/${f}/` + file);
        console.log(`[Papaz Commands] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
    console.log(`[Papaz] ${files.length} komut yüklenecek.`);
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
.login(allah.Main.ModerationToken)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });


///// slash commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');  
client.slashcommands = new Collection();
var slashcommands = [];

fs.readdirSync('./src/Slashcommands/').forEach(async category => {
  const commands = fs.readdirSync(`./src/Slashcommands/${category}/`).filter(cmd => cmd.endsWith('.js'));
  for (const command of commands) {
  const Command = require(`./src/Slashcommands/${category}/${command}`);
  client.slashcommands.set(Command.data.name, Command);
  slashcommands.push(Command.data.toJSON());
  }
});

const rest = new REST({ version: '10' }).setToken(allah.Main.ModerationToken);
(async () => {
try {
  console.log('[papaz] Slash ve Komutlar yükleniyor.');
  await rest.put(
    Routes.applicationGuildCommands(allah.Main.BotClientID, allah.GuildID),
    { body: slashcommands },
  ).then(() => {
    console.log('[papaz] Slash ve Context Komutlar yüklendi.');
  });
}
catch (e) {
  console.error(e);
}
})();

client.on('interactionCreate', (interaction) => {
if (interaction.type == InteractionType.ApplicationCommand) {
if(interaction.user.bot) return;
try {
const command = client.slashcommands.get(interaction.commandName)
command.execute(interaction, client)
if (!interaction.inGuild() && interaction.isCommand()) return x.editReply({ content: 'Komutları kullanmak için bir sunucuda olmanız gerekir.' });
if (!command) return interaction.reply({ content: 'Bu komut kullanılamıyor.', ephemeral: true }) && client.slashcommands.delete(interaction.commandName);
} catch {
interaction.reply({content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true})
}}
});

const bots = global.allbots = [];
let tkn = []

const xd = [
  allah.Main.ModerationToken,

];
xd.forEach(xxx => 
tkn.push(xxx)
)



tkn.forEach(async (token) => {
const botClient = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent],
    presence: {
        status: "invisible",
        
    },
});

botClient.on("ready", async () => {
    bots.push(botClient);
});

await botClient.login(token);
});


const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
client.on('ready', async () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı.`);

  let guild = client.guilds.cache.get(allah.GuildID);
  await guild.members.fetch();

  const connection = getVoiceConnection(allah.GuildID);
  if (connection) return;

  setInterval(async () => {
      const VoiceChannel = client.channels.cache.get(allah.BotSesKanal);
      if (VoiceChannel) {
          joinVoiceChannel({
              channelId: VoiceChannel.id,
              guildId: VoiceChannel.guild.id,
              adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
              selfDeaf: true
          });
      }
  }, 5000);

  let activities = allah.BotDurum, i = 0;
  setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
    type: ActivityType.Streaming,
    url: "https://www.twitch.tv/papazcik"}), 10000);
});




let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" };
global.aylar = aylartoplam;

const tarihsel = global.tarihsel = function(tarih) {
    let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
    return tarihci;
};

const kalanzaman = global.kalanzaman = function(tarih) {
    return moment.duration((tarih - Date.now())).format('H [Saat,] m [Dakika,] s [Saniye]');
}

client.emoji = function (emojiName)  {
  const emoji = client.emojis.cache.find(x => x.name.includes(emojiName));
  if (!emoji) return null;
  return emoji;
} 

const chatModel = require("./settings/schemas/chatGSchema")
client.on('messageCreate', async (message) => {
    if(!message.guild || message.author.bot || message.author.id === message.guild.ownerId) return;
     const Database = await chatModel.findOne({ ServerID: message.guild.id });
     

if (Database && Database.FiltredWords.some(Word => ` ${message.content.toLowerCase()} `.includes(` ${Word} `)) === true) {
      if (message && message.deletable) message.delete().catch(() => {});
      return message.reply({ embeds: [new EmbedBuilder() 
      .setDescription('<@'+message.author.id+'>, Bu Mesaj Bir Owner Tarafından Yasaklanmıştır.')]}).then(x => setTimeout(async() => { x.delete()}, 3000)).catch(() => {});
     }
 });

const rakam = client.sayıEmoji = (sayi) => {
  var papazcim = sayi.toString().replace(/ /g, "     ");
  var papazcim2 = papazcim.match(/([0-9])/g);
  papazcim = papazcim.replace(/([a-zA-Z])/g, "Belirlenemiyor").toLowerCase();
  if (papazcim2) {
    papazcim = papazcim.replace(/([0-9])/g, d => {
      return {
        '0': client.emoji("sifir") !== null ? client.emoji("sifir") : "\` 0 \`",
        '1': client.emoji("bir") !== null ? client.emoji("bir") : "\` 1 \`",
        '2': client.emoji("iki") !== null ? client.emoji("iki") : "\` 2 \`",
        '3': client.emoji("uc") !== null ? client.emoji("uc") : "\` 3 \`",
        '4': client.emoji("dort") !== null ? client.emoji("dort") : "\` 4 \`",
        '5': client.emoji("bes") !== null ? client.emoji("bes") : "\` 5 \`",
        '6': client.emoji("alti") !== null ? client.emoji("alti") : "\` 6 \`",
        '7': client.emoji("yedi") !== null ? client.emoji("yedi") : "\` 7 \`",
        '8': client.emoji("sekiz") !== null ? client.emoji("sekiz") : "\` 8 \`",
        '9': client.emoji("dokuz") !== null ? client.emoji("dokuz") : "\` 9 \`"
      }[d];
    });
  }
  return papazcim;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
