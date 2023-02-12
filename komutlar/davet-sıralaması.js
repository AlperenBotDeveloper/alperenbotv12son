const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
     if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  let invites = await message.guild.fetchInvites().catch(error => {
    return message.channel.send(
      "? | Davetleri Göremiyorum! Yeterli Yetkim Yok!"
    );
  });

  invites = invites.array();

  let possibleinvites = [];
  invites.forEach(function(invites) {
    possibleinvites.push(
      `:small_orange_diamond: | ${invites.inviter.username} | Davet: ${invites.uses}`
    );
  });

  const CrewCode = new Discord.MessageEmbed()
    .setTitle(`**?? SUNUCU DAVET BİLGİLERİ ??**`)
    .setColor("RANDOM")
    .addField("? Davet Bilgi ?", `**${possibleinvites.join("\n")}**`)
    .setTimestamp()
    .setFooter(`Komutu Kullanan: ${message.author.username}`);
  message.channel.send(CrewCode);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davet-sırası","ds"],
  permLevel: 2,
  kategori: "sunucu"
};
//CrewCode
exports.help = {
  name: "davet-sıralaması",
  description: "Sunucunuza en çok kullanıcı getirenleri sıralar.",
  usage: "davet-sıralaması"
};
 