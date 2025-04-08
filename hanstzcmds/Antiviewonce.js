// silva
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

// Helper function to convert stream to Buffer
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

/**
 * Handles ViewOnce media messages and forwards the content to the bot owner.
 * @param {Object} m - The incoming message object from Baileys.
 * @param {Object} conn - The WhatsApp connection instance.
 */
const handler = async (m, { conn }) => {
  try {
    // Validate ViewOnce message structure
    if (!m.message?.viewOnceMessage) return;

    // Extract nested ViewOnce content
    const viewOnceContent = m.message.viewOnceMessage;
    const messageType = Object.keys(viewOnceContent)[0];
    const mediaContent = viewOnceContent[messageType];
    const caption = mediaContent?.caption || '';
    const sender = m.sender;

    // Validate media type before processing
    const supportedMedia = ['imageMessage', 'videoMessage', 'audioMessage'];
    if (!supportedMedia.includes(messageType)) {
      return conn.sendMessage(
        m.chat, 
        { text: '❌ Unsupported media type' },
        { quoted: m }
      );
    }

    // Download and convert media
    const mediaStream = await downloadContentFromMessage(
      mediaContent,
      messageType.replace('Message', '').toLowerCase()
    );
    const buffer = await streamToBuffer(mediaStream);

    // Send processing notification
    await conn.sendMessage(
      m.chat,
      {
        text: '🔄 Processing your ViewOnce media...',
        contextInfo: { mentionedJid: [sender] }
      },
      { quoted: m }
    );

    // Configuration (Update with your owner JID)
    const ownerJid = '255756530143@s.whatsapp.net';
    
    // Media type mapping
    const mediaTypeMap = {
      imageMessage: { type: 'Image 📸', extension: '.jpg' },
      videoMessage: { type: 'Video 📹', extension: '.mp4' },
      audioMessage: { type: 'Audio 🎵', extension: '.mp3' }
    };

    const { type: mediaType, extension } = mediaTypeMap[messageType];
    const cleanCaption = caption.replace(/[\r\n]+/g, ' ').trim();

    // Forward to owner with metadata
    await conn.sendMessage(
      ownerJid,
      {
        [messageType.replace('Message', '')]: buffer,
        fileName: `view_once_${Date.now()}${extension}`,
        caption: `*💀 Vortex-xmd Anti ViewOnce 💀*\n\n` +
          `• Type: ${mediaType}\n` +
          `• Sender: @${sender.split('@')[0]}\n` +
          (cleanCaption ? `• Caption: ${cleanCaption}` : ''),
        contextInfo: { mentionedJid: [sender] }
      }
    );

  } catch (error) {
    console.error('ViewOnce Handler Error:', error);
    await conn.sendMessage(
      m.chat,
      { text: '❌ Failed to process ViewOnce media' },
      { quoted: m }
    );
  }
};

export default handler;
