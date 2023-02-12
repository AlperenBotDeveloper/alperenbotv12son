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

.addField('> -link',' → Eklemedik istediğiniz link ekler')
.addField('> -linksil ',' → Eklediğiniz link silmenizi yarar')
.addField('> -linklist ',' → Eklediğiniz linkleri listeler')
.addField('> PREMİUM Kullanıcılara özel ')
return message.channel.send(NARCOSEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['uptimesistemi','uptime-sistemi'], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'uptimeyardım', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: 'uptimeyardım'
};




