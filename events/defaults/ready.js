const Discord = require('discord.js');

module.exports = {
  name: Discord.Events.ClientReady,
  once: true,
  execute(client) {
    let i = 0;
    const activities = [
      'Olha pra tropa já joga a xereca',
      'Se eu declarar minha grana toda eu mudo o PIB do país',
      'Meus manos são da killa',
      'Eu só falo da lobelia',
      'Meu atirador é um black spy',
      'Puta se eu puxo o gatilho só bye-bye'
      ];
    setInterval(() => {
      client.user.setActivity(activities[i], {
        type: Discord.ActivityType.Streaming
      });
      i < activities.length -1? i++: i = 0;
    }, 10000)
    console.log(`Pronto! ${client.user.tag} logado com sucesso!`);
  }
};