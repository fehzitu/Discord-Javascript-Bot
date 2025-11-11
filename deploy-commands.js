const Discord = require('discord.js');
const {
  clientId,
  token
} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[AVISO!] Comando em: ${filePath} está com os dados: "data" ou "execute" em falta!`);
    };
  };
};

const rest = new Discord.REST().setToken(token);

(async () => {
  try {
    console.log(`Carregando um total de ${commands.length} comandos!`);
    const data = await rest.put(
      Discord.Routes.applicationCommands(clientId),
      {
        body: commands
      },
    );
    console.log(`Resultado: (${data.length} / ${commands.length}) comandos carregados!`);
  } catch (error) {
    console.error(error);
  }
})();