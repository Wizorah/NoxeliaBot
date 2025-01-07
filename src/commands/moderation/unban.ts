import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('unban')
  .setDescription('Débannir un utilisateur.')
  .addStringOption(option =>
    option.setName('id')
      .setDescription('ID de l’utilisateur à débannir')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has('BanMembers')) {
    await interaction.reply({ content: '❌ Vous n’avez pas la permission de débannir des membres.', ephemeral: true });
    return;
  }

  const userId = interaction.options.getString('id', true);
  const guild = interaction.guild;

  if (!guild) {
    await interaction.reply({ content: 'Impossible d’exécuter cette commande en dehors d’un serveur.', ephemeral: true });
    return;
  }

  try {
    await guild.bans.remove(userId);

    // Récupérer le canal pour les logs
    const logChannel = guild.channels.cache.get('1315970739043700770');
    if (logChannel?.isTextBased()) {
      await logChannel.send(`✅ **L'utilisateur avec l'ID ${userId}** a été débanni.`);
    }

    await interaction.reply({ content: `✅ Utilisateur avec l'ID **${userId}** débanni.`, ephemeral: true });
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Une erreur est survenue lors du débannissement.', ephemeral: true });
  }
}