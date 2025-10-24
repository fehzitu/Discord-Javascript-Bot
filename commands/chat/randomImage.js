const Discord = require('discord.js');
const apiUrl = 'https://picsum.photos/1280/720';

module.exports = {
  data: new Discord.SlashCommandBuilder()
  .setName('gerar')
  .setDescription('Gera uma imagem aleatória!')
  .addSubcommand(subcommand =>
    subcommand
    .setName('imagem')
    .setDescription('Gera uma imagem aleatória!')
  ),
  async execute(interaction) {
    const apiData = await fetch(apiUrl);
    const embed = new Discord.EmbedBuilder()
    .setColor('Random')
    .setAuthor({
      iconURL: `${interaction.user.displayAvatarURL()}`,
      name: `@${interaction.user.username}`
    })
    .setTitle('**Pronto!**')
    .setDescription('**Foi gerado uma imagem aleatória em 1280x720px**')
    .setImage(`${apiData.url}`)
    .setTimestamp()
    .setFooter({
      text: 'Atualizado'
    });

    const response = await interaction.reply({
      embeds: [embed]
    });
  }
};