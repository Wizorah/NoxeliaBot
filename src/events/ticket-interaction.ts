import { 
    Interaction, 
    CategoryChannel, 
    ChannelType, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder, 
    PermissionsBitField, 
    TextChannel, 
    MessageFlags, 
    StringSelectMenuBuilder 
} from 'discord.js';

export default async function handleInteraction(interaction: Interaction) {
    if (!interaction.isStringSelectMenu() && !interaction.isButton()) return;

    const guild = interaction.guild;
    if (!guild) return;

    const logChannelId = '1315970739043700770'; // ID du canal de log
    const logChannel = guild.channels.cache.get(logChannelId) as TextChannel;

    const role1Id = '1315985328510734396'; // ID du premier rôle
    const role2Id = '1315985278992646145'; // ID du second rôle

    // Répond immédiatement pour éviter l'expiration
    await interaction.deferReply({ ephemeral: true });

    // Gestion des menus déroulants
    if (interaction.isStringSelectMenu() && interaction.customId === 'ticket_menu') {
        const reason = interaction.values[0];
        const categoryId = '1320755108597727342'; // ID de la catégorie des tickets
        const category = guild.channels.cache.get(categoryId) as CategoryChannel;

        if (!category || category.type !== ChannelType.GuildCategory) {
            await interaction.editReply('❌ La catégorie spécifiée est introuvable ou invalide.');
            return;
        }

        const ticketTitle = reason.charAt(0).toUpperCase() + reason.slice(1).replace('_', ' ');

        const ticketChannel = await guild.channels.create({
            name: `${ticketTitle}-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: category.id,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.ReadMessageHistory,
                    ],
                },
                {
                    id: role1Id,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                    ],
                },
                {
                    id: role2Id,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                    ],
                },
            ],
        });

        const embed = new EmbedBuilder()
            .setTitle('<a:guide:1324223906059386912> - Ticket')
            .setDescription(`
            **Merci de patienter pour l'arrivée d’un membre du staff.**

            📋  __Raison du ticket :__ ${ticketTitle}
            🚫  *Cliquez sur le bouton ci-dessous pour fermer le ticket.*`)
            .setColor(0x237377)
            .setFooter({
                text: `©️ 2025 - Wizorah • ${new Date().toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}`,
                iconURL: guild.iconURL() ?? '',
            });

        const closeButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Fermer le ticket')
                .setStyle(ButtonStyle.Danger),
        );

        await ticketChannel.send({ embeds: [embed], components: [closeButton] });

        await interaction.editReply(`✅ Ticket créé : <#${ticketChannel.id}>`);

        if (logChannel) {
            await logChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('🎟️ Nouveau Ticket')
                        .setDescription(`
                        **Catégorie choisie :** ${ticketTitle}
                        **Ouvert par :** ${interaction.user.tag} (${interaction.user.id})
                        **Lien du ticket :** <#${ticketChannel.id}>
                        `)
                        .setColor(0x00ff00)
                        .setTimestamp(),
                ],
            });
        }
    }

    // Gestion des boutons
    if (interaction.isButton() && interaction.customId === 'close_ticket') {
        const channel = interaction.channel as TextChannel;

        if (!channel || channel.type !== ChannelType.GuildText) {
            await interaction.editReply('❌ Cette commande doit être utilisée dans un ticket textuel.');
            return;
        }

        await channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Ticket Fermé')
                    .setDescription('Ce ticket va être supprimé dans 5 secondes.')
                    .setColor(0xff0000),
            ],
        });

        if (logChannel) {
            await logChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('❌ Ticket Fermé')
                        .setDescription(`
                        **Fermé par :** ${interaction.user.tag} (${interaction.user.id})
                        **Nom du ticket :** ${channel.name}
                        `)
                        .setColor(0xff0000)
                        .setTimestamp(),
                ],
            });
        }

        setTimeout(async () => {
            try {
                if (channel.deletable) await channel.delete();
            } catch (error) {
                console.error('Erreur lors de la suppression du canal :', error);
            }
        }, 5000);
    }
}