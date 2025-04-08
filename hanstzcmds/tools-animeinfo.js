import { translate } from '@vitalets/google-translate-api'
import { Anime } from '@shineiichijo/marika'

const client = new Anime()

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return m.reply(`*[❗] Please enter the name of an anime to search for.*`)
  try {
    let anime = await client.searchAnime(text)
    let result = anime.data[0]
    let resultes = await translate(`${result.background}`, { to: 'en', autoCorrect: true })
    let resultes2 = await translate(`${result.synopsis}`, { to: 'hi', autoCorrect: true })
    let AnimeInfo = ` VORTEX-XMD 𝐁𝐎𝐓
🎀 • *Title:* ${result.title}
🎋 • *Format:* ${result.type}
📈 • *Status:* ${result.status.toUpperCase().replace(/\_/g, ' ')}
🍥 • *Total Episodes:* ${result.episodes}
🎈 • *Duration: ${result.duration}*
✨ • *Based on:* ${result.source.toUpperCase()}
💫 • *Released:* ${result.aired.from}
🎗 • *Finished:* ${result.aired.to}
🎐 • *Popularity:* ${result.popularity}
🎏 • *Favorites:* ${result.favorites}
🎇 • *Rating:* ${result.rating}
🏅 • *Rank:* ${result.rank}
♦ • *Trailer:* ${result.trailer.url}
🌐 • *URL:* ${result.url}
🎆 • *Background:* ${resultes.text}
❄ • *Synopsis:* ${resultes2.text}`

    conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m)
  } catch {
    throw `*[❗] ERROR, please try again.*`
  }
}

handler.help = ['anime']
handler.tags = ['anime']
handler.command = /^(anime|animeinfo)$/i
export default handler
