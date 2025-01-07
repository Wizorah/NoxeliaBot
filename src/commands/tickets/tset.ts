import { 
    SlashCommandBuilder, 
    ChatInputCommandInteraction, 
    TextChannel, 
    ActionRowBuilder,
    SelectMenuBuilder, 
    EmbedBuilder 
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('tset')
    .setDescription('Poste le panel pour ouvrir un ticket')
    .addStringOption(option =>
        option.setName('channel')
            .setDescription('ID du canal où poster le panel')
            .setRequired(true)
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.memberPermissions?.has('ManageChannels')) {
        await interaction.reply({
            content: '❌ Vous n’avez pas les permissions nécessaires pour utiliser cette commande.',
            ephemeral: true,
        });
        return;
    }

    const channelId = interaction.options.getString('channel', true);
    const guild = interaction.guild;

    if (!guild) {
        await interaction.reply({
            content: '❌ Cette commande ne peut être utilisée que dans un serveur.',
            ephemeral: true,
        });
        return;
    }

    const channel = guild.channels.cache.get(channelId) as TextChannel;

    if (!channel || !channel.isTextBased()) {
        await interaction.reply({
            content: '❌ Le canal spécifié est invalide ou inaccessible.',
            ephemeral: true,
        });
        return;
    }

    const embed = new EmbedBuilder()
        .setTitle('<a:support:1325523737579229306> - Support')
        .setDescription(
            `**Cliquez sur le bouton ci-dessous pour ouvrir un ticket.**

**:scroll: Conditions et informations sur les tickets**

• Merci de préciser votre pseudo en expliquant votre problème.
• Sans réponse de votre part, le ticket sera fermé au bout de 12 heures.
• Tout abus d'ouverture de ticket sera sanctionné.`
        )
        .setColor('#237377')
        .setFooter({
            text: `©️ 2025 - Wizorah • ${new Date().toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })}`,
            iconURL: 'https://i.ibb.co/z5B7X26/icon-fond.png',
        });

    const menu = new SelectMenuBuilder()
        .setCustomId('ticket_menu')
        .setPlaceholder('Sélectionnez une raison')
        .addOptions([
            { label: '💰 - Boutique', value: 'boutique' },
            { label: '🤝 - Partenaire', value: 'partenaire' },
            { label: '🧨 - Plainte Staff', value: 'plainte_staff' },
            { label: '💯 - Voter', value: 'voter' },
            { label: '🎮 - En jeu', value: 'en_jeu' },
            { label: '⚡ - Plainte Joueur', value: 'plainte_joueur' },
            { label: '⚙️ - Bug', value: 'bug' },
            { label: '🎩 - Révision de Sanction', value: 'revision_sanction' },
            { label: '🎯 - Autre demande', value: 'autre_demande' },
        ]);

    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(menu);

    await channel.send({ embeds: [embed], components: [row] });

    await interaction.reply({
        content: `✅ Panel envoyé dans le canal <#${channelId}>.`,
        ephemeral: true,
    });
}