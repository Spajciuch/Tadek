var Discord = require("discord.js");
var config = require(`../config.json`)
module.exports.run = async (client, message, args) => {
  var sys = require('computer-info')
  var ms = require('ms')
    let embed = new Discord.RichEmbed()
    .setAuthor("Informacje o bocie")
    .setColor(config.embed_color)
    .addField("Informacje o systemie", `**Bot działa na:** ${sys().name}\n**System:** ${sys().osystem}\n**Procesor:** ${sys().cpu} (${sys().arch}) \n**Pamięć RAM:** ${sys().ram} GB (wolna: ${sys().freeram} GB)\n**Node:** ${sys().node}`)
    .addField("Ścieżka do pliku", `**Bot znajduje się w folderze:** ${__dirname}\n**Plik Główny:** ${__filename}`)
    .addField("Informacje o czasie",`**Czas Działania:** ${ms(client.uptime)}`)
    message.channel.send({embed})
}
module.exports.help = {
	name: "info",
	category:"info",
	description:"Podaje informacje o bocie",
  use:"tb!info"
}
