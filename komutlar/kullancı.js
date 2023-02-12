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
**[Destek Sunucusu](https://discord.gg/3gXvsZNs5p)** **•** **[Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=796255738506903572&scope=bot&permissions=805829694)** **•**



> [-say](https://discord.gg/qzHTkhjQgT) → Sunucu hakkında detaylı bilgi verir.
> [-sunucu-bilgi](https://discord.gg/qzHTkhjQgT) → Sunucu hakkında detaylı bilgi verir
> [-report](https://discord.gg/qzHTkhjQgT) → botla ilgili bir sorunla karşılaştığınızda kullanın (GEREKSİZ KULLANMAYIN)
> [-nukler](https://discord.gg/qzHTkhjQgT) → Nukler gifi atar
> [-oylama](https://discord.gg/qzHTkhjQgT) → Oylama yapmanızı sağlar
> [-avatar](https://discord.gg/qzHTkhjQgT) → Etiketlediğin birisinin avatarını gösterir.
> [-yetkilerim](https://discord.gg/qzHTkhjQgT) → Hangi yetkilere sahip olduğunuzu gösterir.
> [-profil](https://discord.gg/qzHTkhjQgT) → Etiketlediğin kişini profilini görürsünüz.
> [-ping](https://discord.gg/qzHTkhjQgT) → Botun Pingine Bakarsın. 
> [-davet](https://discord.gg/qzHTkhjQgT) → beni sunucuna ekle.
> [-botbilgi](https://discord.gg/qzHTkhjQgT) → Bot hakkında bilgi gösterir`)
 

return message.channel.send(NARCOSEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'kullanıcı', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: '-kullanıcı'
};