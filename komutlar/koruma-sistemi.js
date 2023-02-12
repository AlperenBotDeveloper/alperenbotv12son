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



.addField('> -reklam-kick ',' Reklam Kick koruması açar ')
.addField('> -ban-log ',' Ban koruması açar')
.addField('> -capslockengel aç ',' Capslock koruması açar')
.addField('> -emojikoruma ',' Emoji koruması açar (BAKIMDA)')
.addField('> -ban-yetkili-rol ',' Ban koruması açar')
.addField('> -reklam aç',' Reklam engel sistemi açarsınız')
.addField('> -botgüvenlik ',' Yönetici dışında bot eklenirse banlanır')
.addField('> -kanal-koruma ',' Kanalları korur')
.addField('> -everhereengel ',' Everyone ve here engeller')
return message.channel.send(NARCOSEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['koruma-sistemi'], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'koruma-sistemi', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: 'koruma-sistemi'
};




