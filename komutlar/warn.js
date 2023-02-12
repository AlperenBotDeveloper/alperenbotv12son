const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {

let sortArray = message.guild.members.cache.filter(m => !m.user.bot).array();
let top10Arr = [];
let max = (sortArray.length < 10) ? sortArray.length : 10;
  
for(var i=0; i < max; i++) {
  var member = sortArray[i];
  var sayi = await data.fetch(`sayı.${message.guild.id}.${member.user.id}`);
  top10Arr.push({
    member: member,
    sayi: sayi
  });
}
  
top10Arr = top10Arr.sort((a, b) => (a.sayi || 0) - (b.sayi || 0)).reverse();
let nn = top10Arr.map(s => `${s.member} **${s.sayi || 0}**`).join("\n");

    
    
  
if(!args[0]) {
const dd = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Warnings in '+message.guild.name)
.setDescription(nn)
message.channel.send(dd)
  
} else if(args[0]) {
  
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(user => user.user.username.toLowerCase().includes(args[0].toLowerCase()))
  if(!user) return message.channel.send(`"${args[0]}" bu sunucuda bulunamadı.`)
  
const ss = new Discord.MessageEmbed()
 /* if(message.guild.members.cache.get(user.id).roles.highest.position > message.guild.members.cache.get(message.author.id).roles.highest.position) return message.channel.send('Rol hiyerarşisinde bunu yapacak kadar yüksek değilsiniz.')
  if(message.guild.members.cache.get(user.id).roles.highest.position == message.guild.members.cache.get(message.author.id).roles.highest.position) return message.channel.send('Rol hiyerarşisinde bunu yapacak kadar yüksek değilsiniz.')
*/
  
  const uyariBilgi = await data.fetch(`bilgi.${message.guild.id}.${user.id}`) || [];
  const sayi = await data.fetch(`sayı.${message.guild.id}.${user.id}`) || 0;
  var iterable = true;
  if(sayi < 1) {
    iterable = false;
    ss.setDescription("Bu kullanıcının uyarısı yok.")
  };
  if(iterable) for(let uyari of uyariBilgi) {
    let moderator = uyari.moderator;
    let kase = uyari.case;
    let tarih = uyari.tarih;
    let reason = uyari.reason;
    console.log(uyari);
    ss.addField(`${kase} | Uyarı | ${tarih}`, `Moderator: ${moderator}\n${reason ? reason : 'Sebep: Sebep girilmemiş.'}`, true);
  }
ss.setColor('BLUE')
.setTitle(sayi +' uyarı bulundu')
message.channel.send(ss);

}
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['uyarı'],
  permLevel: 4
};

exports.help = {
  name: 'uyarı'
}