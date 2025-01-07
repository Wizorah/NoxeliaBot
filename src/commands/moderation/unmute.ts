import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('unmute')
  .setDescription('Annuler la sourdine d’un membre.')
  .addUserOption(option =>
    option.setName('pseudo')
      .setDescription('Le membre à débloquer')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has('ModerateMembers')) {
    await interaction.reply({ content: '❌ Vous n’avez pas la permission d’annuler la sourdine de membres.', ephemeral: true });
    return;
  }

  const user = interaction.options.getUser('pseudo', true);
  const guild = interaction.guild;

  if (!guild) {
    await interaction.reply({ content: 'Impossible d’exécuter cette commande en dehors d’un serveur.', ephemeral: true });
    return;
  }

  const member = await guild.members.fetch(user.id).catch(() => null);

  if (!member) {
    await interaction.reply({ content: 'Utilisateur introuvable sur ce serveur.', ephemeral: true });
    return;
  }

  if (!(member instanceof GuildMember)) {
    await interaction.reply({ content: 'Impossible de modifier cet utilisateur.', ephemeral: true });
    return;
  }

  try {
    await member.timeout(null); // Annule la timeout

    // Récupérer le canal pour les logs
    const logChannel = guild.channels.cache.get('1315970739043700770');
    if (logChannel?.isTextBased()) {
      await logChannel.send(`✅ **${user.tag}** a été débloqué.`);
    }

    await interaction.reply({ content: `✅ **${user.tag}** n’est plus en sourdine.`, ephemeral: true });
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Une erreur est survenue lors de l’annulation de la sourdine.', ephemeral: true });
  }
}