import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('mute')
  .setDescription('Mettre un membre en sourdine pour une durée spécifiée.')
  .addUserOption(option =>
    option.setName('pseudo')
      .setDescription('Le membre à mettre en sourdine')
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName('durée')
      .setDescription('Durée de la sourdine en minutes')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('raison')
      .setDescription('Raison de la sourdine (facultatif)')
      .setRequired(false)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has('ModerateMembers')) {
    await interaction.reply({ content: '❌ Vous n’avez pas la permission de mettre des membres en sourdine.', ephemeral: true });
    return;
  }

  const user = interaction.options.getUser('pseudo', true);
  const duration = interaction.options.getInteger('durée', true);
  const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';
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
    const timeoutDuration = duration * 60 * 1000; // Convertir en millisecondes
    await member.timeout(timeoutDuration, reason);

    // Récupérer le canal pour les logs
    const logChannel = guild.channels.cache.get('1315970739043700770');
    if (logChannel?.isTextBased()) {
      await logChannel.send(`🔇 **${user.tag}** a été mis en sourdine pour ${duration} minute(s). Raison: ${reason}`);
    }

    await interaction.reply({ content: `✅ **${user.tag}** a été mis en sourdine pour ${duration} minute(s).`, ephemeral: true });
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Une erreur est survenue lors de la mise en sourdine.', ephemeral: true });
  }
}