const yts = require("yt-search");
const fetch = require("node-fetch");

let handler = async (m, { conn, text, botname }) => {
  if (!text) return m.reply("⚠️ *Please provide the name of the video you want to download.*");

  let loadingMsg = await m.reply("⏳ *Searching for your video... Please wait...*");

  try {
    let search = await yts(text);
    let video = search.videos[0];

    if (!video) return m.reply("❌ *No results found for your query.*");

    let apiUrl = `https://keith-api.vercel.app/download/dlmp4?url=${video.url}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (!data.status || !data.result) return m.reply("🚫 *Failed to fetch video. Please try again later.*");

    const { title, downloadUrl, format, quality } = data.result;

    await conn.sendMessage(m.chat, { delete: loadingMsg.key });

    let caption = `🎬 *Title:* ${title}\n🎥 *Format:* ${format}\n🔹 *Quality:* ${quality}\n\n✅ *Powered by VORTEX md bot*`;

    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },
      caption: caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363352087070233@newsletter',
          newsletterName: 'VORTEX VIDEO PLAYER 💖',
          serverMessageId: 143
        }
      }
    });

    await conn.sendMessage(m.chat, {
      video: { url: downloadUrl },
      mimetype: "video/mp4",
      caption: `🎥 Here is your video: *${title}*`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363352087070233@newsletter',
          newsletterName: 'VORTEX VIDEO PLAYER 💖',
          serverMessageId: 143
        }
      }
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    m.reply("❌ *Something went wrong! Please try again later.*");
  }
};

handler.help = ["video", "mp4"];
handler.tags = ["downloader"];
handler.command = ["video", "mp4"];

export default handler;
