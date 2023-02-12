const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  var dogruluk = [
    "``Telefonunda arattığın en son şey nedir ?``",
    "``Bir sabah karşı cins olarak uyansaydın ilk yapacağın şey ne olurdu ?``",
    "``Sokakta yere bir şey düşürdüğünde hiç bir şey olmamış gibi alıp ağzına attın mı ?``",
    "``Yaptığın en utanç verici şey ne?``",
    "``Benimle ne yapmak istersin … (ya da xy kişiyle), o zaman (onun, …) hafızamı silebilseydin?``",
    "``İlk defa nasıl, nerede ve kiminle yapmak isterdin?``",
    "``Bir zaman makinen olsa hangi zaman dönemine giderdin?``",
    "``Hiç hipnotize edildin mi?``",
    "``Zeka ve güzellik arasında bir seçim yapmak zorunda kalsan neyi seçerdin?``",
    "``Daha önce sana verilmiş en kötü hediye nedir?``",
    "``Hayatın film olsa seni kim oynardı?``",
    "``Hiç yakın arkadaşının sevgilisinden hoşlandığın oldu mu?``",
    "``Bu odada en az kimden hoşlanıyorsun ve neden?``",
    "``Duşta söylediğin popüler şarkın hangisi?``",
    "``İç çamaşırlarını ne sıklıkla yıkıyorsun?``",
    "``Duşta işiyor musun?``",
    "``Saçma takma adların var mı?``",
    "``Tabağını yalıyor musun?``",
    "``Hiç asansörde ossurdunmu?``",
    "``Bir adada 3 gün sıkışıp kalırsan, ne yaparsın?``",
    "``Sizden en az 10 yaş büyük bir kişiye hiç aşık oldunuz mu?``",
    "``Sevgilinle ilgili yaptığın en utanç verici şey nedir?``",
    "``Hiç terk edildin mi? Bunun nedeni neydi?``",
    "``Sınıfınızdaki en iyi 5 erkek kim? Onları sırala.``",
    "``Gelecekte kaç çocuk sahibi olmak istersiniz?``",
    "Sosyal medyada en son kimi gizliden gizliye takip ettin?",
    "En son ne zaman yatağını ıslattığını hatırlıyor musun?",
    "Tuvaletini yapmak zorunda kaldığın en tuhaf yer neresiydi?",
    "Hiç anne ve baban cinsel ilişkiye girerken odaya girdiğin oldu mu?",
    "Hiç aynada öpüştünüz mü?",
    "Gizliden gizliye aşık olduğun ama bir türlü açılamadığın o kişi kim?",
    "Burnunu karıştırır mısın?",
    "Kötü bir ilişkiden kaçmak için hiç yalan söyledin mi?",
    "Şimdiye kadar en sarhoş olduğun an hangisiydi?",
    "Bir takside yolculuk ederken yaptığın en utanç verici şey neydi?",
    "Evde tek başına kaldığın zaman sıklıkla ne yaparsın?",
    "Dürüst olman gerekirse ailenden sakladığın en önemli sır nedir?",
    "Kilo aldırıp aldırmaması önemli değil, bir oturuşta hepsini yerim dediğin yemek nedir?",
    "Biriyle çıkarken hem seni hem de sevgilini utandıracak bir şey yaptığın oldu mu, olduysa bu neydi?",
    "Telefonunda izlediğin en utanç verici film (yetişkin filmleri dahil) nedir?",
    "Hayatının geri kalanında tek bir şey yiyebilecek olsaydın neyi seçerdin?",
    "Bu hayatta senin için en büyük güvensizliğe sebep olan şey nedir?",
    "Şimdiye kadar başkasına söylediğin (sevgilin dahil) en anlamlı şey neydi?",
    "En utan verici kişisel bakım alışkanlığın nedir?",
    "Hayatında hiç havuza veya denize işediğin oldu mu?",
    "Odanda tek başına olduğunda gece geç saatte yaptığın en utanç verici şey neydi?",

  ];
  var cesaret = [
    "``İğrenç bir ses tonuyla şarkı söyle``",
    "``Bugün yaptığın bir şeyle alakalı uydurma kısa, komik bir hikaye anlat``",
    "``Whatsappındaki son mesajlaşmanı bize oku``",
    "``Çok yüksek bir sesle 3 saniye bağır``",
    "``Bir fahişe gibi davranın ve birisinin sizi satın almasını sağlayın.``",
    "``Bir muz veya salatalık alın ve mükemmel Blowob’u simüle edin.``",
    "``En kötü öğretmenini tanımla.``",
    "``Kameranı aç ve yüzünü göster.``",
    "``Dirseğini yalayabilir misin?``",
    "``Ayak parmaklarından birini em. Eğer yapamazsan başkasının parmağını emeceksin``",
    "``3 dakika boyunca stand-up gösteri yap.``",
    "``Önümüzdeki 5 dakika boyunca söylediğin her şeyden sonra 'mee' diyeceksin deyin``",
    "``Kafanın üstünde iki yumurta kır.``",
    "``Birine telefonunu ver ve istediği herhangi birine mesaj atsın.``",
    "``Elbiselerinizle bir duş alın.``",
    "``10 zıpla ve 10 şınav çek``",
    "``1 dakika tavuk gibi davran``",
    "``Kedi gibi miyavla``",
    "``Balerin gibi dans et``",
    "``Eski sevgilini ara ve ona aşık olduğunu söyle.``",
    "``Maymun gibi hareket et.``",
    

  ];
  var dogrulukcevap = dogruluk[Math.floor(Math.random() * dogruluk.length)];
  var cesaretcevap = cesaret[Math.floor(Math.random() * cesaret.length)];

  message.channel.send("`Doğruluk` mu yoksa `cesaret` mi?");
  let uwu = false;
  while (!uwu) {
    const response = await message.channel.awaitMessages(
      (neblm) => neblm.author.id === message.author.id,
      { max: 1, time: 30000 }
    );
    const choice = response.first().content;
    if (choice == "doğruluk" || choice == "d")
      return message.channel.send(`${dogrulukcevap}`);
    if (choice !== "cesaret" && choice !== "c") {
      message.channel.send(
        `Lütfen sadece **doğruluk (d)** veya **cesaret (c)** ile cevap verin.`
      );
    }
    if (choice == "cesaret" || choice == "c") uwu = true;
  }
  if (uwu) {
    message.channel.send(`${cesaretcevap}`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["doğruluk-cesaret"],
  permLevel: 0,
};

exports.help = {
  name: "doğrulukcesaret",
  description: "Doğruluk cesaretlik oynarsınız",
  usage: "doğruluk-cesaret Yazarak Kullanabilirsiniz",
};
