const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {



    let google = args.slice(0).join('+');

        let link = `https://translate.google.com/?hl=tr#tr/fr/` + google;
        if(!link)return message.reply("Hata !")
  if(!google) return message.reply("**Lütfen Ne Çevireceğimi Yaz**")
        let embed = new Discord.MessageEmbed()
    
    .setColor("0xe2ff00")
    .setTimestamp()
    
    .addField("Yazılan Kelime:", `${args.slice(0).join(' ')}`)
    .addField('Çeviri Linki:', `${link}`)
.setFooter('Alperen Bot - Google Çeviri Sistemi')    
          
    message.channel.send(embed);

  
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fransızca'],
  permLevel: 0
};

exports.help = {
  name: 'fransızca',
  description: 'İngilizce-Türkçe Çeviri',
  usage: 'fransızca'
};