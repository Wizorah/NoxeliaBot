import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';

// Objet `data` pour enregistrer la commande
export const data = new SlashCommandBuilder()
  .setName('boutique')
  .setDescription('Affiche la boutique du serveur Wizorah.');

export const execute = async (interaction: CommandInteraction) => {
  try {
    // Création des trois embeds
    const embed1 = new EmbedBuilder()
      .setImage('https://i.ibb.co/Vx1LXj6/banner.png')  // Lien de votre bannière
      .setColor('#237377');  // Couleur mise à jour

    const embed2 = new EmbedBuilder()
      .setDescription(`# 📄 Bienvenue dans la Boutique de Wizorah !

Chers guerriers, la boutique de **Wizorah** est là pour vous offrir des opportunités exceptionnelles et vous permettre de profiter d'une expérience unique en jeu. Découvrez les différentes catégories de notre boutique qui vous permettront d'obtenir des grades prestigieux, des clés de Box, des LuckyBlocks et des kits spéciaux.`)
      .setColor('#237377');  // Couleur mise à jour

      const embed3 = new EmbedBuilder()
        .setDescription(`# Catégories de la Boutique :
- Grades : Choisissez le grade qui correspond à vos ambitions et obtenez des avantages exclusifs en jeu.

- Kit (Soon) : Des kits spéciaux seront disponibles pour vous donner un coup de pouce dans vos aventures.

- Clés Box (Soon) : Ces clés vous permettront d'ouvrir des box qui vous offriront des récompenses aléatoires, allant de ressources rares à des objets puissants.

- LuckyBlock (Soon) : En ouvrant un LuckyBlock, vous pourriez débloquer des objets rares et des surprises exceptionnelles !`)
        .setColor('#237377');  // Couleur mise à jour

        const embed4 = new EmbedBuilder()
          .setDescription(`# Les Grades de la Boutique :
- **Grade Paysan** - 10€ : Pour seulement 10€, obtenez le grade Paysan valable pendant une saison complète. Ce grade vous permet d'obtenir des avantages de base qui vous aideront à démarrer dans le royaume de Wizorah.

- **Grade Noble** - 15€ : Devenez un Noble pour 15€ et obtenez des privilèges supplémentaires pour enrichir votre expérience de jeu. Valable également pendant une saison.

- **Grade Roi** - 20€ : Le grade ultime pour ceux qui cherchent à conquérir Wizorah ! Pour 20€, devenez Roi et bénéficiez de tous les avantages d'un monarque, y compris un accès exclusif à des objets rares et un prestige incontestable. Valable pendant toute une saison.`)
          .setColor('#237377');  // Couleur mise à jour

    const embed5 = new EmbedBuilder()
      .setDescription(`# Bientôt disponibles :
- Clés Box (Soon) : Préparez-vous à obtenir des clés spéciales pour ouvrir des box remplies de surprises ! Disponibles sous peu, ces clés vous permettront d'ouvrir des box et d'y recevoir des objets exclusifs et des ressources rares.

- LuckyBlock (Soon) : Bientôt, vous pourrez utiliser des LuckyBlocks et découvrir des récompenses aléatoires ! Ce système vous réserve de nombreuses surprises et des objets précieux.

- Kit (Soon) : Des kits spéciaux arriveront bientôt pour vous aider à progresser encore plus vite ! Gardez un œil sur les nouveautés de notre boutique.`)
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
      embeds: [embed1, embed2, embed3, embed4, embed5],
    });
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la commande /infos:', error);
    await interaction.reply('Une erreur est survenue.');
  }
};