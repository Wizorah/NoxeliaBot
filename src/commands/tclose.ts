import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('tclose')
    .setDescription('Ferme le ticket dans lequel cette commande est utilisée.');

export async function execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.channel;

    // Vérification si le channel est un TextChannel
    if (!channel || !(channel instanceof TextChannel)) {
        await interaction.reply({
            content: '❌ Cette commande doit être utilisée dans un ticket textuel.',
            ephemeral: true,
        });
        return;
    }

    try {
        await channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Ticket Fermé')
                    .setDescription('Ce ticket va être supprimé dans 5 secondes.')
                    .setColor('#FF0000'),
            ],
        });

        setTimeout(async () => {
            await channel.delete();
        }, 5000);

        await interaction.reply({
            content: '✅ Le ticket sera fermé sous peu.',
            ephemeral: true,
        });
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: '❌ Une erreur est survenue lors de la fermeture du ticket.',
            ephemeral: true,
        });
    }
}