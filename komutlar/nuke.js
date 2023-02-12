const Discord = require('discord.js');

exports.run = (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu Komutu Kullanabilmek İçin **YÖNETİCİ** Yetkisine Sahip Olman Gerek.");
message.channel.clone().then(knl => {
  let position = message.channel.position;
  knl.setPosition(position);
  message.channel.delete();
});
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["nk"],
  permLevel: 4
};

exports.help = {
    name: 'nk',
  description: 'belirtilen kanalı siler tekrar oluşturur.',
  usage: 'nk'
}; 