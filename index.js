import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const UNHACKABLE_ROLE_ID = process.env.UNHACKABLE_ROLE_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.GuildMember]
});

client.once("ready", () => {
  console.log(`🔥 Bot připojen jako ${client.user.tag}`);
});

// auto role když někdo vstoupí
client.on("guildMemberAdd", async (member) => {
  if (member.guild.id !== GUILD_ID) return;

  try {
    const role = await member.guild.roles.fetch(UNHACKABLE_ROLE_ID);
    if (role) {
      await member.roles.add(role, "Auto UNHACKABLE assign");
      console.log(`⚡ Přidána role: ${member.user.tag}`);
    }
  } catch (e) {
    console.error("Chyba při přidání role:", e.message);
  }
});

// přihlášení
client.login(DISCORD_TOKEN);
