import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('condition-activite')
    .setDescription('Affiche les conditions pour atteindre les paliers d\'activité.');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const embed = new EmbedBuilder()
        .setTitle('Conditions Activité')
        .setColor('#237377')
        .setDescription(`
            **Paliers et Conditions :**
            • Semi-Actif : 200 messages ou 2h en vocal par semaine
            • Actif : 400 messages ou 5h en vocal par semaine
            • Super-Actif : 700 messages ou 8h en vocal par semaine

            **Récompenses :**
            • Semi-Actif : 10 points boutique / semaine
            • Actif : 20 points boutique / semaine
            • Super-Actif : 30 points boutique / semaine
        `)
        .setFooter({
            text: `©️ 2025 - Wizorah • ${new Date().toLocaleString('fr-FR')}`,
            iconURL: 'https://i.ibb.co/z5B7X26/icon-fond.png',
        });

    await interaction.reply({ embeds: [embed] });
}