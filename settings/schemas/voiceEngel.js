const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
});

module.exports = model("voiceEngel", schema);