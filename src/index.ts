// Importations nécessaires
import { Client, GatewayIntentBits, ChatInputCommandInteraction, ActivityType, Events } from "discord.js";
import dotenv from "dotenv";
import handleInteraction from './events/ticket-interaction';

dotenv.config();

// Initialisation du client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates
    ],
});

// Exporter le client pour pouvoir l'utiliser dans d'autres fichiers
export { client };

// Événement déclenché lorsque le bot est prêt
import setupVoiceManager from './events/voiceManager';
import setupActivityEvents from './events/activityEvents';

client.once('ready', () => {
    console.log(`Noxélia est en ligne en tant que ${client.user?.tag}!`);

    client.user?.setPresence({
        activities: [
            {
                name: "play.wizorah.fr",
                type: ActivityType.Playing,
            },
        ],
        status: "online",
    });

    setupVoiceManager(client);
    setupActivityEvents(client);
});

// Chargement dynamique des événements
import('./events/guildMemberAdd').then(event => event.default(client));
import('./events/presenceUpdate').then(event => event.default(client));

client.on('interactionCreate', async (interaction) => {
    try {
        await handleInteraction(interaction);
    } catch (error) {
        console.error('Erreur lors de la gestion de l\'interaction :', error);
    }
});

import { trackMessage } from "./utils/activityTracker";

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return; // Ignore les messages des bots
    if (!message.guild) return; // Ignore les messages en DM

    const member = message.member;
    if (!member) return;

    // Enregistre le message dans la base de données
    trackMessage(member);
});

// Gestion des interactions utilisateur
client.on('interactionCreate', async (interaction) => {
    // Vérifie si l'interaction est bien une commande
    if (!interaction.isCommand()) return;

    // Force TypeScript à comprendre que l'interaction est une ChatInputCommandInteraction
    const commandInteraction = interaction as ChatInputCommandInteraction;

    const { commandName } = commandInteraction;

    try {
        switch (commandName) {
            case 'kick': {
                const { execute } = await import('./commands/moderation/kick');
                await execute(commandInteraction);
                break;
            }
            case 'saye': {
                const { execute } = await import('./commands/moderation/saye');
                await execute(commandInteraction);
                break;
            }
            case 'say': {
                const { execute } = await import('./commands/moderation/say');
                await execute(commandInteraction);
                break;
            }
            case 'cash': {
                const { execute } = await import('./commands/utiles/cash');
                await execute(commandInteraction);
                break;
            }
            case 'spoil': {
                const { execute } = await import('./commands/moderation/spoil');
                await execute(commandInteraction);
                break;
            }
            case 'infos': {
                const { execute } = await import('./commands/utiles/infos');
                await execute(commandInteraction);
                break;
            }
            case 'recrutement': {
                const { execute } = await import('./commands/utiles/recrutement');
                await execute(commandInteraction);
                break;
            }
            case 'soutien': {
                const { execute } = await import('./commands/utiles/soutien');
                await execute(commandInteraction);
                break;
            }
            case 'boutique': {
                const { execute } = await import('./commands/utiles/boutique');
                await execute(commandInteraction);
                break;
            }
            case 'ban': {
                const { execute } = await import('./commands/moderation/ban');
                await execute(commandInteraction);
                break;
            }
            case 'unban': {
                const { execute } = await import('./commands/moderation/unban');
                await execute(commandInteraction);
                break;
            }
            case 'mute': {
                const { execute } = await import('./commands/moderation/mute');
                await execute(commandInteraction);
                break;
            }
            case 'unmute': {
                const { execute } = await import('./commands/moderation/unmute');
                await execute(commandInteraction);
                break;
            }
            case 'clear': {
                const { execute } = await import('./commands/moderation/clear');
                await execute(commandInteraction);
                break;
            }
            case 'liens': {
                const { execute } = await import('./commands/utiles/liens');
                await execute(commandInteraction);
                break;
            }
            case 'banlist': {
                const { execute } = await import('./commands/moderation/banlist');
                await execute(commandInteraction);
                break;
            }
            case 'tset': {
                const { execute } = await import('./commands/tickets/tset');
                await execute(commandInteraction);
                break;
            }
            case 'tclose': {
                const { execute } = await import('./commands/tickets/tclose');
                await execute(commandInteraction);
                break;
            }
            case 'activite': {
                const { execute } = await import('./commands/activite/activite');
                await execute(commandInteraction);
                break;
            }
            case 'condition-activite': {
                const { execute } = await import('./commands/activite/condition-activite');
                await execute(commandInteraction);
                break;
            }
            default:
                console.warn(`Commande inconnue : ${commandName}`);
        }
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
    }
});

// Connexion du client au serveur Discord
client.login(process.env.TOKEN);