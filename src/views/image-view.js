const { View, BotTextMessage } = require('botfuel-dialog');

class ImageView extends View {
  render() {
    return [new BotTextMessage('Image uploads are not supported.')];
  }
}

module.exports = ImageView;
