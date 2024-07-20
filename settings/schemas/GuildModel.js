const { Schema, model } = require("mongoose");
const Guild = require("../../config.json");

const SetupModel = Schema({
    guildID: String,
    Setup: Object

});

module.exports = model("GuildModel", SetupModel);
