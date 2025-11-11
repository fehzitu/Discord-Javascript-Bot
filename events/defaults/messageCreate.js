const Discord = require('discord.js');

module.exports = {
  name: Discord.Events.MessageCreate,
  async execute(message) {
    let guildName = message.guild? message.guild.name: "~/";
    let channelName = message.channel.name? message.channel.name: "/~";
    if (message) {
      console.log('\nUser:『', message.author.username, '』\nGuild & channel:『', guildName, ':', channelName, '』\nMessage: 『', message.content, '』');
    };
  }
};