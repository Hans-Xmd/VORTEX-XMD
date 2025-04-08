
import fetch from 'node-fetch'

let handler = m => m
handler.all = async function (m) {
	
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
	let pp = await this.profilePictureUrl(who, 'image').catch(_ => 'https://i.imgur.com/MBGZgNz.jpeg')
	
	//reply link wa
   global.rpgc = { contextInfo: { externalAdReply: { mediaUrl: 'https://i.imgur.com/MBGZgNz.jpeg', mediaType: 'VIDEO', description: 'support group', title: 'JOIN GROUP', body: 'support group', thumbnailUrl: 'https://i.imgur.com/MBGZgNz.jpeg', sourceUrl: 'https://silvatech.vercel.app' }}} 
	
	//reply link Github 
    global.rpig = { contextInfo: { externalAdReply: { mediaUrl: 'https://i.imgur.com/MBGZgNz.jpeg', mediaType: 'VIDEO', description: 'FOLLOW DEVELOPER', title: 'GITHUB', body: 'Keep bot alive', thumbnailUrl: 'https://i.imgur.com/RCMg1aL.jpg', sourceUrl: 'https://github.com/Mrhanstz' }}}
	
	//reply link yt
    global.rpyt = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://i.imgur.com/MBGZgNz.jpeg', mediaType: 'VIDEO', description: 'SUBSCRIBE : silva edits YT', title: 'YouTube', body: 'learn to create your own bots', thumbnailUrl: 'https://i.imgur.com/MBGZgNz.jpeg', sourceUrl: 'https://youtube.com/@HANSTZTECH' }}}

//reply link WhatsApp Channel
    global.rpwp = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://i.imgur.com/MBGZgNz.jpeg', mediaType: 'VIDEO', description: 'Follow Channel', title: 'SILVA-BOT CHANNEL', body: 'To Get Updates About OREO-BOT', thumbnailUrl: 'https://i.imgur.com/MBGZgNz.jpeg', sourceUrl: 'https://whatsapp.com/channel/0029VaAkETLLY6d8qhLmZt2v' }}}
    
} 
export default handler
