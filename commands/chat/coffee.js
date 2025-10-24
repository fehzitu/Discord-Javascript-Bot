const Discord = require('discord.js');
const apiUrl = 'https://coffee.alexflipnote.dev/random.json';

module.exports = {
  data: new Discord.SlashCommandBuilder()
  .setName('cafe')
  .setDescription('Que tal uma pausa pra um cafézinho?'),
  async execute(interaction) {
    const res = await fetch(apiUrl);
    const apiData = await res.json();
    const embed = new Discord.EmbedBuilder()
    .setColor('Random')
    .setAuthor({
      iconURL: `${interaction.user.displayAvatarURL()}`,
      name: `@${interaction.user.username}`
    })
    .setTitle('**Muito cansado?**\nBora uma pausa pra um cafézin?')
    .addFields(
      {
        name: '**Receitinha rápida:**', value: '**Ingredientes**:\n> 50g de café solúvel (aproximadamente 2 colheres de sopa bem cheias)\n> 1 xícara (chá) de açúcar\n> 1/2 xícara (chá) de água quente\n> Leite quente para servir\n\n**Modo de preparo**:\n> 1. Em uma tigela, misture o café solúvel, o açúcar e a água quente.\n> 2. Bata com uma batedeira (ou fouet) por cerca de 5 a 10 minutos, até formar um creme espesso e bem aerado.\n> 3. Ferva o leite e coloque em uma xícara até 3/4 do volume.\n> 4. Adicione uma ou duas colheres do creme por cima.\n> 5. Mexa antes de beber (ou não, se preferir tomar com o creme por cima).\n\n**Dica**:\n> Você pode guardar o creme na geladeira por até 5 dias em um pote bem fechado. Basta mexer antes de usar.'
      }
    )
    .setImage(`${apiData.file}`)
    .setTimestamp()
    .setFooter({
      text: 'Atualizado'
    });

    const response = await interaction.reply({
      embeds: [embed]
    });
  }
};