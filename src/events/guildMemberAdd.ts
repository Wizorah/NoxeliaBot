import { Client, GuildMember } from "discord.js";

export default (client: Client) => {
    client.on('guildMemberAdd', async (member: GuildMember) => {
        const channel = member.guild.channels.cache.get('1315975691723866122');

        if (!channel || !channel.isTextBased()) return;

        // Message de bienvenue public dans le chat
        const publicMessage = `⚔️ Oh ! Un NOUVEAU guerrier est apparu dans le monde de Wizorah ! Bienvenue à toi, je te laisse te présenter ${member.user} !`;
        await channel.send(publicMessage);

        // Message privé au joueur
        const privateMessage = `🌟 Oh ! Un NOUVEAU guerrier est apparu ! Bienvenue à toi, ${member.user} !  
Je suis **Noxélia**, gardienne du monde de **Wizorah**.  
Prépare-toi à affronter de puissants ennemis et à écrire ta légende auprès du **Grand Conseil** ! ⚔️🔥  

Le terrible sorcier **Zoltar** complote dans l'ombre... Nous avons besoin de ton courage ! 💪  
Ensemble, nous protégerons ces terres mystérieuses et triompherons du mal !`;

        try {
            await member.send(privateMessage); // Envoi du MP
        } catch (error) {
            console.error(`Impossible d'envoyer un message privé à ${member.user.tag}.`);
        }
    });
};