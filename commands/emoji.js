var Discord = require("discord.js");
var config = require(`../config.json`)
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.reply("Nie masz uprawnień");
  message.guild.createEmoji(args.join(" ").split(" | ")[0], args.join(" ").split(" | ")[1])
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Nowe Emoji")
  .setFooter("Nowe Emoji")
  .setThumbnail(args.join(" ").split(" | ")[0])
  .addField("Nazwa",args.join(" ").split(" | ")[1])
  message.channel.send({embed})
}
module.exports.help = {
	name: "nmt",
	category:"admin",
  description:"Tworzy nowe emoji",
  use:"tb!nmt [url obrazka] | nazwa"
}
