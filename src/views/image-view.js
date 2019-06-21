import { View, BotTextMessage } from 'botfuel-dialog';

class ImageView extends View {
  render() {
    return [new BotTextMessage('Image uploads are not supported.')];
  }
}

export default ImageView;
