import { Client, VoiceState, VoiceChannel, ChannelType } from "discord.js";

const targetChannelId = "1325556769048498186"; // ID du salon vocal cible
const parentCategoryId = "1315978625610285117"; // ID de la catégorie où créer les salons vocaux
const voiceChannels = new Map<string, string>(); // Map pour stocker les salons vocaux créés

export default function setupVoiceManager(client: Client) {
    client.on("voiceStateUpdate", async (oldState: VoiceState, newState: VoiceState) => {
        // Vérifie si un utilisateur rejoint le salon cible
        if (newState.channelId === targetChannelId && oldState.channelId !== targetChannelId) {
            const user = newState.member;
            if (!user) return;

            try {
                // Crée un salon vocal
                const guild = newState.guild;
                const channelName = `Vocal ${user.user.username}`;

                const createdChannel = await guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildVoice, // Type de salon vocal
                    parent: parentCategoryId, // Catégorie parente
                    userLimit: 5, // Limite d'utilisateurs
                });

                // Vérifie que le salon est un salon vocal, puis déplace l'utilisateur
                if (createdChannel.type === ChannelType.GuildVoice) {
                    await newState.setChannel(createdChannel); // Déplace l'utilisateur
                    voiceChannels.set(user.id, createdChannel.id); // Stocke l'ID du salon
                }
            } catch (error) {
                console.error("Erreur lors de la création ou du déplacement du salon vocal :", error);
            }
        }

        // Vérifie si un utilisateur quitte son salon privé
        const userLeftChannelId = oldState.channelId;
        if (userLeftChannelId && voiceChannels.has(oldState.member!.id)) {
            const createdChannelId = voiceChannels.get(oldState.member!.id)!;
            const createdChannel = oldState.guild.channels.cache.get(createdChannelId);

            // Si le salon est vide, supprimez-le
            if (
                createdChannel?.type === ChannelType.GuildVoice &&
                (createdChannel as VoiceChannel).members.size === 0
            ) {
                try {
                    voiceChannels.delete(oldState.member!.id);
                    await createdChannel.delete("Salon vocal vide après le départ de son créateur");
                } catch (error) {
                    console.error("Erreur lors de la suppression du salon vocal :", error);
                }
            }
        }
    });
}