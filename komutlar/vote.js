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
**» links** 
**[Support Server](https://discord.gg/GwJmQkpEGv)** **•** **[Vote](https://top.gg/bot/796255738506903572/vote)** **•** **[Bot Invite Link](https://discord.com/oauth2/authorize?client_id=796255738506903572&scope=bot&permissions=805829694)** **•**`)



.addField('**[Vote](https://top.gg/bot/796255738506903572/vote)**')

return message.channel.send(NARCOSEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['vote'], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'vote', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: 'vote'
};




