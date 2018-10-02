const Discord = require("discord.js");
const config = require(`../config.json`)
module.exports.run = async (client, message, args) => {
var moment = require('moment')
var today = moment.utc(new Date()).format('DD.MM.YYYY')
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Nie masz uprawnień");
  var firebase = require('firebase')
  var database = firebase.database()
  await database.ref(`/config/${message.guild.id}/util`).once('value')
  .then(async util => {
   if(util.val() == false) return message.reply('Komenda jest wyłączona');
    let everyone = message.guild.roles.find(`name`, "@everyone");
  if(args[0] == 'on'){
    message.guild.channels.forEach(async (channel, id) => {
     await channel.overwritePermissions(everyone, {
                CREATE_INSTANT_INVITE:false,
                VIEW_CHANNEL:false
     });

  })
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Zablokowano Cały Serwer")
  .setFooter(today)
  .setDescription("Zablokowano dla roli `everyone`:\nTworzenie zaproszeń\nWidoczność Kanałów")
  message.channel.send({embed})
}
if(args[0] == 'off'){
  message.guild.channels.forEach(async (channel, id) => {
   await channel.overwritePermissions(everyone, {
              CREATE_INSTANT_INVITE:true,
              VIEW_CHANNEL:true
   });

})
let embed = new Discord.RichEmbed()
.setColor(config.embed_color)
.setTitle("Odblokowano Cały Serwer")
.setFooter(today)
.setDescription("Odblokowano dla roli `everyone`:\nTworzenie zaproszeń\nWidoczność Kanałów")
message.channel.send({embed})
}
  })
}
module.exports.help = {
	name: "bunker",
	category:"admin",
	description:"Zamyka serwer do wyłączenia",
  use:"<prefix>bunker <on/off>"
}
