import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';

// Objet `data` pour enregistrer la commande
export const data = new SlashCommandBuilder()
  .setName('recrutement')
  .setDescription('Affiche les informations sur le recrutement des guides de Wizorah.');

export const execute = async (interaction: CommandInteraction) => {
  try {
    // Création des trois embeds

    // Embed 1 : Bannière serveur
    const embed1 = new EmbedBuilder()
      .setImage('https://i.ibb.co/Vx1LXj6/banner.png')  // Lien de votre bannière
      .setColor('#237377');  // Couleur mise à jour

    // Embed 2 : Informations sur le rôle de Guide
    const embed2 = new EmbedBuilder()
      .setDescription(`
        <a:guide:1324223906059386912>  **Devenez Guide sur Wizorah**
        Notre équipe de modération recrute, n'hésitez pas à postuler !
        
        :clipboard:  **Quel est le rôle d'un Guide ?**
        Le guide a pour objectif de garantir l'ordre au sein du serveur. Il est chargé principalement de gérer le tchat et de répondre aux questions des joueurs. Il peut également faire office d'intermédiaire entre la communauté et ses supérieurs.
        
        :bookmark_tabs:  **Comment devenir Guide ?**
        \`Afin d'intégrer l'équipe de modération de Wizorah, il est nécessaire de répondre à certaines conditions !\`
        
        • Avoir 14 ans au minimum
        • Avoir une très bonne orthographe
        • Être régulièrement actif en jeu ou sur Discord
        • Posséder un micro
        • Avoir une bonne connaissance de Wizorah
        • Ne jamais avoir reçu de sanction lourde
        • Avoir un bon esprit d'équipe
      `)
      .setColor('#237377');  // Couleur mise à jour

    // Embed 3 : Instructions pour postuler
    const embed3 = new EmbedBuilder()
      .setDescription(`
        :pencil:  **Je postule !**
        \`Veillez à avoir pris connaissance des conditions avant de déposer une candidature, cela évitera d'être directement refusé.\`
        
        <a:info:1324223851621650483>  Si vous souhaitez **postuler**, allez ouvrir un ticket dans la catégorie recrutement !
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
    console.error('Erreur lors de l\'exécution de la commande /recrutement:', error);
    await interaction.reply('Une erreur est survenue.');
  }
};