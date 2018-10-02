const Discord = require("discord.js");
const config = require(`../config.json`)
module.exports.run = async (client, message, args) => {
if(args[0]){
  var description = client.commands.filter(cmd => cmd.help.name === args[0]).map(cmd => '\ ' + cmd.help.description + '\ ')
  var use = client.commands.filter(cmd => cmd.help.name === args[0]).map(cmd => '\ ' + cmd.help.use + '\ ')
  let embed = new Discord.RichEmbed()
  .setTitle("Informacje o komendzie")
  .addField("Użycie",use)
  .addField("Opis komendy",description)
  .setColor(config.embed_color)
    message.channel.send({embed})
  } else {
  let pages = [`**Prefix: tb!**\nAby uzykać informacje o komendzie: tb!help <nazwa komendy>\nMasz jakieś problemy?\nPisz DM\nLiczba wszystkich komend: ${client.commands.size}`,'**Administracyjne**\n'+ client.commands.filter(cmd => cmd.help.category === 'admin').map(cmd => '\ ' + cmd.help.name + '\ ').join("\n"), '**Informacyjne**\n'+ client.commands.filter(cmd => cmd.help.category === 'info').map(cmd => '\ ' + cmd.help.name + '\ ').join("\n")];
  let page = 1;

  const embed = new Discord.RichEmbed()
    .setColor(config.embed_color)
    .setFooter(`Strona ${page} z ${pages.length}`)
    .setDescription(pages[page-1])

  message.channel.send(embed).then(msg => {

    msg.react('⏪').then( r => {
      msg.react('⏩')

      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter);
      const forwards = msg.createReactionCollector(forwardsFilter);


      backwards.on('collect', r => {
        if (page === 1) return;
        page--;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Strona ${page} z ${pages.length}`);
        msg.edit(embed)
      })

      forwards.on('collect', r => {
        if (page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Strona ${page} z ${pages.length}`);
        msg.edit(embed)
      })

    })

  })
}
}
module.exports.help = {
  name: "help"
}
