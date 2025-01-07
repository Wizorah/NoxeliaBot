import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import Database from 'better-sqlite3';

const db = new Database('./activity.db');

export const data = new SlashCommandBuilder()
    .setName('activite')
    .setDescription('Affiche les statistiques d\'activité.')
    .addUserOption(option => 
        option.setName('joueur')
            .setDescription('Voir les statistiques d\'un joueur spécifique.')
            .setRequired(false)
    );

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const target = interaction.options.getUser('joueur') || interaction.user;
    const userId = target.id;

    const activity = db.prepare('SELECT * FROM activity WHERE userId = ?').get(userId);
    if (!activity) {
        await interaction.reply({
            content: `${target.username} n'a aucune activité enregistrée.`,
            ephemeral: true,
        });
        return;
    }

    const totalMessages = activity.messages;
    const totalVoiceTime = formatTime(activity.voiceTime);
    const weeklyMessages = activity.messages; // À ajuster pour refléter la semaine actuelle
    const weeklyVoiceTime = formatTime(activity.voiceTime); // Même chose pour la semaine

    const embed = new EmbedBuilder()
        .setTitle(`Paliers Activité - @${target.username}`)
        .setThumbnail(target.displayAvatarURL())
        .setColor('#237377')
        .setDescription(`
            **Cette semaine :**
            • Messages : ${weeklyMessages}
            • Temps en vocal : ${weeklyVoiceTime}

            **Depuis avoir rejoint le serveur :**
            • Messages totaux : ${totalMessages}
            • Temps total en vocal : ${totalVoiceTime}

            **Paliers atteints :**
            • Semi-Actif : {nombre} semaine(s)
            • Actif : {nombre} semaine(s)
            • Super-Actif : {nombre} semaine(s)

            **Total Points Boutique : {total points boutique}**
        `)
        .setFooter({
            text: `©️ 2025 - Wizorah • ${new Date().toLocaleString('fr-FR')}`,
            iconURL: 'https://i.ibb.co/z5B7X26/icon-fond.png',
        });

    await interaction.reply({ embeds: [embed] });
}

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
}