const ms = require("ms");
const Discord = require("discord.js");
const num = require("num-parse");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.inlineReply(
      "❌ | Sen çekiliş yapamazsın. `Sunucuyu Yönet` yetkisine sahip değilsin!"
    );
  let id = args[0];
  if (!id)
    return message.inlineReply("❌ | Geçerli bir mesaj ID'si belirtmelisiniz!");
  let hasGiveaway =
    client.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
    client.giveawaysManager.giveaways.find(g => g.messageID === args[0]);
  if (!hasGiveaway) {
    return message.channel("`" + id + "` için bir hediye bulamıyorum ");
  }
  client.giveawaysManager
    .edit(hasGiveaway.messageID, {
      setEndTimestamp: Date.now()
    })
    .then(() => {})
    .catch(e => {
      message.channel.send(
        "Sanırım yanlış bir şeyler oldu: ```js\n" + e.message + "```"
      );
    });
  if (message.deletable) message.delete();
  return;
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "bitir"
};
