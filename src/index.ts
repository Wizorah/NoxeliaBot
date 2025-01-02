// Importations nécessaires
import { Client, GatewayIntentBits, ChatInputCommandInteraction, ActivityType } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

// Initialisation du client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, // Requis pour gérer les événements d'ajout de membres
    ],
});

// Exporter le client pour pouvoir l'utiliser dans d'autres fichiers
export { client };

// Événement déclenché lorsque le bot est prêt
client.once('ready', () => {
    console.log(`Noxélia est en ligne en tant que ${client.user?.tag}!`);

    // Définir le statut personnalisé
    client.user?.setPresence({
        activities: [
            {
                name: "play.wizorah.fr",
                type: ActivityType.Playing, // Statut : "Joue à"
            },
        ],
        status: "online", // Peut être "online", "idle", ou "dnd"
    });
});

// Chargement dynamique des événements
import('./events/guildMemberAdd').then((event) => {
    event.default(client); // Appel de l'export par défaut
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
                const { execute } = await import('./commands/kick');
                await execute(commandInteraction);
                break;
            }
            case 'saye': {
                const { execute } = await import('./commands/saye');
                await execute(commandInteraction);
                break;
            }
            case 'say': {
                const { execute } = await import('./commands/say');
                await execute(commandInteraction);
                break;
            }
            case 'cash': {
                const { execute } = await import('./commands/cash');
                await execute(commandInteraction);
                break;
            }
            case 'spoil': {
                const { execute } = await import('./commands/spoil');
                await execute(commandInteraction);
                break;
            }
            case 'infos': {
                const { execute } = await import('./commands/infos');
                await execute(commandInteraction);
                break;
            }
            case 'recrutement': {
                const { execute } = await import('./commands/recrutement');
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