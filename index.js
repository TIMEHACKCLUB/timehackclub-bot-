// TimeHackClub UNHACKABLE bot – čistá verze

import { Client, GatewayIntentBits } from "discord.js";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const UNHACKABLE_ROLE_ID = process.env.UNHACKABLE_ROLE_ID;

if (!DISCORD_TOKEN) {
  console.error("❌ DISCORD_TOKEN chybí");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log(`⚡ Bot přihlášen jako: ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  if (GUILD_ID && member.guild.id !== GUILD_ID) return;

  try {
    const role = await member.guild.roles.fetch(UNHACKABLE_ROLE_ID);
    if (!role) {
      console.error("❌ Role UNHACKABLE nenalezena");
      return;
    }

    await member.roles.add(role, "Auto UNHACKABLE assign");
    console.log(`⚡ Přidána role UNHACKABLE pro: ${member.user.tag}`);
  } catch (e) {
    console.error("❌ Chyba při přidání role:", e.message);
  }
});

client.login(DISCORD_TOKEN).catch((err) => {
  console.error("❌ Chyba při přihlášení bota:", err);
  process.exit(1);
});
