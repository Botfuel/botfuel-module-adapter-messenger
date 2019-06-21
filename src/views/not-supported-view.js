import { View, BotTextMessage } from 'botfuel-dialog';

class NotSupportedView extends View {
  render(userMessage, { type }) {
    return [new BotTextMessage(`Attachments of type ${type} are not yet supported by the bot.`)];
  }
}

export default NotSupportedView;

