var Discord = require("discord.js");
var config = require(`../config.json`)
module.exports.run = async (client, message, args) => {
  message.guild.createChannel(args.join(" ").split(" | ")[0], args.join(" ").split(" | ")[1])
}
module.exports.help = {
	name: "ccn",
	category:"admin",
  description:"Tworzy nowy kanał",
  use:"tb!ccn [nazwa] | [text/voice]"
}
