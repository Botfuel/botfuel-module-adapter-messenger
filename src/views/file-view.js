import { View, BotTextMessage } from 'botfuel-dialog';

class FileView extends View {
  render() {
    return [new BotTextMessage('File uploads are not supported.')];
  }
}

export default FileView;
