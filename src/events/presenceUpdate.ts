import { Events, Presence, ActivityType } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const ROLE_ID = "1324524361192968263"; // ID du rôle Soutien
const KEYWORDS = [".gg/wizorah", "discord.gg/wizorah", "https://discord.gg/wizorah"];

export default (client: any) => {
  client.on(Events.PresenceUpdate, async (oldPresence: Presence | null, newPresence: Presence) => {
    if (!newPresence?.member || !newPresence.guild || newPresence.guild.id !== process.env.GUILD_ID) {
      return;
    }

    const member = newPresence.member;

    // Récupération du statut personnalisé
    const statusText = newPresence.activities
      .filter(activity => activity.type === ActivityType.Custom)
      .map(activity => activity.state || "")
      .join(" ")
      .toLowerCase();

    // Vérifier la présence de mots-clés dans le statut personnalisé
    const hasKeyword = KEYWORDS.some(keyword => statusText.includes(keyword));

    try {
      const role = await newPresence.guild.roles.fetch(ROLE_ID);
      if (!role) {
        console.error("Rôle Soutien introuvable.");
        return;
      }

      if (hasKeyword && !member.roles.cache.has(ROLE_ID)) {
        await member.roles.add(ROLE_ID);
      } else if (!hasKeyword && member.roles.cache.has(ROLE_ID)) {
        await member.roles.remove(ROLE_ID);
      }
    } catch (error) {
      console.error(`Erreur lors de la gestion des rôles :`, error);
    }
  });
};