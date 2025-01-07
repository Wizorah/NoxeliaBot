import { Client, GuildMember, TextChannel, VoiceState, EmbedBuilder } from "discord.js";
import Database from "better-sqlite3";

// Initialisation de la base de données
const db = new Database('./activity.db');

// Création des tables si elles n'existent pas
db.prepare(`
CREATE TABLE IF NOT EXISTS activity (
    userId TEXT PRIMARY KEY,
    messages INTEGER DEFAULT 0,
    voiceTime INTEGER DEFAULT 0,
    lastUpdated INTEGER DEFAULT (strftime('%s', 'now')),
    totalPoints INTEGER DEFAULT 0,
    semiActiveWeeks INTEGER DEFAULT 0,
    activeWeeks INTEGER DEFAULT 0,
    superActiveWeeks INTEGER DEFAULT 0
)
`).run();

export function trackMessage(member: GuildMember) {
    const userId = member.id;
    const now = Math.floor(Date.now() / 1000);

    const user = db.prepare(`SELECT * FROM activity WHERE userId = ?`).get(userId);
    if (user) {
        db.prepare(`UPDATE activity SET messages = messages + 1, lastUpdated = ? WHERE userId = ?`).run(now, userId);
    } else {
        db.prepare(`INSERT INTO activity (userId, messages, voiceTime, lastUpdated) VALUES (?, 1, 0, ?)`).run(userId, now);
    }
}

export function trackVoiceTime(oldState: VoiceState, newState: VoiceState) {
    const userId = newState.id;

    if (!oldState.channelId && newState.channelId) {
        db.prepare(`INSERT OR IGNORE INTO activity (userId, messages, voiceTime, lastUpdated) VALUES (?, 0, 0, strftime('%s', 'now'))`).run(userId);
    }

    if (oldState.channelId && !newState.channelId && oldState.member?.joinedTimestamp) {
        const timeSpent = Math.floor((Date.now() - oldState.member.joinedTimestamp) / 1000);
        db.prepare(`UPDATE activity SET voiceTime = voiceTime + ? WHERE userId = ?`).run(timeSpent, userId);
    }
}

export function checkActivity(client: Client) {
    const thresholds = [
        { roleId: "1325527967362715699", messages: 200, voiceTime: 7200, reward: 10, weeksKey: 'semiActiveWeeks' }, // Semi-Actif
        { roleId: "1325528101253288019", messages: 400, voiceTime: 18000, reward: 20, weeksKey: 'activeWeeks' }, // Actif
        { roleId: "1325528006080331776", messages: 700, voiceTime: 28800, reward: 30, weeksKey: 'superActiveWeeks' }, // Super-Actif
    ];

    const guild = client.guilds.cache.get(process.env.GUILD_ID!);
    if (!guild) return;

    const users = db.prepare(`SELECT * FROM activity`).all();
    for (const user of users) {
        const member = guild.members.cache.get(user.userId);
        if (!member) continue;

        for (const { roleId, messages, voiceTime, reward, weeksKey } of thresholds) {
            const hasRole = member.roles.cache.has(roleId);
            const meetsCriteria = user.messages >= messages || user.voiceTime >= voiceTime;

            if (meetsCriteria && !hasRole) {
                member.roles.add(roleId).catch(console.error);
            }

            if (meetsCriteria) {
                db.prepare(`UPDATE activity SET ${weeksKey} = ${weeksKey} + 1, totalPoints = totalPoints + ? WHERE userId = ?`).run(reward, user.userId);
            }
        }
    }

    // Réinitialisation hebdomadaire
    db.prepare(`UPDATE activity SET messages = 0, voiceTime = 0`).run();
}

export function getActivity(userId: string) {
    return db.prepare(`SELECT * FROM activity WHERE userId = ?`).get(userId);
}