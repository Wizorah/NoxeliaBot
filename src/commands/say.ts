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
    const texte = interaction.options.getString('texte');

    if (!texte) {
        await interaction.reply({ content: 'Vous devez fournir un texte à envoyer.', ephemeral: true });
        return;
    }

    // Envoi du texte fourni par l'utilisateur
    await interaction.reply({ content: texte });
}