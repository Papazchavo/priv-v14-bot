const Discord = require("discord.js");
const Canvas = require("@napi-rs/canvas");
let zaman = new Map();
const emojis = require('../../../settings/configs/emojis.json')
const { green , red } = require('../../../settings/configs/emojis.json')
const moment = require('moment')
require('moment-duration-format')
const path = require('path');
moment.locale('tr')
module.exports = {
    conf: {
      aliases: ["tweet"],
      name: "tweet",
      help: "tweet [Text]",
     category: "User"     
    },
  
run: async (client, message, args, embed, prefix) => {
  let kanallar = ["tweet-chat", "bot-commands","papaz_notebook"]
  if (!kanallar.some((x) => message.channel.name.toLowerCase().includes(x))) return message.reply({content: `${red} tweet kanallarında kullanabilirsiniz.`}).sil(15)
const text = args.join(" ")
const yazı = [] 
        if(text.length > 64) {
        let papaz31 = text.slice(0, 64)
          yazı.push(`${papaz31}`)  
        } else {
          yazı.push(`${text}`)
        }
const isim = [] 
        if(message.member.displayName.length > 27) {
        let papaz31 = message.member.displayName.slice(0, 27)
          isim.push(`${papaz31}`)  
        } else {
          isim.push(`${message.member.displayName}`)
        }
  const isimTag = [] 
  if(message.member.user.tag.length > 34 && message.member.user.globalName.length > 34) {
    let papaz31 = message.member.user.tag.slice(0, 34) && message.member.user.globalName.slice(0, 34)
          isimTag.push(`${papaz31}`)  
        } else {
          isimTag.push(`${message.member.user.globalName ? message.member.user.globalName : message.member.user.tag}`)
        }
if(!text)
if (zaman.get(message.author.id) >= 1) return message.reply("<@"+message.member+"> Bu komutu 15 dakika'da bir kullanabilirsin.").sil(15)
	  message.delete().catch(e => {})
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d")
    const imagePath = path.resolve(__dirname, "../../../settings/Assets/tweet.jpg");
    
    // Resmi yükleyin
    let bg = await Canvas.loadImage(imagePath);
    ctx.drawImage(bg, 0, 0, 700, 250)
    ctx.font = "75px 'Candara'"
    ctx.fillStyle = "#f0f0f0"
    const messageAuthor = await Canvas.loadImage(message.member.user.avatar == null && "https://cdn.discordapp.com/attachments/1214834069976780811/1217046306313469982/Picsart_23-06-26_15-30-29-413_1.png?ex=662783b3&is=66150eb3&hm=57e98bdd1cde62cffb278fa19de96533d5f6be78788e63d64a9e44d2b1782e74&" || message.member.displayAvatarURL({ format: "png" }))
    ctx.drawImage(messageAuthor, 25, 25, 75, 75)
    ctx.font = '34px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${isim}`, canvas.width / 6, canvas.height / 5);
    ctx.font = '16px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${isimTag}`, canvas.width / 6, canvas.height / 3.25);
    ctx.font = '25px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${yazı}`, canvas.width / 25, canvas.height / 1.75);
    ctx.font = '20px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${message.guild.name}`, canvas.width / 1.20, canvas.height / 1.25);
    const messageGuild = await Canvas.loadImage(message.guild.iconURL({ format: "png" }) ? message.guild.iconURL({ format: "png" }) : "https://cdn.discordapp.com/attachments/1214834069976780811/1217046306313469982/Picsart_23-06-26_15-30-29-413_1.png?ex=662783b3&is=66150eb3&hm=57e98bdd1cde62cffb278fa19de96533d5f6be78788e63d64a9e44d2b1782e74&")
    ctx.drawImage(messageGuild, 540, 180, 25, 25)
    ctx.font = '16px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${moment(Date.parse(new Date())).format("LLL")}`, canvas.width / 1.23, canvas.height / 1.05);

let attachment = new Discord.AttachmentBuilder(await canvas.encode('png'), {name: "tweet.jpg"})  

message.channel.send({files: [attachment]})
if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {   
 zaman.set(message.author.id, (zaman.get(message.author.id) || 1));
	setTimeout(() => {
		zaman.delete(message.author.id)
	}, 1000 * 60 * 15 * 1)
  }
   }
  } 