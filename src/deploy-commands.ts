import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Crée un client REST
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

// Fonction pour charger toutes les commandes du dossier "commands"
async function loadCommands() {
  const commands: any[] = [];
  const commandsPath = path.join(__dirname, 'commands'); // Chemin vers le dossier contenant vos commandes

  // Parcourt les fichiers du dossier
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of commandFiles) {
    const commandPath = path.join(commandsPath, file);
    const command = await import(commandPath);

    if (command.data) {
      commands.push(command.data.toJSON());
      console.log(`✅ Commande chargée : ${command.data.name}`);
    } else {
      console.warn(`⚠️ Le fichier ${file} ne contient pas de commande valide.`);
    }
  }

  return commands;
}

// Enregistre les commandes sur Discord
async function deployCommands() {
  try {
    console.log('⏳ Chargement des commandes...');
    const commands = await loadCommands();

    console.log('⏳ Déploiement des commandes sur Discord...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });

    console.log('✅ Commandes enregistrées avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors du déploiement des commandes :', error);
  }
}

deployCommands();