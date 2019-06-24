const { View, BotTextMessage } = require('botfuel-dialog');

class NotSupportedView extends View {
  render(userMessage, { type }) {
    return [new BotTextMessage(`Attachments of type ${type} are not yet supported by the bot.`)];
  }
}

module.exports = NotSupportedView;
