const { View, BotTextMessage } = require('botfuel-dialog');

class NotSupportedView extends View {
  render(userMessage, {}) {
    return [new BotTextMessage('These types of uploads are not supported.')];
  }
}

module.exports = NotSupportedView;