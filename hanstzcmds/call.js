// handler.js
import pkg from '@whiskeysockets/baileys';

const { generateWAMessageFromContent } = pkg;

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

        // Main message structure
        const message = {
            text: `『 *Vortex MD Bot* 』\n© 2025 *Vortextech Inc*\n\n⏰ *${nairobiTime}*\n📅 *${nairobiDate}*`,
            footer: "Swipe left/right for options ▼",
            title: "Vortex SUPPORT PANEL",
            buttonText: "OPEN MENU",
            sections: [
                {
                    title: "CONTACT OPTIONS",
                    rows: [
                        {
                            title: "📞 Voice Call",
                            description: "Instant voice support",
                            rowId: "#call"
                        },
                        {
                            title: "💬 Live Chat",
                            description: "Chat with an agent",
                            rowId: "#chat"
                        }
                    ]
                },
                {
                    title: "TECHNICAL SUPPORT",
                    rows: [
                        {
                            title: "🛠️ System Status",
                            description: "Check server health",
                            rowId: "#status"
                        },
                        {
                            title: "🔧 Troubleshooting",
                            description: "Common fixes guide",
                            rowId: "#help"
                        }
                    ]
                }
            ],
            buttons: [
                {
                    buttonId: '#contact',
                    buttonText: { displayText: "📲 CALL NOW" },
                    type: 1
                }
            ]
        };

        // Send as interactive list message
        await conn.sendMessage(m.chat, {
            text: message.text,
            footer: message.footer,
            buttons: message.buttons,
            sections: message.sections,
            title: message.title,
            buttonText: message.buttonText,
            mentions: [m.sender]
        });

    } catch (error) {
        console.error("Error:", error);
        await conn.sendMessage(m.chat, { 
            text: `⚠️ Failed to load menu. Direct contact:\nhttps://wa.me/255756530143\n\nCurrent Nairobi Time: ${nairobiTime}`
        });
    }
};

handler.help = ["support"];
handler.tags = ["main"];
handler.command = ["call", "support", "ss"];

export default handler;
