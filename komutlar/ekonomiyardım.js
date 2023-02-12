const K4H1NDiscord = require('discord.js');
const K4H1NClient = new K4H1NDiscord.Client();
const ayarlar = require('../ayarlar.json');
let Prefix = ayarlar.prefix

exports.run = (client, message) => {
 const K4H1NEmbed = new K4H1NDiscord.MessageEmbed()
  .setColor("BLUE")
 .setAuthor(`Alperen Bot Ekonomi Yardım Menüsü`)
 .setDescription(`
 **${Prefix}bilgilerim** \n :beginner: Hesap Bilgisini Gösterir.
 **${Prefix}bakiye** \n:beginner: Bakiyeyi Gösterir.
 **${Prefix}hesap-oluştur** \n:beginner:  Hesap Oluşturursun.
 **${Prefix}hesap-sil** \n:beginner:  Hesap Silersin.
 **${Prefix}kasa-aç** \n:beginner:  Kasa Açarsın.
 **${Prefix}kasa-bilgi** \n:beginner:  Kasalar Hakkında Bilgi Alırsın.
 **${Prefix}kasalar** \n:beginner:  Tüm Kasaları Gösterir.
 **${Prefix}günlük-para** \n:beginner:  Günlük Paranızı Verir.
 **${Prefix}transfer** \n:beginner:  Belirtilen Kişiye Belirtilen Miktarda Para Gönderirsin.


`)
 .setFooter(`Ekonomi`)
 .setTimestamp()
 message.channel.send(K4H1NEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ekonomiyardım'],
  permLevel: 0
};

exports.help = {
  name: 'ekonomiyardım',
  description: '',
  usage: 'ekonomiyardım'
};