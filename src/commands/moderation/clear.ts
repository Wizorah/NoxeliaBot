import { SlashCommandBuilder, ChatInputCommandInteraction, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('clear')
  .setDescription('Supprime un nombre défini de messages dans le canal.')
  .addIntegerOption(option =>
    option.setName('nombre')
      .setDescription('Nombre de messages à supprimer (entre 1 et 100)')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has('ManageMessages')) {
    await interaction.reply({ content: '❌ Vous n’avez pas la permission de supprimer des messages.', ephemeral: true });
    return;
  }

  const count = interaction.options.getInteger('nombre', true);

  if (count < 1 || count > 100) {
    await interaction.reply({ content: '❌ Veuillez spécifier un nombre entre 1 et 100.', ephemeral: true });
    return;
  }

  const channel = interaction.channel;

  if (!channel || !channel.isTextBased()) {
    await interaction.reply({ content: '❌ Cette commande ne peut être utilisée que dans un canal textuel.', ephemeral: true });
    return;
  }

  try {
    const messages = await (channel as TextChannel).bulkDelete(count, true);

    const logChannel = interaction.guild?.channels.cache.get('1315970739043700770');
    if (logChannel?.isTextBased()) {
      await logChannel.send(`🗑️ **${interaction.user.tag}** a supprimé **${messages.size}** message(s) dans le canal <#${channel.id}>.`);
    }

    await interaction.reply({ content: `✅ **${messages.size}** message(s) ont été supprimé(s).`, ephemeral: true });
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: '❌ Une erreur est survenue lors de la suppression des messages.', ephemeral: true });
  }
}