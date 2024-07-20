const { CronJob } = require("cron");
const client = global.bot;
const messageUser = require("../../settings/schemas/messageUser");
const voiceUser = require("../../settings/schemas/voiceUser");
const messageGuild = require("../../settings/schemas/messageGuild");
const voiceGuild = require("../../settings/schemas/voiceGuild");

const gorev = require("../../settings/schemas/invite");
const kayitg = require("../../settings/schemas/kayitgorev");
const mesaj = require("../../settings/schemas/mesajgorev");
const tagli = require("../../settings/schemas/taggorev");
const allah = require("../../config.json");

module.exports = () => {

  const gorevs = new CronJob("0 0 * * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
        await gorev.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { invite: 0 } }, { upsert: true });
        await kayitg.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { kayit: 0 } }, { upsert: true });
        await mesaj.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { mesaj: 0 } }, { upsert: true });
        await tagli.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { tagli: 0 } }, { upsert: true });
        });
      console.log(`Sunucudaki ${client.guilds.cache.get(allah.GuildID).memberCount} üyenin günlük görevleri başarıyla yüklendi. [00:00]`)
    });
  }, null, true, "Europe/Istanbul");
  gorevs.start();

  const daily = new CronJob("0 0 * * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { dailyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { dailyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: true });
          });
 });
  }, null, true, "Europe/Istanbul");
  daily.start();

  const weekly = new CronJob("0 0 * * 0", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { weeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { weeklyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { weeklyStat: 0 } }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { weeklyStat: 0 } }, { upsert: true });
        });
 });
  }, null, true, "Europe/Istanbul");
  weekly.start();

  const twoweekly = new CronJob("0 0 * * 0", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { twoWeeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { twoWeeklyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { twoWeeklyStat: 0 } }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { twoWeeklyStat: 0 } }, { upsert: true });
        });
 });
  }, null, true, "Europe/Istanbul");
  twoweekly.start();

};

module.exports.conf = {
  name: "ready"
};
