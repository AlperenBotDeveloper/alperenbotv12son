const Discord = require ("discord.js");

exports.run = (client, message) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**,  sentence Commands Cannot Be Used in Private Messages')
    return message.author.send(ozelmesajuyari); }
const NARCOSEMBED = new Discord.MessageEmbed()

.setColor("RANDOM")
.setTitle("**  » Alperen Bot  **")
.setThumbnail("https://cdn.discordapp.com/avatars/794620407473897472/8bcb13442b07691a9b5952e057b99df6.png?size=4096")
.setDescription(`
**» Bağlantılar** 
**[Destek Sunucusu](https://discord.gg/GXZr3eSGYS)** **•** **[Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=796255738506903572&scope=bot&permissions=805829694)** **•**`)


.addField('> -abonelog ',' Abone Logunu Ayarlarsınız')
.addField('> -abone ',' → Abone Rolü Verirsiniz')
.addField('> -aboneyrol ',' → Abone Rolünü verecek Yetkili rolünü ayarlarsınız')
.addField('> -abonerol','  → Abone Rolünü Ayarlarsınız (YETKİLİ KANALINDA YAPMANIZ TAVSİTE EDİLİR)')
return message.channel.send(NARCOSEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['abone','aboneyardım'], 
    permLevel: 0
};
  
  exports.help = {
    name: 'aboneyardım', 
    description: 'Abone Komut Listesini Gösterir!',
    usage: 'aboneyardım'
};