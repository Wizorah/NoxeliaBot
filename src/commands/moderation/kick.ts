import { SlashCommandBuilder } from "discord.js";
import { ChatInputCommandInteraction, GuildMember, TextChannel, PermissionsBitField, MessageFlags } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulser un utilisateur du serveur.')
    .addUserOption(option => 
        option.setName('utilisateur')
            .setDescription('L\'utilisateur à expulser')
            .setRequired(true)
    )
    .addStringOption(option => 
        option.setName('raison')
            .setDescription('Raison de l\'expulsion')
            .setRequired(false)
    );

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    // Vérification des permissions
    if (!interaction.memberPermissions?.has(PermissionsBitField.Flags.KickMembers)) {
        await interaction.reply({
            content: '❌ Vous n\'avez pas la permission d\'expulser des membres.',
            flags: MessageFlags.Ephemeral,
        });
        return;
    }

    const utilisateur = interaction.options.getUser('utilisateur');
    const raison = interaction.options.getString('raison');

    if (!utilisateur) {
        await interaction.reply({ content: 'Utilisateur introuvable.', ephemeral: true });
        return;
    }

    const membre = interaction.guild?.members.cache.get(utilisateur.id) as GuildMember;
    if (!membre) {
        await interaction.reply({ content: 'Membre introuvable dans ce serveur.', ephemeral: true });
        return;
    }

    try {
        await membre.kick(raison || 'Aucune raison spécifiée');

        // Réponse éphémère pour l'utilisateur exécutant la commande
        await interaction.reply({ content: 'Commande exécutée, voir le log.', ephemeral: true });

        // Envoi du message de confirmation dans le canal de log
        const logChannel = interaction.guild?.channels.cache.get('1315970739043700770') as TextChannel;
        if (logChannel && logChannel.isTextBased()) {
            await logChannel.send(`${utilisateur.tag} a été expulsé. ${raison ? `Raison : ${raison}` : ''}`);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
        console.error(`Erreur lors de l\'expulsion :`, error);

        // Réponse en cas d'erreur
        await interaction.reply({
            content: `❌ Une erreur s\'est produite lors de l\'expulsion : ${errorMessage}`,
            flags: MessageFlags.Ephemeral,
        });

        // Envoi de l'erreur dans le canal de log
        const logChannel = interaction.guild?.channels.cache.get('1315970739043700770') as TextChannel;
        if (logChannel && logChannel.isTextBased()) {
            await logChannel.send(`❌ Erreur lors de l'expulsion de ${utilisateur.tag}: ${errorMessage}`);
        }
    }
}
