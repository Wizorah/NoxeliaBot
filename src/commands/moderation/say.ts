import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('say')
    .setDescription('Fait parler le bot avec un message simple.')
    .addStringOption(option => 
        option.setName('texte')
            .setDescription('Le contenu du message à envoyer.')
            .setRequired(true)
    );

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    try {
        const texte = interaction.options.getString('texte');

        if (!texte) {
            // Réponse immédiate en cas d'erreur
            await interaction.reply({ content: 'Vous devez fournir un texte à envoyer.', ephemeral: true });
            return;
        }

        // Utilisation de deferReply si un traitement est attendu (optionnel si le message est instantané)
        await interaction.deferReply({ ephemeral: false });

        // Réponse finale après préparation
        await interaction.editReply({ content: texte });
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la commande say:', error);
        if (interaction.replied || interaction.deferred) {
            // Si l'interaction a déjà été répondu, utilise followUp
            await interaction.followUp({ content: 'Une erreur est survenue lors de l\'exécution de la commande.', ephemeral: true });
        } else {
            // Sinon, envoie une réponse initiale
            await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de la commande.', ephemeral: true });
        }
    }
}