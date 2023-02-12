const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');


exports.run = (client, message) => {
    const istatistikozel = new Discord.MessageEmbed()
    .setColor(0x36393F)
.setDescription(`${ client.user.username}`)
  .addField(`Bot Sahibi`, `<@595605651531759627> <@758388752321740841> `, )
  .addField("Sunucu Sayısı ", `${client.guilds.cache.size.toLocaleString()}`, true)
  .addField("Toplam Kullanıcı Sayısı ", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
  .addField("Ping" , `${client.ws.ping}`, true)
    .addField(`:globe_with_meridians: » Node.js`, `${process.version}`, true)
  .addField(`<a:books:742698007262396426> Discord.js sürümü:`, Discord.version)
    .addField(`<a:books:742698007262396426> Kütüphanesi;`, `Discord.js`, true)
   .addField(`Destek Sunucum`, `[Tıkla](https://discord.gg/GwJmQkpEGv)`, true)
.addField(`Bota Oy Ver`, `[Tıkla](https://top.gg/bot/796255738506903572/vote )`, true)
    .addField('Bota Oy Ver Çıkış Tarihi', '**30.07.2021**')
    .addField('En son güncelleme ', '**2.02.2023**')
.addField(' Botun Yapılmaya Başlandığı Tarih ', '**6.01.2021**')
 .addField(' Botun Onaylandığı  Tarih ', '**6.02.2021**')
  .addField(`Botu Davet Et`, `[Tıkla](https://discord.com/oauth2/authorize?client_id=796255738506903572&scope=bot&permissions=805829694)`, true)
    .setImage("https://media.discordapp.net/attachments/792388025443024936/794317376820215828/standard_9.gif")
    .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
    message.channel.send(istatistikozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['istatistik','istatistikler', 'botbilgi', 'bilgi', 'hakkında', 'bot hakkında', 'bothakkında'],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'istatistik'
};