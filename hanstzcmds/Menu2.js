// handler.js
import pkg from '@whiskeysockets/baileys';

const { prepareWAMessageMedia } = pkg;

let handler = async (m, { conn }) => {
    try {
        // Nairobi time formatting
        const timeOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Africa/Nairobi'
        };
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            timeZone: 'Africa/Nairobi'
        };
        
        const nairobiTime = new Date().toLocaleTimeString('en-KE', timeOptions);
        const nairobiDate = new Date().toLocaleDateString('en-KE', dateOptions);

        // Send image as a preview (non-downloadable) with caption and button
        await conn.sendMessage(m.chat, { 
            text: `『 *HansTz Tech Inc* 』\n© *Silvatech Inc Design*\n\n⏰ *${nairobiTime}*\n📅 *${nairobiDate}*\n\n🎨 *LEVEL UP YOUR CAMPAIGN WITH HansTz Tech DESIGNS!* 🗳✨\n\nRunning for *MMUSO Elections*? Let your posters do the talking! 🚀 Whether you need bold, creative, or professional designs, I’ve got you covered.\n\n✅ Custom Poster Designs\n✅ Eye-Catching Graphics\n✅ Fast Turnaround & Affordable Rates\n\nStand out from the crowd and make your campaign unforgettable! 💥\n\n📲 *Let’s Chat on WhatsApp:* 255756530143\n🌐 *Check Out My Work:* https://silvatechinc.my.id\n\n*Get noticed. Get elected.* 🎯`,
            footer: "Swipe left/right for options ▼",
            buttons: [
                {
                    buttonId: '#contact',
                    buttonText: { displayText: "📲 CALL NOW" },
                    type: 1
                }
            ],
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: "HansTz Tech Designs",
                    body: "Stand out with custom campaign designs!",
                    thumbnailUrl: 'https://i.imgur.com/MBGZgNz.jpeg',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: 'https://wa.me/255756530143'
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error("Error:", error);
        await conn.sendMessage(m.chat, { 
            text: `⚠️ Failed to load menu. Direct contact:\nhttps://wa.me/255756530143\n\nCurrent Nairobi Time: ${nairobiTime}`
        });
    }
};

handler.help = ["support"];
handler.tags = ["main"];
handler.command = ["c", "cr", "sss"];

export default handler;
