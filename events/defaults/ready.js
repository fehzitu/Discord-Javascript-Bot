const Discord = require('discord.js');

module.exports = {
  name: Discord.Events.ClientReady,
  once: true,
  execute(client) {
    let i = 0;
    const activities = ["Se eu declarar minha grana toda eu mudo o PIB do país.",
      `Use "/ajuda" no chat`];
    setInterval(() => {
      client.user.setActivity(activities[i], {
        type: Discord.ActivityType.Streaming
      });
      i < activities.length -1? i++: i = 0;
    }, 10000)
    console.log(`Pronto! ${client.user.tag} logado com sucesso!`);
  }
};