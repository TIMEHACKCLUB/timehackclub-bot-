// index.js – Time Hack Club UNHACKABLE bot

import { Client, GatewayIntentBits } from "discord.js";

// Env proměnné z Railway
const { DISCORD_TOKEN, GUILD_ID, UNHACKABLE_ROLE_ID } = process.env;

if (!DISCORD_TOKEN) {
  console.error("❌ Chybí DISCORD_TOKEN v env proměnných!");
  process.exit(1);
}
if (!GUILD_ID) {
  console.error("❌ Chybí GUILD_ID v env proměnných!");
}
if (!UNHACKABLE_ROLE_ID) {
  console.error("❌ Chybí UNHACKABLE_ROLE_ID v env proměnných!");
}

// Klient s potřebnými intenty (aby šly členové a role)
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

// Bot je online
client.once("ready", () => {
  console.log(`⚡ UNHACKABLE bot přihlášen jako: ${client.user.tag}`);
});

// Auto role když někdo vstoupí
client.on("guildMemberAdd", async (member) => {
  // jen náš server
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

// Přihlášení bota – DŮLEŽITÉ: používá process.env
client
  .login(DISCORD_TOKEN)
  .catch((err) => {
    console.error("❌ Chyba při přihlášení bota:", err);
    process.exit(1);
  });
