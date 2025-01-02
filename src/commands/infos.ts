import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';

// Objet `data` pour enregistrer la commande
export const data = new SlashCommandBuilder()
  .setName('infos')
  .setDescription('Affiche des informations sur le serveur Wizorah.');

export const execute = async (interaction: CommandInteraction) => {
  try {
    // Création des trois embeds
    const embed1 = new EmbedBuilder()
      .setImage('https://i.ibb.co/Vx1LXj6/banner.png')  // Lien de votre bannière
      .setColor('#237377');  // Couleur mise à jour

    const embed2 = new EmbedBuilder()
      .setDescription(`
        📄 **Informations**
        Écoutez, ô valeureux guerriers, car je vais vous conter une histoire de la plus haute importance ! Il s'agit de l'univers fantastique de __**Wizorah**__, un serveur Minecraft Bedrock, issu de la communauté française. Mais ne vous laissez pas tromper par son humble nom, **Wizorah** n'est pas qu'un simple serveur, car ce royaume gigantesque est constitué de deux serveurs aux thèmes envoûtants : un **PvP Factions** et un **Kitmap**.

        Pour vous connecter, vous devez entrer l'IP : **play.wizorah.fr**
      `)
      .setColor('#237377');  // Couleur mise à jour

    const embed3 = new EmbedBuilder()
      .setDescription(`
        🔗 **Liens Utiles**
        • Discord : https://discord.gg/XUYSnqjVR6
        • Site : https://wizorah.fr
        • Wiki : https://wizorah.fr/wiki
        • Boutique : https://wizorah.fr/boutique
      `)
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
      embeds: [embed1, embed2, embed3],
    });
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la commande /infos:', error);
    await interaction.reply('Une erreur est survenue.');
  }
};