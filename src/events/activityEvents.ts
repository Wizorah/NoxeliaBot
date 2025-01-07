import { Client, VoiceState } from "discord.js";
import { trackMessage, trackVoiceTime, checkActivity } from "../utils/activityTracker";

export default function setupActivityEvents(client: Client) {
    client.on("messageCreate", (message) => {
        if (!message.guild || message.author.bot) return;
        const member = message.guild.members.cache.get(message.author.id);
        if (member) trackMessage(member);
    });

    client.on("voiceStateUpdate", (oldState, newState) => {
        trackVoiceTime(oldState, newState);
    });

    // Planification pour vérifier l'activité chaque semaine
    setInterval(() => {
        checkActivity(client);
    }, 7 * 24 * 60 * 60 * 1000); // Toutes les semaines
}
