import os from 'os';
import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

let handler = async (m, { conn }) => {
  // Media resources
  const menuThumbnail = 'https://i.imgur.com/jB9MJOn.jpeg';
  const audioUrl = 'https://github.com/SilvaTechB/silva-md-bot/raw/main/media/Menu.mp3';

  // Dynamic command loader
  const lazackPath = './hanstzcmds';
  const commands = await readdir(lazackPath);
  const commandList = commands
    .map((cmd, idx) => `┠─ ◦ ${idx + 1}. ${path.parse(cmd).name}`)
    .join('\n');

  // Enhanced system monitor
  const sysInfo = {
    totalRAM: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
    usedRAM: `${((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(2)} GB`,
    uptime: moment.duration(os.uptime(), 'seconds').humanize(),
    timestamp: moment.tz('Africa/Nairobi').format('ddd DD/MM/YY HH:mm:ss'),
    platform: `${os.platform()} ${os.arch()}`,
    version: '2.1.2',
    developer: '@Mrhanstz'
  };

  // Expanded theme collection
  const menuTemplates = {
    cyberpunk: ({ user, commands, ...info }) => `
╭──「 VORTEX XMD ⁣𓄹▸ᴮᴼᵀ 」
│ ◦ ʜᴇʏ ${user}
│ ◦ ${info.timestamp}
╰┬─────────────
╭┴─────────────
│ ˹⚡˼ ʀᴀᴍ: ${info.usedRAM}/${info.totalRAM}
│ ˹🕒˼ ᴜᴘᴛɪᴍᴇ: ${info.uptime}
│ ˹💻˼ ᴏs: ${info.platform}
╰┬─────────────
╭┴──「 ᴄᴏᴍᴍᴀɴᴅs 」
🤖 botmenu
👑 ownermenu
🧑‍🤝‍🧑 groupmenu
📥 dlmenu
🎉 funmenu
💰 economymenu
🎮 gamemenu
🎨 stickermenu
🧰 toolmenu
🎩 logomenu
🌙 nsfwmenu
🙈 list
🌚 menu2
🧠 gpt
╰──────────────────
🔗 github.com/SilvaTechB
    `.trim(),

    neon: ({ user, ...info }) => `
▗▄▄ ▸▸◂ 𝐒𝐈𝐋𝐕𝐀𝐌𝐃
  ╭───────────
  │ ◦ 𝗛𝗲𝘆 ${user}
  │ ◦ ${info.timestamp}
  ╰┬──────────
  ╭┴──────────
  │ 𝗥𝗔𝗠: ${info.usedRAM}/${info.totalRAM}
  │ 𝗨𝗣𝗧𝗜𝗠𝗘: ${info.uptime}
  ╰┬──────────
  ╭┴─「 𝗖𝗠𝗗𝗦 」
  🤖 botmenu
👑 ownermenu
🧑‍🤝‍🧑 groupmenu
📥 dlmenu
🎉 funmenu
💰 economymenu
🎮 gamemenu
🎨 stickermenu
🧰 toolmenu
🎩 logomenu
🌙 nsfwmenu
🙈 list
🌚 menu2
🧠 gpt
▄▖▝▝▖▄▄▄▖
    `.trim(),

    matrix: ({ user, ...info }) => `
╔═══════════════
║ █▀▀▀▀▀▀▀▀▀▀▀▀█
║      █ VORTEX-MD █
║ █▄▄▄▄▄▄▄▄▄▄▄▄█
╠═══════════════
║ ◦ User: ${user}
║ ◦ ${info.timestamp}
╠═══════════════
║ » RAM: ${info.usedRAM}/${info.totalRAM}
║ » Uptime: ${info.uptime}
║ » OS: ${info.platform}
╠═══════════════
║ COMMANDS:
🤖 botmenu
👑 ownermenu
🧑‍🤝‍🧑 groupmenu
📥 dlmenu
🎉 funmenu
💰 economymenu
🎮 gamemenu
🎨 stickermenu
🧰 toolmenu
🎩 logomenu
🌙 nsfwmenu
🙈 list
🌚 menu2
🧠 gpt
╚═══════════════
    `.trim(),

    futuristic: ({ user, ...info }) => `
┌────────────────────
│  ⚡ VORTEX XMD FUTURE EDITION ⚡
├────────────────────
│  ◦ User: ${user}
│  ◦ ${info.timestamp}
├────────────────────
│  » System Resources:
│     RAM: ${info.usedRAM}/${info.totalRAM}
│     Uptime: ${info.uptime}
│     Platform: ${info.platform}
├────────────────────
│  Available Commands:
🤖 botmenu
👑 ownermenu
🧑‍🤝‍🧑 groupmenu
📥 dlmenu
🎉 funmenu
💰 economymenu
🎮 gamemenu
🎨 stickermenu
🧰 toolmenu
🎩 logomenu
🌙 nsfwmenu
🙈 list
🌚 menu2
🧠 gpt
────────────────────
    `.trim(),

    minimal: ({ user, ...info }) => `
──────────────
 VORTEX XMD BOT
──────────────
• User: ${user}
• RAM: ${info.usedRAM}/${info.totalRAM}
• Uptime: ${info.uptime}
• Time: ${info.timestamp}
• OS: ${info.platform}
──────────────
Commands:
🤖 botmenu
👑 ownermenu
🧑‍🤝‍🧑 groupmenu
📥 dlmenu
🎉 funmenu
💰 economymenu
🎮 gamemenu
🎨 stickermenu
🧰 toolmenu
🎩 logomenu
🌙 nsfwmenu
🙈 list
🌚 menu2
🧠 gpt
──────────────
    `.trim()
  };

  // Select random theme
  const themes = Object.keys(menuTemplates);
  const selectedTheme = themes[Math.floor(Math.random() * themes.length)];

  // Generate dynamic content
  const status = menuTemplates[selectedTheme]({
    user: m.pushName || 'User',
    commands: commandList,
    ...sysInfo
  });

  // Send multimedia menu with thumbnail
  await conn.sendMessage(m.chat, { 
    image: { url: menuThumbnail },  
    caption: status,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363352087070233@newsletter',
        newsletterName: 'VORTEX XMD BOT 💖',
        serverMessageId: 143
      }
    }
  }, { quoted: m });

  // Send audio with metadata
  await conn.sendMessage(m.chat, { 
    audio: { url: audioUrl }, 
    mimetype: 'audio/mp4',
    ptt: true,
    contextInfo: {
      externalAdReply: {
        title: '✨ VORTEX XMD Experience',
        body: 'Advanced AI-Powered Bot',
        thumbnailUrl: menuThumbnail,
        mediaType: 1
      }
    }
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['core'];
handler.command = ['menu', 'help'];

export default handler;
