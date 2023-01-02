const fs = require('node:fs');
//import fs from 'node:fs'
const path = require('node:path');
//import path from 'node:path'
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
//import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
const { token } = require('./config.json');
//https://stackoverflow.com/questions/70106880/err-import-assertion-type-missing-for-import-of-json-file
//import token from './config.json' assert { type: "json" };

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
//const __dirname = path.resolve();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
    console.log('Ready!');
});


//TODO : react on normal messages, not slash commands
client.on("messageCreate", function (message) {
    console.log(`a message was created`);
    console.log({ message });
    if (message.content.toLocaleLowerCase() === 'hello') {
        message.channel.send('hello' + ' ' + messages.author.username);
        //reply hello word message with senders name
    }
});


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(token);
