let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

 // Usa /tourl sobre una imagen para hacerla url y ponerla aquí si deseas cambiar dichas imágenes.

  let imgWelcome = 'https://files.catbox.moe/vnw5j7.jpg';
  let imgBye = 'https://files.catbox.moe/9bcdi3.jpg';

  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];
  let userName;
const nameFromDB = user && user.name;
const isValidName = typeof nameFromDB === 'string'
  && nameFromDB.trim()
  && !(/undef|undefined|null|nan/i.test(nameFromDB));

if (isValidName) {
  userName = nameFromDB.trim();
} else {
  try {
    userName = (await conn.getName(who)) || who.split('@')[0];
  } catch (err) {
    userName = who.split('@')[0];
  }
}

  let total = groupMetadata.participants.length;

  if (chat.welcome && m.messageStubType === 27) {
    await conn.sendMessage(m.chat, {
      image: { url: imgWelcome },
      caption: `
╭────┈┈────╮
│ ✨ *ＢＩＥＮＶＥＮＩＤＯ* ✨
╰──┈┈──╯

🎉 Nombre: *${userName}*  
👥 Ahora somos: *${total}* participantes  

Disfruta tu estancia 🚀
      `.trim(),
      mentions: getMentionedJid()
    }, { quoted: fkontak });
  }

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    await conn.sendMessage(m.chat, {
      image: { url: imgBye },
      caption: `
╭────┈┈────╮
│ 💔 *ＤＥＳＰＥＤＩＤＡ* 💔
╰───┈┈───╯

😢 Nombre: *${userName}*  
👥 Ahora somos: *${total}* participantes  

¡Esperamos verte pronto! 🌹
      `.trim(),
      mentions: getMentionedJid()
    }, { quoted: fkontak });
  }
}