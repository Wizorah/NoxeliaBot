import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('saye')
    .setDescription('Créer un message embed.')
    .addStringOption(option => 
        option.setName('texte')
            .setDescription('Le contenu principal de l\'embed')
            .setRequired(true)
    )
    .addStringOption(option => 
        option.setName('titre')
            .setDescription('Le titre de l\'embed (optionnel)')
            .setRequired(false)
    );

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const titre = interaction.options.getString('titre');
    const texte = interaction.options.getString('texte');

    if (!texte) {
        await interaction.reply({ content: 'Vous devez fournir du texte pour l\'embed.', ephemeral: true });
        return;
    }

    // Construire l'embed
    const embed = new EmbedBuilder()
        .setDescription(texte)
        .setThumbnail("https://i.ibb.co/frjFbVW/icon-no-fond.png")
        .setImage("https://i.ibb.co/z46TzY2/wizorah-end.png")
        .setFooter({
            text: `©️ 2025 - Wizorah • ${new Date().toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })}`,
            iconURL: "https://i.ibb.co/z5B7X26/icon-fond.png"
        })
        .setColor("#237377");

    if (titre) {
        embed.setTitle(titre);
    }

    // Répondre à la commande avec l'embed
    await interaction.reply({ embeds: [embed] });
}