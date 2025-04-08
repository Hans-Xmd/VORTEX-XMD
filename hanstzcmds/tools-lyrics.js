import axios from "axios";

let handler = async (m, { conn, text }) => {
    let query = text || (m.quoted && m.quoted.text);
    if (!query) return m.reply("❌ *Oops! You forgot to provide a song name!*");

    let loadingMsg = await m.reply("🔍 *Searching for lyrics... Please wait...*");

    try {
        let { data } = await axios.get(`https://some-random-api.com/lyrics?title=${encodeURIComponent(query)}`);

        if (!data || !data.thumbnail?.genius) throw "⚠️ *Lyrics not found. Try another song!*";

        let lyricsMessage = `🎵 *VORTEX-XMD Bot - Lyrics Finder* 🎤

📌 *Title:* ${data.title}
🎙️ *Artist:* ${data.author}

📜 *Lyrics:*
${data.lyrics.slice(0, 2000)}${data.lyrics.length > 2000 ? "...\n\n⚠️ *Lyrics too long, showing only a preview!*" : ""}

🚀 *Powered by VORTEX-XMD Bot*`;

        // Delete loading message
        await conn.sendMessage(m.chat, { delete: loadingMsg.key });

        // Send lyrics with the song's image
        await conn.sendMessage(m.chat, {
            image: { url: data.thumbnail.genius },
            caption: lyricsMessage,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363352087070233@newsletter',
                    newsletterName: '🎶 VORTEX-XMD LYRICS 💖',
                    serverMessageId: 143
                }
            }
        });

        m.react("✅"); // React success

    } catch (e) {
        console.error("❌ Lyrics Error:", e.message);
        await conn.sendMessage(m.chat, { delete: loadingMsg.key }); // Delete loading message
        m.reply("⚠️ *Sorry, I couldn't find the lyrics. Try a different song or check the spelling.*");
        m.react("❌"); // React error
    }
};

handler.help = ["lyrics"];
handler.tags = ["music", "tools"];
handler.command = ["lyrics", "letra", "letras"];

export default handler;
