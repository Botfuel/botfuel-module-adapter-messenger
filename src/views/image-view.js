const { View, BotTextMessage } = require('botfuel-dialog');

class ImageView extends View {
  render(userMessage, {}) {
    const botResponses = [new BotTextMessage('File uploads are not supported.')];
    return botResponses;
  }
}

module.exports = ImageView;