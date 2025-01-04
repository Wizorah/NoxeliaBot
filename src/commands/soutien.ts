import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';

// Objet `data` pour enregistrer la commande
export const data = new SlashCommandBuilder()
  .setName('soutien')
  .setDescription('Affiche comment obtenir le rôle Soutien.');

export const execute = async (interaction: CommandInteraction) => {
  try {
    // Création des trois embeds
    const embed1 = new EmbedBuilder()
      .setImage('https://i.ibb.co/Vx1LXj6/banner.png')  // Lien de votre bannière
      .setColor('#237377');  // Couleur mise à jour

    const embed2 = new EmbedBuilder()
      .setDescription(`# 📄 Informations Importantes

Écoutez, ô valeureux aventuriers, car je vais vous révéler un secret digne des plus grands héros ! Il s'agit d'un privilège réservé aux plus loyaux d'entre vous, ceux qui choisissent de soutenir **Wizorah** dans sa quête pour la grandeur.

Le rôle **Soutien** est offert à ceux qui, dans leur infinie générosité, partagent fièrement notre royaume en incluant dans leur statut l'un des mots-clés suivant : \`\`.gg/wizorah\`\`, \`\`discord.gg/wizorah\`\` ou \`\`https://discord.gg/wizorah\`\`.`)
      .setColor('#237377');  // Couleur mise à jour

      const embed3 = new EmbedBuilder()
      .setDescription(`# 🎁 Avantages exclusifs du rôle Soutien :
- Accès à la bêta : Soyez parmi les premiers guerriers à découvrir les fonctionnalités et à explorer le monde de **Wizorah**.
- Kit spécial : Un ensemble d'objets puissants pour vous aider dans vos aventures.
- Un home supplémentaire : Un lieu sacré où vous pourrez entreposer vos trésors et bâtir votre empire.
- Places supplémentaires dans l'enderchest : Augmentez votre capacité de stockage et gardez vos objets les plus précieux à l'abri.
- Et bien plus encore : D'autres bénéfices mystiques attendent les plus dévoués !`)
      .setColor("#237377");
    
      const embed4 = new EmbedBuilder()
      .setDescription(`# 🌟 Comment obtenir le rôle Soutien ?
- Placez fièrement \`\`.gg/wizorah\`\`, \`\`discord.gg/wizorah\`\` ou \`\`https://discord.gg/wizorah\`\` dans votre statut personnalisé.
- En un instant, le rôle **Soutien** vous sera attribué, et vous pourrez commencer à profiter des avantages exclusifs que ce rôle vous offre.`)
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
      embeds: [embed1, embed2, embed3, embed4],
    });
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la commande /infos:', error);
    await interaction.reply('Une erreur est survenue.');
  }
};