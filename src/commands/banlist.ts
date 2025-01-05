import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    Message,
  } from 'discord.js';
  
  export const data = new SlashCommandBuilder()
    .setName('banlist')
    .setDescription('Affiche la liste des membres bannis.');
  
  export async function execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) {
      await interaction.reply({ content: 'Cette commande doit être exécutée dans un serveur.', ephemeral: true });
      return;
    }
  
    if (!interaction.memberPermissions?.has('BanMembers')) {
      await interaction.reply({ content: '❌ Vous n’avez pas la permission de voir la liste des bannis.', ephemeral: true });
      return;
    }
  
    try {
      const bans = await interaction.guild.bans.fetch();
      const banArray = Array.from(bans.values());
  
      if (banArray.length === 0) {
        await interaction.reply({ content: '🚫 Aucun membre n’est actuellement banni.', ephemeral: true });
        return;
      }
  
      // Pagination variables
      const itemsPerPage = 10;
      let currentPage = 0;
      const totalPages = Math.ceil(banArray.length / itemsPerPage);
  
      // Function to generate embed for a specific page
      const generateEmbed = (page: number) => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageBans = banArray.slice(startIndex, endIndex);
  
        const embed = new EmbedBuilder()
          .setTitle(`<a:info:1324223851621650483> Liste des membres bannis (Page ${page + 1}/${totalPages})`)
          .setFooter({
            text: `©️ 2025 - Wizorah • ${new Date().toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}`,
            iconURL: "https://i.ibb.co/z5B7X26/icon-fond.png",
          })
          .setColor("#237377");
  
        pageBans.forEach(ban => {
          embed.addFields({
            name: `${ban.user.tag}`,
            value: `ID: ${ban.user.id}`,
            inline: false,
          });
        });
  
        return embed;
      };
  
      // Create initial embed and buttons
      const embed = generateEmbed(currentPage);
      const backButton = new ButtonBuilder()
        .setCustomId('back')
        .setLabel('⬅️')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(currentPage === 0);
      const nextButton = new ButtonBuilder()
        .setCustomId('next')
        .setLabel('➡️')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(currentPage === totalPages - 1);
  
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(backButton, nextButton);
  
      const message = (await interaction.reply({
        embeds: [embed],
        components: [row],
        fetchReply: true,
      })) as Message;
  
      // Collector for buttons
      const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 60000, // Active for 60 seconds
      });
  
      collector.on('collect', async (buttonInteraction) => {
        if (buttonInteraction.user.id !== interaction.user.id) {
          await buttonInteraction.reply({
            content: '❌ Vous ne pouvez pas interagir avec cette commande.',
            ephemeral: true,
          });
          return;
        }
  
        // Update the page based on button click
        if (buttonInteraction.customId === 'back') {
          currentPage = Math.max(0, currentPage - 1);
        } else if (buttonInteraction.customId === 'next') {
          currentPage = Math.min(totalPages - 1, currentPage + 1);
        }
  
        // Update embed and buttons
        const updatedEmbed = generateEmbed(currentPage);
        backButton.setDisabled(currentPage === 0);
        nextButton.setDisabled(currentPage === totalPages - 1);
  
        const updatedRow = new ActionRowBuilder<ButtonBuilder>().addComponents(backButton, nextButton);
  
        await buttonInteraction.update({
          embeds: [updatedEmbed],
          components: [updatedRow],
        });
      });
  
      collector.on('end', async () => {
        // Disable buttons when the collector ends
        const disabledRow = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            backButton.setDisabled(true),
            nextButton.setDisabled(true)
          );
  
        await message.edit({ components: [disabledRow] });
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Une erreur est survenue lors de la récupération de la liste des bannis.',
        ephemeral: true,
      });
    }
  }  