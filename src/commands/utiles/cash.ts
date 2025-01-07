import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'; 

export const data = new SlashCommandBuilder()
  .setName('cash')
  .setDescription('Affiche le message du concours Cashprize sur Wizorah.');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const message = `
# :tada: Concours Cashprize sur Wizorah ! :tada:

:bell:** Wizorah** lance un grand concours avec des cashprizes à la clé pour récompenser les meilleurs participants de notre communauté ! Voici les nouvelles récompenses basées sur le nombre d'invitations :

- **50 invitations = 5€** :euro:  
- **100 invitations = 10€** :euro:  
- **150 invitations = 15€** :euro:  
- **200 invitations = 20€** :euro:  

**Note importante** : Les gains seront attribués uniquement **à la fin du concours**, qui correspondra à l'ouverture officielle du serveur Discord ! :calendar:  

## :joystick: Comment participer ?
1. Invite tes amis pour accumuler des invitations. Plus tu invites, plus tes gains augmentent !
2. Les récompenses sont cumulables. Par exemple : **400 invitations = 40€**. Profite-en pour maximiser tes gains !

Prépare-toi pour l'ouverture officielle du serveur et fais exploser ton compteur d'invitations ! :rocket: Bonne chance à tous les participants ! :four_leaf_clover:
`;

  // Réponse avec le message du concours
  await interaction.reply({ content: message });
}

