const Discord = require("discord.js");
const config = require(`../config.json`)
module.exports.run = async (client, message, args) => {
  if(message.author.id !== '367390191721381890') return message.reply("Nie masz uprawnień")
  let result =eval(args.join(" ")).toString()
      let embed = new Discord.RichEmbed()
      .setTitle("Eval")
      .addField(":inbox_tray: Wejście", "```"+args.join(" ")+"```")
      .addField(":outbox_tray: Wyjście", "```"+result+"```")
      .setColor(config.embed_color)
      message.channel.send({embed})

}
module.exports.help = {
  name: "eval"
}
