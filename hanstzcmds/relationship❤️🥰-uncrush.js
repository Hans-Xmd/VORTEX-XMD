let handler = async (message, { conn, text }) => {
  // Developer credits and support information
  const credits = "Developed by vortex The Techie (vortex Devs) 🌟";
  const supportLink = "Support: https://www.google.com/search?q=vortexTechB";
  const footer = `${credits}\n${supportLink}`;

  // Get sender's ID
  let senderId = message.sender;

  // Check if the sender has a crush
  if (!global.db.data.users[senderId].lover) {
    return conn.reply(
      message.chat,
      `You do not have a crush on anyone 😀🔥\n\n${footer}`,
      message
    );
  }

  // Check if the crush is mutual
  if (global.db.data.users[global.db.data.users[senderId].lover]?.lover === senderId) {
    let crushId = global.db.data.users[senderId].lover;
    let crushName = global.db.data.users[crushId]?.name || "unknown person";
    return conn.reply(
      message.chat,
      `You are in love with ${crushName} 💖🥰\n\n${footer}`,
      message,
      { mentions: [crushId] }
    );
  } else {
    // Handle unrequited crush and remove it
    let crushId = global.db.data.users[senderId].lover;
    let crushName = global.db.data.users[crushId]?.name || "unknown person";
    conn.reply(
      message.chat,
      `You have removed your crush, ${crushName}, from your heart 💯😳💔\n\n${footer}`,
      message,
      { mentions: [crushId] }
    );
    global.db.data.users[senderId].lover = '';
  }
};

// Command details
handler.help = ["uncrush @tag"];
handler.tags = ["relation"];
handler.command = /^(uncrush)$/i;
handler.group = true;
handler.register = true;

export default handler;
