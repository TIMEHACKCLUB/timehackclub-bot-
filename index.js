// index.js – Time Hack Club UNHACKABLE bot

import { Client, GatewayIntentBits } from "discord.js";

// --- HARD CODE TOKEN (protože Railway ho nepředává) ---
const DISCORD_TOKEN = "MTQzNzU1MzI1NjQxODI0NjcyNg.GYJjPq.F_RN0o-cR_oR9SUkwdzs6CDEXi1dAgnkQpV10A"
const GUILD_ID = process.env.GUILD_ID;
const UNHACKABLE_ROLE_ID = process.env.UNHACKABLE_ROLE_ID;

// Log pro kontrolu
console.log("🔍 BOT STARTUJE…");

// Klient s potřebnými intenty
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

// Přihlášení
client
  .login(DISCORD_TOKEN)
  .catch((err) => {
    console.error("❌ Chyba při přihlášení bota:", err);
    process.exit(1);
  });
