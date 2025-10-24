const Discord = require('discord.js');

module.exports = {
  name: Discord.Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    let command = await interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(`Não foi encontrado um comando com o nome: "${interaction.commandName}"!`);
      return;
    };
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'Erro ao executar o comando!', flags: Discord.MessageFlags.Ephemeral
        });
      } else {
        await interaction.reply({
          content: 'Erro ao executar o comando!', flags: Discord.MessageFlags.Ephemeral
        });
      };
    };
  }
};