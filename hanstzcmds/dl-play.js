import axios from "axios";
import ytSearch from "yt-search";

let handler = async (m, { conn, text, botname }) => {
  if (!text) return m.reply("❌ What song do you want to download?");

  await m.reply("🔄 *Vortex Xmd bot Fetching your audio... Please wait...*");

  try {
    let search = await ytSearch(text);
    let video = search.videos[0];

    if (!video) return m.reply("❌ No results found. Please refine your search.");

    let link = video.url;
    let apis = [
      `https://apis.davidcyriltech.my.id/youtube/mp3?url=${link}`,
      `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${link}`
    ];

    for (const api of apis) {
      try {
        let { data } = await axios.get(api);

        if (data.status === 200 || data.success) {
          let audioUrl = data.result?.downloadUrl || data.url;
          let songData = {
            title: data.result?.title || video.title,
            artist: data.result?.author || video.author.name,
            thumbnail: data.result?.image || video.thumbnail,
            videoUrl: link
          };

          // Send metadata & thumbnail
          await conn.sendMessage(
            m.chat,
            {
              image: { url: songData.thumbnail },
              caption: `SYLIVANUS THE Vortex Xmd BOT
═════════════════⊷
🎶 *Title:* ${songData.title}
🎤 *Artist:* ${songData.artist}
🔗 THANK YOU SORRY NO URL TO BE SHARED
═════════════════⊷
*Powered by Vortex Xmd BOT*`
            },
            { quoted: m }
          );

          await m.reply("📤 *Sending your audio...*");

          // Send as an audio file
          await conn.sendMessage(
            m.chat,
            {
              audio: { url: audioUrl },
              mimetype: "audio/mp4",
            },
            { quoted: m }
          );

          await m.reply("📤 *Sending your MP3 file...*");

          // Send as a document file
          await conn.sendMessage(
            m.chat,
            {
              document: { url: audioUrl },
              mimetype: "audio/mp3",
              fileName: `${songData.title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`,
            },
            { quoted: m }
          );

          // Send success message
          await m.reply("✅ *Vortex Xmd – World-class bot just successfully sent you what you requested! 🎶*");

          return; // Stop execution if successful
        }
      } catch (e) {
        console.error(`API Error (${api}):`, e.message);
        continue; // Try next API if one fails
      }
    }

    // If all APIs fail
    return m.reply("⚠️ An error occurred. All APIs might be down or unable to process the request.");
  } catch (error) {
    return m.reply("❌ Download failed\n" + error.message);
  }
};

handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = /^play$/i;

export default handler;
