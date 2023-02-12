const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
const { join } = require("path");
const Jimp = require("jimp");
const fs = require("fs");
const ytdl = require('ytdl-core');
const db = require("quick.db");
const express = require("express");
const approx = require("approximate-number");
const path = require("path");
const snekfetch = require("snekfetch");
const DiscordBackup = require("discord-backup");
const { RichEmbed } = require('discord.js');
const PREMIUM_MEMBERS = new Map();
const LINKS = new Map();
const messageEmbed = new Discord.MessageEmbed();
require("moment-duration-format");
require('events').EventEmitter.defaultMaxListeners = 200;

/////
const app = express();
app.get("/", (req, res) =>
  res.send("Bot Aktif | Discord = https://discord.gg/3gXvsZNs5p")
);
app.listen(process.env.PORT, () =>
  console.log("Port ayarlandı: " + process.env.PORT)
);
client.on("warn", info => console.log(info));

client.on("error", console.error)

//////////////////
client.once('ready', () => {
    console.log('Bot is ready!');
});

//////////////Uptime/////////////
client.on("message", (message) => {
  if (message.content.startsWith("-premium")) {
    if (message.author.id !== "595605651531759627") {
      return message.channel.send("Bu komutu kullanma izniniz yok!");
    }
    
    const user = message.mentions.users.first();
    if (!user) {
      return message.channel.send("Onlara premium üyelik vermek için bir kullanıcıdan bahsetmeniz gerekir!");
    }
    
    PREMIUM_MEMBERS.set(user.id, user.username);
    message.channel.send(`${user.username} artık premium üye!`);
  }
    if (message.content.startsWith("-link ")) {
  if (!PREMIUM_MEMBERS.has(message.author.id)) {
    return message.channel.send("Bu komutu kullanmak için premium üye olmanız gerekir!");
  }
  const link = message.content.split(" ")[1];
  if (!LINKS.has(message.author.id)) {
    LINKS.set(message.author.id, [link]);
  } else {
    LINKS.get(message.author.id).push(link);
  }
  message.channel.send("Bağlantı başarıyla eklendi!");
}
   else if (message.content === "-linksil") {
    if (!LINKS.has(message.author.id)) {
      return message.channel.send("Kaldıracak herhangi bir bağlantınız yok!");
    }
    
    LINKS.delete(message.author.id);
    message.channel.send("Linkler kaldırıldı!");
}   else if (message.content === "-linklist") {
    if (!LINKS.has(message.author.id)) {
      return message.channel.send("Henüz hiç bağlantı eklemediniz!");
    }
    
    const links = Array.from(LINKS.get(message.author.id));
    message.channel.send(`Tarafından eklenen bağlantılar ${message.author.username}: ${links.join(", ")}`);
}

client.on("message", message => {
  if (!message.guild) return;

  if (message.content.startsWith("-premiumsil")) {
    if (message.author.id !== "595605651531759627") return;
    let member = message.mentions.members.first();
    if (!member) return message.reply("Lütfen bu sunucunun geçerli bir üyesini belirtin");
    member.roles.remove("1072970624978399333");
    message.reply("Kurucu Tarafından kaldırıldı");
  }
});
});
///////////////Uptime Finish//////////////

////////////////Sarkı///////////////////////////////
let dispatcher;

client.on('message', async message => {
    if (message.content === 'müzikyardım') {
        message.channel.send(`
        Kullanılabilir komutlar:
        - -oynat: örnek bir müzik çalar
        - -durdur: o anda çalan müziği durdurur
        - -devam: duraklatılmış müziği devam ettirir
        `);
    } else if (message.content === '-oynat') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('Önce bir ses kanalına katılmanız gerekir!');

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('Ses kanalınıza katılmak ve kanalınızda konuşmak için izinlere ihtiyacım var!');
        }

        try {
            const connection = await voiceChannel.join();
            const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audioonly' });
            dispatcher = connection.play(stream);

            dispatcher.on('start', () => {
                console.log('Müzik çalmaya başladı!');
            });

            dispatcher.on('finish', () => {
                console.log('Müzik çalmayı bitirdi!');
                voiceChannel.leave();
            });

            dispatcher.on('error', error => {
                console.error(error);
                voiceChannel.leave();
            });
        } catch (error) {
            console.error(error);
            message.channel.send('Müzik çalmaya çalışırken bir hata oluştu');
        }
    } else if (message.content === '-durdur') {
        if (!dispatcher) return message.channel.send('Duracak müzik yok!');
        dispatcher.destroy();
        dispatcher = null;
        message.channel.send('Müzik durduruldu!');
    } else if (message.content === '-devam') {
        if (!dispatcher) return message.channel.send('Devam edecek müzik yok!');
        if (!dispatcher.paused) return message.channel.send('Müzik duraklatılmıyor!');
        dispatcher.resume();
        message.channel.send('Müzik yeniden başlatıldı!');
    }
});
/////////////////////SARKI FİNİSH///////////////////////

client.on("message", (message) => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(" ")[0].slice(ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
});

const log = (message) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach((f) => {
    let props = require(`./komutlar/${f}`);
   log(`Yüklenen komut ismi: ${props.help.name.toUpperCase()}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = (command) => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



client.yetkiler = (message) => {
  if (!message.guild) {
    return;
  }
  let permlvl = ayarlar.varsayilanperm;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if (message.author.id === message.guild.ownerID) permlvl = 6;
  if (message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};


///////////////////////////////KOMUTLAR//////////////////////////////

///////////otorol//////////////
client.on('message', msg => {
  if (msg.content.startsWith('-otorol')) {
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('Bu komutu kullanmak için ADMINISTRATOR yetkisine sahip olmanız gerekir.');
    
    let args = msg.content.split(' ');
    let channel = msg.mentions.channels.first();
    let role = msg.mentions.roles.first();
    
    if (!channel || !role) return msg.reply('Lütfen kanal ve rol etiketlerini doğru kullanın örnek -otorol @kanal #rol');
    
    msg.reply(`Otorol ayarlandı: Kanal: ${channel}, Rol: ${role}.`);
  }
});


//----------------------------------------------------------------\\

//---------------------------------DDOS KORUMASI-----------------------------\\
client.on("message", (msg) => {
  if (client.ping > 2500) {
    let bölgeler = [
      "singapore",
      "eu-central",
      "india",
      "us-central",
      "london",
      "eu-west",
      "amsterdam",
      "brazil",
      "us-west",
      "hongkong",
      "us-south",
      "southafrica",
      "us-east",
      "sydney",
      "frankfurt",
      "russia",
    ];
    let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)];
    let sChannel = msg.guild.channels.find((c) => c.name === "ddos-system");

    sChannel.send(
      `Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__ :tik: __**Sunucu Pingimiz**__ :` +
        client.ping
    );
    msg.guild
      .setRegion(yenibölge)
      .then((g) => console.log(" bölge:" + g.region))
      .then((g) => msg.channel.send("bölge **" + g.region + " olarak değişti"))
      .catch(console.error);
  }
});
//---------------------------------DDOS KORUMASI-----------------------------\\

//KanalKoruma
client.on("channelDelete", async function (channel) {
  let rol = await db.fetch(`Rixnux_${channel.guild.id}`);

  if (rol) {
    const guild = channel.guild.cache;
    let channelp = channel.parentID;

    channel.clone().then((z) => {
      let kanal = z.guild.channels.find((c) => c.name === z.name);
      kanal.setParent(
        kanal.guild.channels.find((channel) => channel.id === channelp)
      );
    });
  }
});

///reklam-engelle///
client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net", //Lord Creative
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
    ];
    if (reklam.some((word) => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          let embed = new Discord.MessageEmbed()
            .setColor(0xffa300)
            .setFooter(" Reklam engellendi.", client.user.avatarURL())
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL()
            )
            .setDescription(
              "AlperenBot Reklam Sistemi, " +
                `**${msg.guild.name}**` +
                " Adlı Sunucuda Reklam Yakaladım."
            )
            .addField(
              "Reklamı yapan kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak!`)
            .then((msg) => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

///////AFK//////////////////////////////////////////////////////////////////////////////////////
client.on("message", async (message) => {
  if (message.author.bot || message.channel.type === "dm") return;

  var afklar = await db.fetch(`afk_${message.author.id}, ${message.guild.id}`);

  if (afklar) {
    db.delete(`afk_${message.author.id}, ${message.guild.id}`);
    db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`);

    message.reply(`Afklıktan Çıktın!`);
    try {
      let isim = message.member.nickname.replace("[AFK]", "");
      message.member.setNickname(isim).catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  }
  let ms = require("ms");

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  let zaman = await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`);

  var süre = ms(new Date().getTime() - zaman);

  var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`);
  if (
    await db.fetch(
      `afk_${message.mentions.users.first().id}, ${message.guild.id}`
    )
  ) {
    if (süre.days !== 0) {
      const dcs = new Discord.MessageEmbed()
        .setTitle(":uyarii: Uyarı!")
        .setDescription("Etiketlediniz Kullanıcı Afk!")
        .addField("Afk Nedeni:", `> ${sebep}`)
        .setColor("RANDOM")
        .setThumbnail(message.author.avatarURL())
        .addField("Afk Olma Süresi", `> ${süre}`);
      message.channel.send(dcs);
      return;
    }
  }
});
////////////////////AFK SON////////////////////////////////////////////////
client.on("message", async (msg) => {
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
  if (i == "acik") {
    if (
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "s.a" ||
      msg.content.toLowerCase() == "selamun aleyküm" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "selam"
    ) {
      try {
        return msg.reply("Aleyküm Selam, Hoşgeldin");
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "kapali") {
  }
  if (!i) return;
});


client.login(ayarlar.token);

client.on("guildDelete", (guild) => {
  let Crewembed = new Discord.MessageEmbed()

    .setColor("RED")
    .setTitle(" Bot Bir sunucuda kicklendi,bilgiler;   ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.cache.get("873563606489378857").send(Crewembed);
});

client.on("guildCreate", (guild) => {
  let Crewembed = new Discord.MessageEmbed()

    .setColor("GREEN")
    .setTitle(" Bot Bir sunucuya eklendi,bilgiler;  ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.cache.get("873563606489378857").send(Crewembed);
});

//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//

client.on("message", async (msg) => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some((word) => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then((message) => message.delete());
        var e = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`Bu Sunucuda Everyone ve Here Yasak!`);
        msg.channel.send(e);
      }
    }
  } else if (hereengelle == "kapali") {
  } //lrowsxrd
});

client.on("guildMemberAdd", async (member) => {
  let rolisim = await db.fetch(`otorolisim_${member.guild.id}`);
  let EGG = await db.fetch(`rol_${member.guild.id}`);
  let Ottoman = await db.fetch(`kanal_${member.guild.id}`);
  if (!EGG || !Ottoman) return;
  member.roles.add(EGG);
  client.channels.cache
    .get(Ottoman)
    .send(
      new Discord.MessageEmbed()
        .setColor("#00aaff")
        .setDescription(
          `**Sunucumuza Yeni Katılan **${member}** Adlı Kullanıcıya \`${rolisim}\` Rolünü Başarıyla Verdim**`
        )
    );
});

client.on("guildMemberAdd", async (member) => {
  let judgedev = await db.fetch(`judgeteam?Ototag_${member.guild.id}`);
  let judgekanal = await db.fetch(`judgeteam?OtotagKanal_${member.guild.id}`);
  if (!judgedev || !judgekanal) return;

  member.setNickname(`${judgedev} ${member.user.username}`);
  client.channels.cache
    .get(judgekanal)
    .send(
      `**${member.user.username}** Adlı Kullanıcıya Otomatik Tag Verildi! :inbox_tray:`
    );
});



///////////ModLog/////////////////////////

client.on("channelCreate", async (channel) => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Kanal oluşturuldu`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n► ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("channelDelete", async (channel) => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  let embed = new Discord.MessageEmbed()
    .addField(
      `Kanal silindi`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n��� ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );

  c.send(embed);
});

client.on("channelNameUpdate", async (channel) => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Kanal İsmi değiştirildi`,
      ` Yeni İsmi: \`${channel.name}\`\n► ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("emojiCreate", (emoji) => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`codeminglog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji oluşturuldu`,
      ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n► ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiDelete", (emoji) => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`codeminglog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji silindi`,
      ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n► ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(
    db.fetch(`codeminglog_${newEmoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji güncellendi`,
      ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`,
      newEmoji.client.user.avatarURL
    );

  c.send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcı banlandı`,
      ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${
        entry.reason || "Belirtmedi"
      }**\n Banlayan: **${entry.executor.username}#${
        entry.executor.discriminator
      }**`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcının banı açıldı`,
      ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});
client.on("messageDelete", async (message) => {
  if (message.author.bot) return;

  const channel = message.guild.channels.cache.get(
    db.fetch(`codeminglog_${message.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .setAuthor(
      `${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL
    )
    .setTitle("Mesaj silindi")
    .addField(
      `Silinen mesaj : ${message.content}`,
      `Kanal: ${message.channel.name}`
    )
    //  .addField(`Kanal:`,`${message.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${message.client.user.username}#${message.client.user.discriminator}`,
      message.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (oldMessage.content == newMessage.content) return;

  const channel = oldMessage.guild.channels.cache.get(
    db.fetch(`codeminglog_${oldMessage.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ", `${oldMessage.content}`)
    .addField("Yeni mesaj : ", `${newMessage.content}`)
    .addField("Kanal : ", `${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,
      `${oldMessage.client.user.avatarURL}`
    );

  channel.send(embed);
});

client.on("roleCreate", async (role) => {
  const channel = role.guild.channels.cache.get(
    db.fetch(`codeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("roleDelete", async (role) => {
  const channel = role.guild.channels.cache.get(
    db.fetch(`codeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});

///////////////////////////////MOD LOG SON////////////////

////anitraid///

client.on("guildMemberAdd", (member) => {
  let guvenlik = db.fetch(`bottemizle_${member.guild.id}`);
  if (!guvenlik) return;
  if (member.user.bot !== true) {
  } else {
    member.ban(member);
  }
});
////antiradi///


//CAPS ENGEL

client.on("message", async (msg) => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`${msg.member}, Capslock Kapat Lütfen!`)
              .then((wiskyx) => wiskyx.delete({ timeout: 5000 }));
          }
        }
      }
    }
  }
});

//CAPS ENGEL SON

//EMOJİ KORUMA
client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`);
  if (emojik) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then((audit) => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == emoji.guild.owner.id) return;
    if (
      !emoji.guild.members.cache
        .get(entry.executor.id)
        .hasPermission("ADMINISTRATOR")
    ) {
      emoji.guild.emojis
        .create(`${emoji.url}`, `${emoji.name}`)
        .catch(console.error);
    }
  }
});

//EMOJİ KORUMA SON

//HELLO ENGLISH
client.on("message", async (msg) => {
  const i = await db.fetch(`ingilizge_${msg.guild.id}`);
  if (i == "open") {
    if (
      msg.content.toLowerCase() == "hi" ||
      msg.content.toLowerCase() == "hello" ||
      msg.content.toLowerCase() == "hi"
    ) {
      try {
        return msg.reply("Hello");
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "close") {
  }
  if (!i) return;
});

//HELLO ENGLISH SON

//CAPS ENGEL ENGLISH

client.on("message", async (msg) => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`englishcapslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`${msg.member}, Capslock Close Please!`)
              .then((wiskyx) => wiskyx.delete({ timeout: 5000 }));
          }
        }
      }
    }
  }
});

//CAPS ENGEL SON ENGLISH



///reklam-engelle/// ENGLISH
client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`englishreklamFiltre_${msg.guild.id}`);
  if (i == "open") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net", //Lord Creative
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
    ];
    if (reklam.some((word) => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          let embed = new Discord.MessageEmbed()
            .setColor(0xffa300)
            .setFooter("Ad blocked", client.user.avatarURL())
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL()
            )
            .setDescription(
              "AlperenBot Advertising System, " +
                `**${msg.guild.name}**` +
                "I Caught Ads on Named Server"
            )
            .addField(
              "Advertiser",
              "User: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("blocked message", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Advertising Forbidden!`)
            .then((msg) => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

///reklam-engelle/// ENGLISH

///////AFK////ENGLSIH//////////////////////////////////////////////////////////////////////////////////
client.on("message", async (message) => {
  if (message.author.bot || message.channel.type === "dm") return;

  var afklar = await db.fetch(
    `englishafk_${message.author.id}, ${message.guild.id}`
  );

  if (afklar) {
    db.delete(`englishafk_${message.author.id}, ${message.guild.id}`);
    db.delete(`englishafk-zaman_${message.author.id}, ${message.guild.id}`);

    message.reply(`afk output!`);
    try {
      let isim = message.member.nickname.replace("[AFK]", "");
      message.member.setNickname(isim).catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  }
  let ms = require("ms");

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  let zaman = await db.fetch(
    `englishafk-zaman_${kullanıcı.id}, ${message.guild.id}`
  );

  var süre = ms(new Date().getTime() - zaman);

  var sebep = await db.fetch(`englishafk_${kullanıcı.id}, ${message.guild.id}`);
  if (
    await db.fetch(
      `englishafk_${message.mentions.users.first().id}, ${message.guild.id}`
    )
  ) {
    if (süre.days !== 0) {
      const dcs = new Discord.MessageEmbed()
        .setTitle(":uyarii: Warning!")
        .setDescription("You have tagged User Afk!")
        .addField("Afk Reason:", `> ${sebep}`)
        .setColor("RANDOM")
        .setThumbnail(message.author.avatarURL())
        .addField("Time to Afk", `> ${süre}`);
      message.channel.send(dcs);
      return;
    }
  }
});
////////////////////AFK SON///ENGLISH/////////////////////////////////////////////

//-------------------- Ever Here Engel ----OTOTAG----------------//
//-------------------- Ever Here Engel ----OTOTAG----------------//
//-------------------- Ever Here Engel ----OTOTAG----------------//

client.on("message", async (msg) => {
  let hereengelle = await db.fetch(`englishhereengel_${msg.guild.id}`);
  if (hereengelle == "open") {
    const here = ["@here", "@everyone"];
    if (here.some((word) => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then((message) => message.delete());
        var e = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`Everyone and Here Banned On This Server!`);
        msg.channel.send(e);
      }
    }
  } else if (hereengelle == "close") {
  } //lrowsxrd
});

//----OTOTAG----------------//
client.on("guildMemberAdd", async (member) => {
  let rolisim = await db.fetch(`englishotorolisim_${member.guild.id}`);
  let EGG = await db.fetch(`englishrol_${member.guild.id}`);
  let Ottoman = await db.fetch(`englishkanal_${member.guild.id}`);
  if (!EGG || !Ottoman) return;
  member.roles.add(EGG);
  client.channels.cache
    .get(Ottoman)
    .send(
      new Discord.MessageEmbed()
        .setColor("#00aaff")
        .setDescription(
          `**New to Our Server **${member}** To User Named \`${rolisim}\` I Successfully Cast Your Role**`
        )
    );
});

client.on("guildMemberAdd", async (member) => {
  let judgedev = await db.fetch(`englishjudgeteam?Ototag_${member.guild.id}`);
  let judgekanal = await db.fetch(
    `englishjudgeteam?OtotagKanal_${member.guild.id}`
  );
  if (!judgedev || !judgekanal) return;

  member.setNickname(`${judgedev} ${member.user.username}`);
  client.channels.cache
    .get(judgekanal)
    .send(
      `**${member.user.username}** Automatic Tag Given to User! :inbox_tray:`
    );
});

//-------------------- Ever Here Engel ----OTOTAG---SON-------------//
//-------------------- Ever Here Engel ----OTOTAG---SON-------------//
//-------------------- Ever Here Engel ----OTOTAG---SON-------------//

//EMOJİ KORUMA ENGLISH
client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`englishemojik_${emoji.guild.id}`);
  if (emojik) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then((audit) => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == emoji.guild.owner.id) return;
    if (
      !emoji.guild.members.cache
        .get(entry.executor.id)
        .hasPermission("ADMINISTRATOR")
    ) {
      emoji.guild.emojis
        .create(`${emoji.url}`, `${emoji.name}`)
        .catch(console.error);
    }
  }
});

//EMOJİ KORUMA SON ENGLISH

///////////ModLog///////ENGLSIH//////////////////

client.on("channelCreate", async (channel) => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Channel created`,
      ` Name: \`${channel.name}\`\n type: **${channel.type}**\n► ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("channelDelete", async (channel) => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  let embed = new Discord.MessageEmbed()
    .addField(
      `Channel deleted`,
      ` Name: \`${channel.name}\`\n type: **${channel.type}**\n��� ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );

  c.send(embed);
});

client.on("channelNameUpdate", async (channel) => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Channel Name changed`,
      ` New name: \`${channel.name}\`\n► ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("emojiCreate", (emoji) => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji created`,
      ` Name: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n► ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiDelete", (emoji) => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji deleted`,
      ` Name: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n► ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${newEmoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji uptated`,
      ` Old name: \`${oldEmoji.name}\`\n New name: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`,
      newEmoji.client.user.avatarURL
    );

  c.send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  const channel = guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${guild.id}`)
  );
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `User banned`,
      ` Name: \`${user.username}\`\n ID: **${user.id}**\n reason: **${
        entry.reason || "did not specify"
      }**\n banning: **${entry.executor.username}#${
        entry.executor.discriminator
      }**`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} by`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  const channel = guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${guild.id}`)
  );
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `User unbanned`,
      ` Name: \`${user.username}\`\n ID: **${user.id}**\n Ban Remover: **${entry.executor.username}#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} by`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});
client.on("messageDelete", async (message) => {
  if (message.author.bot) return;

  const channel = message.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${message.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .setAuthor(
      `${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL
    )
    .setTitle("Message deleted")
    .addField(
      `deleted message : ${message.content}`,
      `Channel: ${message.channel.name}`
    )
    //  .addField(`Kanal:`,`${message.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${message.client.user.username}#${message.client.user.discriminator}`,
      message.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (oldMessage.content == newMessage.content) return;

  const channel = oldMessage.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${oldMessage.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .setTitle("Message updated!")
    .addField("old message: ", `${oldMessage.content}`)
    .addField("New message : ", `${newMessage.content}`)
    .addField("Channel : ", `${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,
      `${oldMessage.client.user.avatarURL}`
    );

  channel.send(embed);
});

client.on("roleCreate", async (role) => {
  const channel = role.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(`Role created`, ` name: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Role color code : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("roleDelete", async (role) => {
  const channel = role.guild.channels.cache.get(
    db.fetch(`englishcodeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(`Role deleted`, ` name: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Role color code : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});

///////////////////////////////MOD LOG SON////ENGLSIH////////////

////anitraid/// ENGLISH

client.on("guildMemberAdd", (member) => {
  let guvenlik = db.fetch(`englishbottemizle_${member.guild.id}`);
  if (!guvenlik) return;
  if (member.user.bot !== true) {
  } else {
    member.ban(member);
  }
});
////antiradi/// ENGLSIH



//LİMİT//
client.on("rateLimit", function (RateLimitData) {
  console.log(
    `${(RateLimitData.timeout / 500).toFixed(
      1
    )} Saniye Limit Yedim Bekleyin Devam Edicem`
  );
});
//LİMİT SON//

//kick
client.on("message", async (message) => {
  const lus = await db.fetch(`reklamkick_${message.guild.id}`);
  let sayı = await db.fetch(`sayı_${message.author.id}`);
  let a = message.author;
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glicht.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www",
    ];
    if (
      reklamengel.some((word) => message.content.toLowerCase().includes(word))
    ) {
      try {
        if (!message.member.permissions.has("KICK_MEMBERS")) {
          message.delete();
          db.add(`sayı_${message.author.id}`, 1);
          if (sayı == null) {
            const sa = new Discord.MessageEmbed().setDescription(
              `Hey! <@${message.author.id}> Bu İlk Uyarın Lütfen Tekrarlama!`
            );
            message.channel.send(sa);
            message.delete();
            a.send(`Bu İlk Uyarın Lütfen Tekrarlama`);
            return;
          }
          if (sayı === 1) {
            const sa = new Discord.MessageEmbed().setDescription(
              `Hey! <@${message.author.id}> Bu İkinci Uyarın Lütfen Tekrarlama!`
            );
            message.channel.send(sa);
            message.delete();
            a.send(`Bu İkinci Uyarın Lütfen Tekrarlama`);
            return;
          }
          if (sayı > 2) {
            const sa = new Discord.MessageEmbed().setDescription(
              `Hey! <@${message.author.id}> Reklamdan Dolayı Kickledim!`
            );
            message.channel.send(sa);
            message.delete();
            a.send(
              `${message.guild.name} Sunucusundan Reklam Yaptığın İçin Kicklendin!`
            );
            db.delete(`sayı_${message.author.id}`);
            message.guild.member(a).kick();
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});
//kick SON

//kick ENG
client.on("message", async (message) => {
  const lus = await db.fetch(`reklamkick1_${message.guild.id}`);
  let sayı = await db.fetch(`sayı_${message.author.id}`);
  let a = message.author;
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glicht.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www",
    ];
    if (
      reklamengel.some((word) => message.content.toLowerCase().includes(word))
    ) {
      try {
        if (!message.member.permissions.has("KICK_MEMBERS")) {
          message.delete();
          db.add(`sayı_${message.author.id}`, 1);
          if (sayı == null) {
            const sa = new Discord.MessageEmbed().setDescription(
              `Hey! <@${message.author.id}> This is the First Warning Please Don't Repeat!`
            );
            message.channel.send(sa);
            message.delete();
            a.send(`This is the First Warning Please Don't Repeat`);
            return;
          }
          if (sayı === 1) {
            const sa = new Discord.MessageEmbed().setDescription(
              `Hey! <@${message.author.id}> This is the Second Warning Please Don't Repeat!`
            );
            message.channel.send(sa);
            message.delete();
            a.send(`This is the Second Warning Please Don't Repeat`);
            return;
          }
          if (sayı > 2) {
            const sa = new Discord.MessageEmbed().setDescription(
              `Hey! <@${message.author.id}> Kicked Because of Advertising!`
            );
            message.channel.send(sa);
            message.delete();
            a.send(
              `${message.guild.name} You Have Been Kicked For Advertising On Your Server!`
            );
            db.delete(`sayı_${message.author.id}`);
            message.guild.member(a).kick();
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});
//kick ENG SON



client.k4h1n = {
  parabirimi: "TL", //Para Birimi TL İsterseniz Dolar Euro Vb. Para Birimleri Girebilirsiniz.
  prefix: "-",
  botunuzunidsi: "796255738506903572",
  botismi: "Alperen Bot",
  renk: "BLUE", 
  isimsiz: "Bilinmiyor", 
  rastgelepara: true, 
  minpara: 10, 
  maxpara: 200, 
  günlükpara: 50, 
  dbloy: false, 
  dblkey: "", 
  dblmsj: "Bu komutu kullanabilmek için bota oy vermelisiniz. Oy vermek için -oyver", 
  başlangıçparası: 50, 
  admin: ["758388752321740841"]
}


//-------------Bot Eklenince Bir Kanala Mesaj Gönderme Komutu ---------------\\

const embed = new Discord.MessageEmbed()
.setThumbnail()
.addField(`Alperen Bot | BILGI`, `**Uzun Zamandır Bot ile İlgilenmiyorum Hata Olursa -bildir yazarak beni bilgilendirebilirsiniz**`)
.addField(`Alperen Bot | BILGI`, `**Selamlar, Ben Alperen (Alperen Bot'in Geliştiricisi) Öncelikle Botumu Tercih Ettiğiniz İçin Teşşekür Ederim**`)
.addField(`Alperen Bot | BILGI`, `**BotV12 komutları bulunmaktadır 50+ fazla komut bulunmaktadır :wink: **`)
.setFooter(`ALPEREN Bot | Mutlu Bir Nefes | 2023`)


.addField(`Alperen Bot | BILGI`, `**Greetings, I'm Alperen (Alperen Bot's Developer) First of all, thank you for choosing our infrastructure**`)
.addField(`Alperen Bot | BILGI`, `**BotV12 commands are available There are more than 50+ commands, see the rest yourself :wink: **`)
.addField(`Alperen Bot | BILGI`, `**I haven't been interested in the bot for a long time. If there is an error, you can inform me by writing -report**`)
.setFooter(`ALPEREN Bot | A Happy Breath | 2023`)
.setTimestamp();

client.on("guildCreate", guild => {

let defaultChannel = "";
guild.channels.cache.forEach((channel) => {
if(channel.type == "text" && defaultChannel == "") {
if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
defaultChannel = channel;
}
}
})

defaultChannel.send(embed)

});