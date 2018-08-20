const { View, BotTextMessage } = require('botfuel-dialog');

class FileView extends View {
  render(userMessage, {}) {
    return [new BotTextMessage('File uploads are not supported.')];
  }
}

module.exports = FileView;