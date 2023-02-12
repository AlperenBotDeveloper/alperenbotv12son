const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async(client, message, args) => {
if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`❌ | Bu komudu kullanabilmek için "Sunucuyu Yönet" yetkisine sahip olman gerek.`)

 let prefix = ayarlar.prefix
  
  
  if (!args[0]) {
    const sa = new Discord.MessageEmbed()
    .setDescription(`Bunu mu Arıyorsun? ${prefix}reklam-kick aç/kapat`)
    .setTimestamp()
    return message.channel.send(sa)
  }
  if (args[0] === 'aç') {
    
    db.set(`reklamkick_${message.guild.id}`, "Aktif")
       const sa = new Discord.MessageEmbed()
    .setDescription(`Reklam Kick Başarıyla Açıldı!`)
    .setTimestamp()
    return message.channel.send(sa)
  }
   if (args[0] === 'kapat') {
    
    db.delete(`reklamkick_${message.guild.id}`)
       const sa = new Discord.MessageEmbed()
    .setDescription(`Reklam Kick Başarıyla Kapatıldı!`)
    .setTimestamp()
    return message.channel.send(sa)
  }
};
exports.conf = {
  aliases: ['reklam-kick'],
  permLevel: 4
};
exports.help = {
  name: 'reklam-kick'
}; 