import { ChatInputCommandInteraction, SlashCommandBuilder, AttachmentBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("spoil")
    .setDescription("Affiche un aperçu du Lobby Enchanté de Wizorah.");

export async function execute(interaction: ChatInputCommandInteraction) {
    const message = `# <:wizo:1324796654557204515> Découvrez l'INCROYABLE monde de Wizorah !
:wave: Salut, aventurier ! Moi, c’est **Noxélia**, la gardienne de ce royaume enchanté. Aujourd’hui, je te fais découvrir un peu du **monde magique de Wizorah** :

## :crossed_swords: Les outils en **Draknite** (le meilleur et le plus rare minerais du monde de Wizorah) :

- Épée en **Draknite**
- Pioche en **Draknite**
- Hache en **Draknite**
- Pelle en **Draknite**

## Mais aussi :

- Les mystérieux **GRIMOIRES** magiques de Wizorah ils ont une puissance que nul ne connaît pour le moment, nos **nains chercheurs** sont sur le coup pour le prochain spoil... :eyes:

<:noxelia:1324796818202300446> Que tu sois un stratège ou un guerrier, ton aventure commence ici. Choisis ton destin et prépare-toi à écrire l’histoire de **Wizorah**.

<a:soon:1324796759737634826> **Reste connecté, car ce n’est que le début !**

L’aventure n’attend plus que toi ! <a:mc:1324796716985221262>`;

    // Créer une liste de pièces jointes pour les images
    const images = [
        'https://media.discordapp.net/attachments/1315983540348780554/1324792961703084062/SPOIL_4.png?ex=67797117&is=67781f97&hm=2c303ee2e7580d970378666b4615a58cfbeed869480f3e62777c02feed7b3013&=&format=webp&quality=lossless&width=1440&height=716',
        'https://cdn.discordapp.com/attachments/1315983540348780554/1324794622664376421/grimoires.png?ex=677972a3&is=67782123&hm=844d70cefc91a69b6675c6df2a716635178ed106c0b4a4b63841bbfd97f81804&'
    ];

    const attachments = images.map((url, index) => new AttachmentBuilder(url, { name: `spoil${index + 1}.png` }));

    try {
        // Envoie le message dans le salon où la commande a été exécutée, avec les images en pièces jointes
        await interaction.reply({ 
            content: message, 
            files: attachments, 
            ephemeral: false 
        });
    } catch (error) {
        console.error("Erreur lors de l'envoi du message spoil :", error);
        await interaction.reply({
            content: "Une erreur est survenue en essayant d'envoyer le message.",
            ephemeral: true,
        });
    }
}