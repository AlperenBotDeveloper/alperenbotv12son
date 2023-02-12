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
.setDescription(`
**» Bağlantılar** 
**[Destek Sunucusu](https://discord.gg/GwJmQkpEGv)** **•** **[Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=796255738506903572&scope=bot&permissions=805829694)** **•**

> [-rolüye](https://discord.gg/qzHTkhjQgT) → Belirtilen rolü olan kullanıcıları gösterir
> [-slowmode](https://discord.gg/qzHTkhjQgT) → Yavaş modu ayarlarsınız
> [-sil](https://discord.gg/qzHTkhjQgT) → Belirtilen sayı kadar mesaj siler
> [-warn](https://discord.gg/qzHTkhjQgT) → Belirtilen kisiyi uyarır
> [-temizle-üye](https://discord.gg/qzHTkhjQgT) → Belirtilen kisinin mesajları siler
> [-nk](https://discord.gg/qzHTkhjQgT) → Belirtilen kanalı siler tekrar oluşturur
> [-sa-as](https://discord.gg/qzHTkhjQgT) →  Sa-As sistemini aktif eder
> [-sunucubilgi](https://discord.gg/qzHTkhjQgT) →  Sunucu hakkında bilgi verir
> [-otorol](https://discord.gg/qzHTkhjQgT) →  Otorol sistemi
> [-ototag](https://discord.gg/qzHTkhjQgT) →  Ototag sistemi
> [-mod-log](https://discord.gg/qzHTkhjQgT) →  Mod-Log kanalını belirler
> [-sayaç](https://discord.gg/qzHTkhjQgT) →  Sayaç ayarlar


`)
 
 

return message.channel.send(NARCOSEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['moderasyon'], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'moderasyon', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: 'moderasyon'
};