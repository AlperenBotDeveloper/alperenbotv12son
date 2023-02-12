const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu Komutu Kullanmak İçin **Yönetici** Yetkisine Sahip Olmalısın!");

let prefix = ayarlar.prefix
  
  
  if (!args[0]) {
    const RC = new Discord.MessageEmbed()
    .setDescription(`Bunu mu Arıyorsun? ${prefix}kanal-koruma aç/kapat`)
    .setTimestamp()
    return message.channel.send(RC)
  }
  if (args[0] === 'aç') {
    
    db.set(`Rixnux_${message.guild.id}`, "Aktif")
       const RC = new Discord.MessageEmbed()
    .setDescription(`Kanal Koruma Başarıyla Açıldı!`)
    .setTimestamp()
    return message.channel.send(RC)
  }
   if (args[0] === 'kapat') {
    
    db.delete(`Rixnux_${message.guild.id}`)
       const RC = new Discord.MessageEmbed()
    .setDescription(`Kanal Koruma Başarıyla Kapatıldı!`)
    .setTimestamp()
    return message.channel.send(RC)
  }
};
exports.conf = {
  aliases: ['kanal-koruma'],
  permLevel: 3
};
exports.help = {
  name: 'kanal-koruma'
}; 


