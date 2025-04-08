import process from "process";

let handler = async (m, { conn }) => {
  let envVars = process.env; // Get all environment variables
  let keys = Object.keys(envVars);

  if (keys.length === 0) {
    return m.reply("❌ No environment variables found.");
  }

  let message = "🔧 *Vortex Xmd - Environment Variables State*\n\n";

  keys.forEach((key) => {
    let value = envVars[key] ? "✅ SET" : "❌ NOT SET";
    message += `*${key}*: ${value}\n`;
  });

  m.reply(message);
};

handler.help = ["checkvars"];
handler.tags = ["system"];
handler.command = /^settings$/i;

export default handler;
