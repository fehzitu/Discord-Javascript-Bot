const Discord = require('discord.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
  .setName('convite')
  .setDescription('Gera um convite infinito para seu servidor!'),
  async execute(interaction) {
    let invite;
    let guildLink;
    let embed;
    if (!interaction.guildId) {
      embed = new Discord.EmbedBuilder()
      .setColor('Random')
      .setAuthor({
        iconURL: `${interaction.user.displayAvatarURL()}`,
        name: `@${interaction.user.username}`
      })
      .setTitle(`**Ops...**`)
      .setDescription(`**Aparentemente esse comando não foi utilizado em um servidor!**`)
      .setThumbnail(`${interaction.user.displayAvatarURL()}`)
      .setTimestamp()
      .setFooter({
        text: 'Atualizado'
      });
    } else {
      invite = await interaction.channel.createInvite({
        maxAge: 0,
        maxUses: 0,
        reason: `"Comando utilizado por: ${interaction.user.username} || { @king }"`
      });
      guildLink = invite.code;
      embed = new Discord.EmbedBuilder()
      .setColor('Random')
      .setAuthor({
        iconURL: `${interaction.user.displayAvatarURL()}`,
        name: `@${interaction.user.username}`
      })
      .setTitle(`**${interaction.guild.name} | ${interaction.guild.memberCount} membros**`)
      .setDescription(`Bem-vindo(a) à __${interaction.guild.name}__, o servidor ideal pra quem quer crescer, evoluir e se destacar!`)
      .setThumbnail(`${interaction.guild.iconURL()}`)
      .addFields(
        {
          name: `**Quem somos nós?**`, value: `**Somos uma comunidade acolhedora e divertida, más sempre mantendo o foco em aproveitar o máximo da internet.**`
        },
        {
          name: `**O que temos aqui?**`, value: `**Todo tipo de conteúdo sempre mantendo o respeito e o humor, eventos divertidos e sorteios únicos. Tudo isso unido a nossa comunidade!**`
        },
        {
          name: `**Obs:**`, value: `**__Faça parte da equipe ${interaction.guild.name} e sinta-se em casa!__\n\u200B**`
        },
        {
          name: `**Link:**`, value: `**{ https://discord.gg/${guildLink} } - Duração: "Infinito"**`
        }
      )
      .setTimestamp()
      .setFooter({
        text: 'Atualizado'
      });
    }

    const response = await interaction.reply({
      embeds: [embed]
    });
  }
};