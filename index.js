const { Bot } = require('grammy');
const axios = require('axios');

const bot = new Bot('6248055605:AAGlr_Eyll1IYQMeLro0GxfYLFhOwSgIDDI');

bot.command('start', (ctx) => {
  ctx.reply('Welcome! Send me a message, and I will encode it and send a cURL request to the specified URL.');
});

bot.on('message', async (ctx) => {
  try {
    const inputText = ctx.message.text;
    const encodedText = encodeURIComponent(inputText);
    const url = 'http://162.243.187.205:3000/ask';

    // const response = await axios.get(url, `prompt=${encodedText}`, {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // });

    const response = await axios.get(url, {
    params: {
        'prompt': encodedText,
        'model': 'forefront'
        }
    });

    if (response.data.length <= 4096) {
      ctx.reply(`${response.data}`);
    } else {
      ctx.reply(`Respponse is too long: ${response.data.length}`);
    }
  } catch (error) {
    console.error(error);
    ctx.reply('An error occurred while sending the cURL request.');
  }
});

bot.start();