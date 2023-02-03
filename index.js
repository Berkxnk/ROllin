const Discord = require("discord.js");
const fs = require('fs');
const config = require(`./botconfig/config.json`);
const settings = require(`./botconfig/settings.json`);
require("colors"); console.clear();

const client = new Discord.Client({
  shards: "auto",
  allowedMentions: { parse: [], repliedUser: false },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS ],
  presence: { activity: { name: `Yeni Oyun Botu`, type: "WATCHİNG" }, status: "idle" }
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);

["events", "commands", "slashCommands", settings.antiCrash ? "antiCrash" : null].filter(Boolean).forEach(h => { require(`./handlers/${h}`)(client); });

client.login(config.token); 