const Discord = require ("discord.js");

exports.run = (client, message) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
const NARCOSEMBED = new Discord.MessageEmbed()

.setColor("RANDOM")
.setTitle("**  » Alperen Bot  **")
.setThumbnail("https://cdn.discordapp.com/avatars/794620407473897472/8bcb13442b07691a9b5952e057b99df6.png?size=4096")
.setDescription(`
**» Bağlantılar** 
**[Destek Sunucusu](https://discord.gg/GwJmQkpEGv)** **•** **[Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=796255738506903572&scope=bot&permissions=805829694)** **•**`)



.addField('> -koruma-sistemi ',' → Koruma komutları')
.addField('> -uptime-sistemi ',' → Uptime komutları')
.addField('> -müzikyardım ',' → Müzik komutları')
.addField('> -captcha-yardım ',' → Captcha komutları')
.addField('> -çekilişyardım ',' → Çekiliş Komutları')
.addField('> -kullanıcı ',' → Kullanıcı komutları')
.addField('> -moderasyon ',' → Moderasyon komutları')
.addField('> -botlistyardım ',' → Botlist komutları')
.addField('> -ceviriyardım ',' → Çeviri Komutları')
.addField('> -ekonomiyardım ',' → Ekonomi Komutları')
.addField('> -oyunyardım ',' → Oyun Komutları ')
.addField('> -aboneyardım ',' → Ayarlamalı Abone Rol Sistemi')
return message.channel.send(NARCOSEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['yardım'], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'yardım', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: 'yardım'
};




