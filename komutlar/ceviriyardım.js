const Discord = require("discord.js");

exports.run = (client, message) => {
  const lembed = new Discord.MessageEmbed().then;
  const mhelp = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setTitle("YouTube Alperen of")
    .setThumbnail(
      "https://cdn.discordapp.com/avatars/794620407473897472/8bcb13442b07691a9b5952e057b99df6.png?size=4096"
    )
    .setDescription(
      `



:earth_asia:  **Çeviri Komutları ! - Youtube Alperen of**
:white_small_square:**-almanca** = türkçe almanca çeviri yapar
:white_small_square:**-ingilizce** = türkçe ingilizce çeviri yapar
:white_small_square:**-rusça** = türkçe rusça çeviri yapar
:white_small_square:**-fransızca** = türkçe almanca çeviri yapar
:white_small_square:**-yunanca** = türkçe yunanca çeviri yapar
:white_small_square:**-korece**=  türkçe korece çeviri yapar
:white_small_square:**-portekice** = türkçe portekizce çeviri yapar
:white_small_square:**-zulu** = türkçe zulu çeviri yapar
:white_small_square:**-arabic**=  türkçe arabic çeviri yapar
:white_small_square:**-tatar** = türkçe tatarca çeviri yapar

`
    )
    .addField(
      `» Alperen Bot`,
      `**[Destek Sunucusu](https://discord.gg/3gXvsZNs5p)**`
    )
    .setFooter(
      `${message.author.username} Tarafından İstendi.`,
      message.author.avatarURL
    );
  message.channel.send(mhelp).then;
  const sembed = new Discord.MessageEmbed();
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ceviriyardım"],
  permLevel: 0
};

exports.help = {
  name: "ceviriyardım",
  description: "ceviriyardım",
  usage: "ceviriyardım"
};
