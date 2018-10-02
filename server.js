var Discord = require('discord.js')
var client = new Discord.Client()
var config = require('./config.json')
var fs = require('fs')
var bar = client.guilds.get('469846041764691988')
var moment = require('moment')
var ms = require('ms')
var today = moment.utc(new Date()).format("DD.MM.YYYY hh:mm")
client.commands = new Discord.Collection()

client.on("ready", () => {
  console.log(`[client] Zalogowano jako ${client.user.tag}`)
  client.user.setActivity("!help")
})
client.on('guildMemberAdd', user => {
  if(message.guild.id !== "415917934268121118") return
    role = user.guild.roles.find("name", "Klient")
    var logi = client.channels.get('493868177047158795')
    let embed = new Discord.RichEmbed()
    .setColor(config.embed_color)
    .setTitle("Nowa osoba")
    .addField("Osoba", user)
    .setFooter(today)
    logi.send({embed})
    user.addRole(role)
})
client.on('guildMemberRemove', user => {
  if(message.guild.id !== "415917934268121118") return
    var logi = client.channels.get('493868177047158795')
    let embed = new Discord.RichEmbed()
    .setColor(config.embed_color)
    .setTitle("Osoba wyszła")
    .addField("Osoba", user.user.username)
    .setFooter(today)
    logi.send({embed})
})
fs.readdir(`./commands/`,(err, files)=>{
  if(err) console.log(err)
  let jsfile = files.filter(f => f.split(".").pop() == "js")
  if(jsfile.length <= 0){
    console.log("Nie znaleziono komend!")
  }
  jsfile.forEach((f,i)=> {
    let props = require(`./commands/${f}`)
    console.log(`[Załadowano] ${f}`)
    client.commands.set(props.help.name, props)
  })
})
client.on("message", message => {
    let messageArray = message.content.split(" ");
    let prefix = config.prefix
    let cmd = messageArray[0];
    var args = message.content.slice(prefix.length).trim().split(/ +/g);;
    var command = args.shift().toLowerCase();
    var embd = new Discord.RichEmbed()
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, args);
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    if(message.author.bot) return;
})

client.on("channelCreate", channel => {
  if(channel.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Nowy kanał")
  .addField("Nazwa", channel, true)
  .setFooter(today)
  logi.send({embed})
})
client.on("channelDelete", channel => {
  if(channel.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Usunięto kanał")
  .addField("Nazwa", "#" + channel.name, true)
  .setFooter(today)
  logi.send({embed})
})
client.on("channelPinsUpdate", pin => {
  if(pin.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Wykryto zmianę przypiętych wiadomości")
  .addField("Kanał", pin, true)
  .setFooter(today)
  logi.send({embed})
})
client.on("emojiCreate", emoji => {
  if(emoji.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Stworzono nowe emoji")
  .setThumbnail(emoji.url)
  .addField("Nazwa", `${emoji.name}`, true)
  .setFooter(today)
  logi.send({embed})
})
client.on("emojiDelete", emoji => {
  if(emoji.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Usunięto emoji")
  .setThumbnail(emoji.url)
  .addField("Nazwa", `${emoji.name}`, true)
  .setFooter(today)
  logi.send({embed})
})
client.on("emojiUpdate", (oldEmoji, newEmoji)  => {
  if(newEmoji.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Edytowano emoji")
  .setThumbnail(newEmoji.url)
  .addField("Stara nazwa", oldEmoji.name)
  .addField("Nowa nazwa", newEmoji.name)
  .setFooter(today)
  logi.send({embed})
})
client.on("guildBanAdd", (guild, user)  => {
  if(guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setThumbnail(user.displayAvatarURL)
  .setTitle("Zbanowano użytkownika")
  .addField("Osoba", user.tag)
  .setFooter(today)
  logi.send({embed})
})
client.on("guildBanRemove", (guild, user)  => {
  if(guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setThumbnail(user.displayAvatarURL)
  .setTitle("Odbanowano użytkownika")
  .addField("Osoba", user.tag)
  .setFooter(today)
  logi.send({embed})
})
client.on("messageDelete", message  => {
  if(message.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  if(message.content.length <=0) return
  let embed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Usunięto wiadomość")
  .addField("Autor", message.author, true)
  .addField("Kanał", message.channel, true)
  .addField("Treść", message.content, true)
  .setFooter(today)
  logi.send({embed})
})
client.on("messageUpdate", (oldMessage, newMessage)  => {
  if(newMessage.guild.id !== "415917934268121118") return
    var logi = client.channels.get('493868177047158795')
    if(newMessage.channel.type == "dm") return
    if(!oldMessage.guild) return
    if(!newMessage.guild) return
    if(!logi) return
    if(oldMessage.content.length <= 0 ) return
    if(newMessage.content.length <= 0) return
    let embed = new Discord.RichEmbed()
    .setColor(config.embed_color)
    .setTitle("Edytowana wiadomość")
    .addField("Autor:", oldMessage.author,true)
    .addField("Kanał:", oldMessage.channel,true)
    .addField("Pierwotna wiadomość:", oldMessage.content)
    .addField("Nowa wiadomość:", newMessage.content)
    logi.send({embed: embed}).catch(error => 0)
})
client.on("roleCreate", role  => {
  if(role.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(role.color)
  .setTitle("Nowa Rola")
  .addField("Nazwa", role.name, true)
  .addField("Kolor", role.color, true)
  .setFooter(today)
  logi.send({embed})
})
client.on("roleDelete", role  => {
  if(role.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(role.color)
  .setTitle("Usunięto rolę")
  .addField("Nazwa", role.name, true)
  .addField("Kolor", role.color, true)
  .setFooter(today)
  logi.send({embed})
})
client.on("roleUpdate", (oldRole, newRole)  => {
  if(newRole.guild.id !== "415917934268121118") return
  var logi = client.channels.get('493868177047158795')
  let embed = new Discord.RichEmbed()
  .setColor(newRole.color)
  .setTitle("Modyfikowano rolę")
  .addField("Stara nazwa", oldRole.name, true)
  .addField("Stary kolor", oldRole.color, true)
  .addField("Stara pozycja roli", oldRole.position, true)
  .addField("Nowa nazwa", newRole.name, true)
  .addField("Nowy kolor", newRole.color, true)
  .addField("Nowa pozycja roli", newRole.position, true)
  .setFooter(today)
  logi.send({embed})
})
client.login(config.token)
