import os from 'os';
import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';
import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  // Load the audio file
  const audioUrl = 'https://github.com/SilvaTechB/silva-md-bot/raw/main/media/Menu.mp3';

  // Read commands from lazackcmds folder dynamically
  const lazackPath = './lazackcmds';
  const commands = fs.readdirSync(lazackPath).map(file => path.parse(file).name);
  const commandList = commands.map((cmd, idx) => `> *${idx + 1}.* ${cmd}`).join('\n');

  // System information
  const sysInfo = {
    totalRAM: (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB',
    usedRAM: ((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(2) + ' GB',
    uptime: new Date(os.uptime() * 1000).toISOString().substr(11, 8),
    currentTime: moment.tz('Africa/Nairobi').format('HH:mm:ss'),
    currentDate: moment.tz('Africa/Nairobi').format('DD/MM/YYYY'),
    currentDay: moment.tz('Africa/Nairobi').format('dddd'),
    battery: 'N/A',
    deviceState: 'N/A',
    osInfo: `${os.type()} ${os.release()}`,
    botVersion: '3.0.1',
    developer: 'SilvaTechB'
  };

  // Theme configurations
  const themes = [
    {
      name: 'Cyberpunk',
      template: (data) => `
> ───────────────
> ⚡️ *VORTEX-XMD CYBER EDITION* ⚡️
> 👤 User: ${data.userName}
> ───────────────
> 💾 RAM: ${data.usedRAM}/${data.totalRAM}
> 🕹 Uptime: ${data.uptime}
> 📟 ${data.currentTime} | ${data.currentDate}
> 🔋 Power: ${data.battery} (${data.deviceState})
> ───────────────
> 🌐 ${data.osInfo}
> 📦 Version: ${data.botVersion}
> 👨💻 Dev: ${data.developer}
> ───────────────
📁 *COMMAND LIST:*
${data.commandList}
      `.trim()
    },
    {
      name: 'Neon',
      template: (data) => `
✦♯◆♯✦♯◆♯✦♯◆♯✦
   *NEON VORTEX-XMD*
✦♯◆♯✦♯◆♯✦♯◆♯✦
➤ User: ${data.userName}
✦♯◆♯✦♯◆♯✦♯◆♯✦
➤ System Stats:
├ RAM: ${data.usedRAM}/${data.totalRAM}
├ Active: ${data.uptime}
├ Time: ${data.currentTime}
├ Date: ${data.currentDate}
└ Power: ${data.battery} (${data.deviceState})
✦♯◆♯✦♯◆♯✦♯◆♯✦
➤ Commands:
${data.commandList}
✦♯◆♯✦♯◆♯✦♯◆♯✦
      `.trim()
    },
    {
      name: 'Minimal',
      template: (data) => `
──────────────
    VORTEX-XMD BOT
──────────────
• User: ${data.userName}
• RAM: ${data.usedRAM}/${data.totalRAM}
• Uptime: ${data.uptime}
• Time: ${data.currentTime}
• OS: ${data.osInfo}
──────────────
Available Commands:
${data.commandList}
──────────────
      `.trim()
    }
  ];

  // Randomly select a theme
  const selectedTheme = themes[Math.floor(Math.random() * themes.length)];

  // Generate menu content
  const menuContent = selectedTheme.template({
    userName: m.pushName || 'User',
    commandList,
    ...sysInfo
  });

  // Send menu with theme
  const thumbnailUrl = 'https://i.imgur.com/MBGZgNz.jpeg';
  await conn.sendMessage(
    m.chat,
    {
      text: menuContent,
      contextInfo: {
        externalAdReply: {
          title: `Vortex-Xmd - ${selectedTheme.name} Theme`,
          body: 'Next-gen WhatsApp Bot Framework',
          thumbnailUrl: thumbnailUrl,
          sourceUrl: 'https://whatsapp.com/channel/0029VasiOoR3bbUw5aV4qB31',
          mediaType: 1
        }
      }
    },
    { quoted: m }
  );

  // Send audio
  await conn.sendMessage(
    m.chat,
    {
      audio: { url: audioUrl },
      mimetype: 'audio/mp4',
      ptt: true,
      contextInfo: {
        externalAdReply: {
          title: '🚀 VORTEX-XMD Menu Theme',
          body: 'Experience next-level bot interactions',
          thumbnailUrl: thumbnailUrl,
          sourceUrl: 'https://whatsapp.com/channel/0029VasiOoR3bbUw5aV4qB31',
          mediaType: 1
        }
      }
    },
    { quoted: m }
  );
};

handler.help = ['crash'];
handler.tags = ['main'];
handler.command = ['crash'];

export default handler;
