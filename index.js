// index.js – Time Hack Club UNHACKABLE bot

import { Client, GatewayIntentBits } from "discord.js";

const DISCORD_TOKEN = "MTQzNzU1MzI1NjQxODI0NjcyNg.GYJjPq.F_RN0o-cR_oR9SUkwdzs6CDEXi1dAgnkQpV10A";
const GUILD_ID = "1416535999256723486";
const UNHACKABLE_ROLE_ID = "1437469487879164036";

console.log("🔍 DISCORD_TOKEN set:", !!DISCORD_TOKEN);
console.log("🔍 GUILD_ID:", GUILD_ID || "undefined");
console.log("🔍 UNHACKABLE_ROLE_ID:", UNHACKABLE_ROLE_ID || "undefined");

if (!DISCORD_TOKEN) {
  console.error("❌ DISCORD_TOKEN v env proměnných chybí – ukončuji.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log(`⚡ UNHACKABLE bot přihlášen jako: ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  if (GUILD_ID && member.guild.id !== GUILD_ID) return;

  try {
    const role = await member.guild.roles.fetch(UNHACKABLE_ROLE_ID);
    if (!role) {
      console.error("❌ UNHACKABLE role nenalezena!");
      return;
    }

    await member.roles.add(role, "Auto UNHACKABLE assign");
    console.log(`⚡ Přidána role: ${member.user.tag}`);
  } catch (e) {
    console.error("Chyba při přidání role:", e.message);
  }
});

client.login(DISCORD_TOKEN).catch((err) => {
  console.error("❌ Chyba při přihlášení bota:", err);
  process.exit(1);
});
