import { ChatInputCommandInteraction, SlashCommandBuilder, AttachmentBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("spoil")
    .setDescription("Affiche un aperçu du Lobby Enchanté de Wizorah.");

export async function execute(interaction: ChatInputCommandInteraction) {
    const message = `# :sparkles: Découvrez l'INCROYABLE monde de Wizorah ! :sparkles:
:wave: Salut, aventurier ! Moi, c’est **Noxélia**, la gardienne de ce royaume enchanté. Aujourd’hui, je te fais découvrir un peu du **monde magique de Wizorah** :

## :deciduous_tree: Les 6 bois différents :
**Ébène Spectral :** Avec ses nuances violettes et blanches, ce bois semble hanté, comme si un spectre invoqué par un dangereux Sorcier l’habitait.
**Pin Draconique :** Teinté de rouge orangé, il évoque les flammes d’un dragon, d’où il tire son nom impressionnant.
**Hêtre Maudit :** D’une couleur verte singulière, la légende raconte qu’il a été frappé par une malédiction de Zoltar, ce qui rendrait son bois empoisonné.
**Bouleau Arcanique :** Avec son écorce brune et blanche, cet arbre majestueux inspire le respect et la fascination des bâtisseurs.
**Cèdre du Crépuscule :** Haut et imposant, ses tons violets profonds lui confèrent une aura inquiétante, comme un gardien des ombres.
**Érable de l’Abysse :** Arborant une teinte bleue saisissante, il semble émerger directement des abysses océaniques mystérieux de Wizorah.

:european_castle: Que tu sois un stratège ou un guerrier, ton aventure commence ici. Choisis ton destin et prépare-toi à écrire l’histoire de **Wizorah**.

:star2: **Reste connecté, car ce n’est que le début !** :star2:

L’aventure n’attend plus que toi ! :herb:`;

    // Créer une liste de pièces jointes pour les images
    const images = [
        'https://i.ibb.co/K2CzXn6/spoil1.png',
        'https://i.ibb.co/FzWVs13/spoil2.png',
        'https://i.ibb.co/4mjPDPs/spoil3.png',
        'https://i.ibb.co/2k8G6vG/spoil5.png',
        'https://i.ibb.co/xXyjzJ9/spoil4.png'
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