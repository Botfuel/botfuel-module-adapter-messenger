/**
 * Copyright (c) 2017 - present, Botfuel (https://www.botfuel.io).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const rp = require('request-promise-native');
const {
  Logger,
  WebAdapter,
  PostbackMessage,
  UserImageMessage,
  UserTextMessage,
  UserFileMessage,
} = require('botfuel-dialog');

const logger = Logger('MessengerAdapter');

const FB_GRAPH_URL = 'https://graph.facebook.com/v2.6';

/**
 * Adapter for the Facebook Messenger messaging platform.
 * @extends WebAdapter
 */
class MessengerAdapter extends WebAdapter {
  /** @inheritDoc */
  createRoutes(app) {
    logger.debug('createRoutes');
    super.createRoutes(app);
    app.get('/webhook', (req, res) => this.validateWebhook(req, res));
  }

  /**
   * Webhook used by Facebook Messenger to validate the bot.
   * @private
   * @param req - the request object
   * @param res - the response object
   */
  async validateWebhook(req, res) {
    logger.debug('validateWebhook');
    if (
      req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN
    ) {
      logger.debug('validateWebhook: OK!');
      res.status(200).send(req.query['hub.challenge']);
    } else {
      logger.error('validateWebhook: KO!');
      res.sendStatus(403);
    }
  }

  /** @inheritDoc */
  async handleRequest(req, res) {
    logger.debug('handleRequest', req.body);
    try {
      const { object, entry } = req.body;
      if (object === 'page') {
        for (const entryItem of entry) {
          for (const event of entryItem.messaging) {
            await this.processEvent(event, entryItem.id); // eslint-disable-line no-await-in-loop
          }
        }
        res.sendStatus(200);
      }
    } catch (error) {
      return res.status(400).send({ message: error.message, error });
    }
  }

  /**
   * Processes a received event (message, postback, ...).
   * @param event - the messenger event
   * @param referrer - the facebook page ID
   */
  async processEvent(event, referrer) {
    logger.debug('processEvent', JSON.stringify(event));
    const { sender, message, postback } = event;
    const messageOptions = {
      origin: {
        adapter: 'messenger',
        referrer,
      },
    };
    let userMessage = null;
    if (message) {
      const { text, attachments } = message;
      // user send attachments
      if (attachments) {
        switch (attachments[0].type) {
          case 'image':
            userMessage = new UserImageMessage(attachments[0].payload.url, messageOptions);
            break;
          case 'location':
            const { lat, long } = attachments[0].payload.coordinates;
            userMessage = new UserTextMessage(`${lat}, ${long}`, messageOptions);
            break;
          case 'file':
            userMessage = new UserFileMessage(attachments[0].payload.url, messageOptions);
            break;
          default:
            // Attachment type is not handled by the bot
            userMessage = new PostbackMessage(
              {
                name: 'not-supported',
                data: {
                  messageEntities: [],
                  type: attachments[0].type,
                },
              },
              messageOptions,
            );
        }
      } else {
        userMessage = new UserTextMessage(text, messageOptions);
      }
    } else if (postback) {
      const { name, data } = JSON.parse(postback.payload);
      userMessage = new PostbackMessage({ name, data }, messageOptions);
    }

    if (userMessage) {
      await this.handleMessage(userMessage.toJson(sender.id));
    }
  }

  /** @inheritDoc */
  async addUserIfNecessary(userId) {
    await super.addUserIfNecessary(userId);
    await this.updateUserProfile(userId);
  }

  /** @inheritDoc */
  getUrl() {
    return `${FB_GRAPH_URL}/me/messages`;
  }

  /** @inheritDoc */
  getQueryParameters() {
    return {
      access_token: process.env.FB_PAGE_ACCESS_TOKEN,
    };
  }

  /** @inheritDoc */
  getBody(botMessage) {
    const message = this.adapt(botMessage);
    return {
      messaging_type: 'RESPONSE',
      recipient: {
        id: botMessage.user,
      },
      message,
    };
  }

  /**
   * @private
   * @param payload - the payload
   * @returns the text
   */
  adaptText(payload) {
    return {
      text: payload.value,
    };
  }

  /**
   * @private
   * @param payload - the payload
   * @returns the quickreplies
   */
  adaptQuickreplies(payload) {
    return {
      text: payload.options.text,
      quick_replies: payload.value.map(qr => ({
        content_type: 'text',
        title: qr,
        payload: qr,
      })),
    };
  }

  /**
   * @private
   * @param payload - the payload
   * @returns the image
   */
  adaptImage(payload) {
    return {
      attachment: {
        type: 'image',
        payload: {
          url: payload.value,
        },
      },
    };
  }

  /**
   * @private
   * @param payload - the payload
   * @returns the file
   */
  adaptFile(payload) {
    return {
      attachment: {
        type: 'file',
        payload: {
          url: payload.value,
        },
      },
    };
  }

  /**
   * @private
   * @param payload - the payload
   * @returns the actions
   */
  adaptActions(payload) {
    logger.debug('adaptActions', payload);
    return {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: payload.options.text,
          buttons: payload.value.map(MessengerAdapter.adaptAction),
        },
      },
    };
  }

  /**
   * @private
   * @param payload - the payload
   * @returns the cards
   */
  adaptCards(payload) {
    logger.debug('adaptCards', payload);
    const elements = payload.value.map((card) => {
      const buttons = card.buttons.map(MessengerAdapter.adaptAction);
      return Object.assign(card, { buttons });
    });
    return {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements,
        },
      },
    };
  }

  /**
   * Adapts payload.
   * @private
   * @param botMessage - the bot message
   * @returns the adapted message
   */
  adapt(botMessage) {
    logger.debug('adapt', botMessage);
    const { payload } = botMessage;
    switch (botMessage.type) {
      case 'text':
        return this.adaptText(payload);
      case 'quickreplies':
        return this.adaptQuickreplies(payload);
      case 'image':
        return this.adaptImage(payload);
      case 'file':
        return this.adaptFile(payload);
      case 'actions':
        return this.adaptActions(payload);
      case 'cards':
        return this.adaptCards(payload);
      default:
        return null;
    }
  }

  /**
   * @private
   * @static
   * @param action - the action object
   * @returns the adapted action or null if action type is not valid
   */
  static adaptAction(action) {
    logger.debug('adaptAction', action);
    switch (action.type) {
      case 'postback':
        return {
          type: 'postback',
          title: action.text,
          payload: JSON.stringify(action.value),
        };
      case 'link':
        return {
          type: 'web_url',
          title: action.text,
          url: action.value,
        };
      default:
        return null;
    }
  }

  /**
   * Gets user profile informations and store it into the brain.
   * @param userId - the user id
   */
  async updateUserProfile(userId) {
    logger.debug('updateUserProfile', userId);
    // check for user profile informations
    const userProfile = await this.bot.brain.userGet(userId, 'profile');
    // if not profile informations then get user profile
    if (!userProfile || !Object.keys(userProfile).length) {
      try {
        const res = await rp({
          json: true,
          uri: `${FB_GRAPH_URL}/${userId}`,
          qs: {
            fields: 'first_name,last_name,gender',
            access_token: process.env.FB_PAGE_ACCESS_TOKEN,
          },
        }).promise();
        // looking for first_name and last_name existence
        if (res.first_name && res.last_name) {
          const profile = {
            firstName: res.first_name,
            lastName: res.last_name,
            gender: res.gender || null,
          };
          await this.bot.brain.userSet(userId, 'profile', profile);
          logger.debug('updateUserProfile: user profile updated with', profile);
        } else {
          logger.debug('updateUserProfile: no user profile data available');
        }
      } catch (error) {
        logger.error('updateUserProfile: error', error.message || error.error || error);
      }
    }
  }
}

module.exports = MessengerAdapter;
