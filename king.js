const fs = require('node:fs');
const path = require('node:path');
const Discord = require('discord.js');
const Token = require('./config.json');
const client = new Discord.Client({
  intents: Object.values(Discord.GatewayIntentBits),
  partials: Object.values(Discord.Partials)
});

client.commands = new Discord.Collection();
const commandsFoldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(commandsFoldersPath);

for (const folder of commandsFolders) {
  const commandsPath = path.join(commandsFoldersPath, folder);
  const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandsFiles) {
    const commandsFilePath = path.join(commandsPath, file);
    const command = require(commandsFilePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[AVISO!] Comando em: ${filePath} está com os dados: "data" ou "execute" em falta!`);
    };
  };
};

client.events = new Discord.Collection();
const eventsFoldersPath = path.join(__dirname, 'events');
const eventsFolders = fs.readdirSync(eventsFoldersPath);

for (const folder of eventsFolders) {
  const eventsPath = path.join(eventsFoldersPath, folder);
  const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
  for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    };
  };
};

client.login(Token.token);