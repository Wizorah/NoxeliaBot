import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Bannir un membre avec une durée facultative ou à vie.')
  .addUserOption(option =>
    option.setName('pseudo')
      .setDescription('Le membre à bannir')
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName('durée')
      .setDescription('Durée du bannissement en jours (laisser vide pour un bannissement permanent)')
      .setRequired(false)
  )
  .addStringOption(option =>
    option.setName('raison')
      .setDescription('Raison du bannissement (facultatif)')
      .setRequired(false)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has('BanMembers')) {
    await interaction.reply({ content: '❌ Vous n’avez pas la permission de bannir des membres.', ephemeral: true });
    return;
  }

  const user = interaction.options.getUser('pseudo', true);
  const duration = interaction.options.getInteger('durée'); // Pas de valeur par défaut, absence signifie permanent
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

  try {
    if (duration) {
      await member.ban({ deleteMessageSeconds: duration * 24 * 60 * 60, reason });

      const logChannel = guild.channels.cache.get('1315970739043700770');
      if (logChannel?.isTextBased()) {
        await logChannel.send(`🔨 **${user.tag}** a été banni pour ${duration} jour(s). Raison: ${reason}`);
      }

      await interaction.reply({ content: `✅ **${user.tag}** a été banni pour ${duration} jour(s).`, ephemeral: true });
    } else {
      // Bannissement permanent
      await member.ban({ deleteMessageSeconds: 0, reason });

      const logChannel = guild.channels.cache.get('1315970739043700770');
      if (logChannel?.isTextBased()) {
        await logChannel.send(`🔨 **${user.tag}** a été banni à vie. Raison: ${reason}`);
      }

      await interaction.reply({ content: `✅ **${user.tag}** a été banni à vie.`, ephemeral: true });
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Une erreur est survenue lors du bannissement.', ephemeral: true });
  }
}