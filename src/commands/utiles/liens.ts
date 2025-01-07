import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';

// Objet `data` pour enregistrer la commande
export const data = new SlashCommandBuilder()
  .setName('liens')
  .setDescription('Affiche les liens utiles de Wizorah.');

export const execute = async (interaction: CommandInteraction) => {
  try {
    const embed = new EmbedBuilder()
      .setDescription(`# <:wizo:1324796654557204515> LIENS UTILES :
        <a:soon:1324796759737634826> **Site Web :** https://wizorah.fr
        
        <a:info:1324223851621650483> **Tiktok :** ...
        
        <a:info:1324223851621650483> **YouTube :** ...
        
        <a:info:1324223851621650483> **Instagram :** ...
        
        <a:info:1324223851621650483> **Twitter :** ...
        
        <:fini:1325207156412125216> = **Fini**
        <a:soon:1324796759737634826> = **En cours**
        <a:info:1324223851621650483> = **Indisponible**`)
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

    // Envoie des trois embeds dans la même réponse
    await interaction.reply({
      embeds: [embed],
    });
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la commande /recrutement:', error);
    await interaction.reply('Une erreur est survenue.');
  }
};