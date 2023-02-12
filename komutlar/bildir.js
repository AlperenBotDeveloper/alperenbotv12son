const Discord = require("discord.js");
const db = require('quick.db')
exports.run = (client, message, args, member) => {
  let hata = args.slice(0).join(" ");
  let kanal = client.channels.cache.get('1071881481162604644')//Hatanın Gideceği Log Kanal İdsini Girin
    if (!hata) {
    return message.channel.send(
      "Hatanı Yazarmısın ?"
    ); }
const embed = new Discord.MessageEmbed()
  .setColor("BLURPLE")
  .addField("Bir Hata Bildirildi!", `Bildiren: ${message.author.tag} Bildirdiği Hata: ${hata}`)
kanal.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bildir"],
    permLevel: 0
}

exports.help = {
    name: "hatalı-kod",
    description: "kodçevirme",
    usage: "bildir"
}

