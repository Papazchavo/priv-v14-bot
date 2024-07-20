const conf = require("../../settings/configs/sunucuayar.json")
const { green } = require("../../settings/configs/emojis.json");

module.exports = async (message) => {
  if (message.content.toLowerCase() === "sa" || message.content.toLowerCase() === "SA" || message.content.toLowerCase() === "Sa") {
    message.react(green);
    message.reply({ content: `**Aleyküm Selam Hoş Geldin!!**`});
  }
};
module.exports.conf = {
  name: "messageCreate"
};