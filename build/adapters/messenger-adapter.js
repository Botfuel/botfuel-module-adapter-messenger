'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rp = require('request-promise-native'); /**
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

var _require = require('botfuel-dialog'),
    Logger = _require.Logger,
    WebAdapter = _require.WebAdapter,
    PostbackMessage = _require.PostbackMessage,
    UserImageMessage = _require.UserImageMessage,
    UserTextMessage = _require.UserTextMessage;

var logger = Logger('MessengerAdapter');

var FB_GRAPH_URL = 'https://graph.facebook.com/v2.6';

/**
 * Adapter for the Facebook Messenger messaging platform.
 * @extends WebAdapter
 */
var MessengerAdapter = function (_WebAdapter) {
  _inherits(MessengerAdapter, _WebAdapter);

  function MessengerAdapter() {
    _classCallCheck(this, MessengerAdapter);

    return _possibleConstructorReturn(this, (MessengerAdapter.__proto__ || Object.getPrototypeOf(MessengerAdapter)).apply(this, arguments));
  }

  _createClass(MessengerAdapter, [{
    key: 'createRoutes',

    /** @inheritDoc */
    value: function createRoutes(app) {
      var _this2 = this;

      logger.debug('createRoutes');
      _get(MessengerAdapter.prototype.__proto__ || Object.getPrototypeOf(MessengerAdapter.prototype), 'createRoutes', this).call(this, app);
      app.get('/webhook', function (req, res) {
        return _this2.validateWebhook(req, res);
      });
    }

    /**
     * Webhook used by Facebook Messenger to validate the bot.
     * @private
     * @param req - the request object
     * @param res - the response object
     */

  }, {
    key: 'validateWebhook',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                logger.debug('validateWebhook');
                if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
                  logger.debug('validateWebhook: OK!');
                  res.status(200).send(req.query['hub.challenge']);
                } else {
                  logger.error('validateWebhook: KO!');
                  res.sendStatus(403);
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validateWebhook(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return validateWebhook;
    }()

    /** @inheritDoc */

  }, {
    key: 'handleRequest',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var messengerBody, object, entry, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entryItem, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, event;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                logger.debug('handleRequest', req.body);
                messengerBody = req.body;
                object = messengerBody.object, entry = messengerBody.entry;

                if (!(object === 'page')) {
                  _context2.next = 55;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 7;
                _iterator = entry[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 40;
                  break;
                }

                entryItem = _step.value;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 14;
                _iterator2 = entryItem.messaging[Symbol.iterator]();

              case 16:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 23;
                  break;
                }

                event = _step2.value;
                _context2.next = 20;
                return this.processEvent(event);

              case 20:
                _iteratorNormalCompletion2 = true;
                _context2.next = 16;
                break;

              case 23:
                _context2.next = 29;
                break;

              case 25:
                _context2.prev = 25;
                _context2.t0 = _context2['catch'](14);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 29:
                _context2.prev = 29;
                _context2.prev = 30;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 32:
                _context2.prev = 32;

                if (!_didIteratorError2) {
                  _context2.next = 35;
                  break;
                }

                throw _iteratorError2;

              case 35:
                return _context2.finish(32);

              case 36:
                return _context2.finish(29);

              case 37:
                _iteratorNormalCompletion = true;
                _context2.next = 9;
                break;

              case 40:
                _context2.next = 46;
                break;

              case 42:
                _context2.prev = 42;
                _context2.t1 = _context2['catch'](7);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 46:
                _context2.prev = 46;
                _context2.prev = 47;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 49:
                _context2.prev = 49;

                if (!_didIteratorError) {
                  _context2.next = 52;
                  break;
                }

                throw _iteratorError;

              case 52:
                return _context2.finish(49);

              case 53:
                return _context2.finish(46);

              case 54:
                res.sendStatus(200);

              case 55:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 42, 46, 54], [14, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
      }));

      function handleRequest(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return handleRequest;
    }()

    /**
     * Processes a received event (message, postback, ...).
     * @param event - the messenger event
     */

  }, {
    key: 'processEvent',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event) {
        var sender, message, postback, userMessage, _text, _attachments, _attachments$0$payloa, _lat, _long, _JSON$parse, dialog, entities;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                logger.debug('processEvent', JSON.stringify(event));
                sender = event.sender, message = event.message, postback = event.postback;
                userMessage = null;

                if (message) {
                  _text = message.text, _attachments = message.attachments;
                  // user send attachments

                  if (_attachments && _attachments[0].type === 'image') {
                    userMessage = new UserImageMessage(_attachments[0].payload.url);
                  } else if (_attachments && _attachments[0].type === 'location') {
                    _attachments$0$payloa = _attachments[0].payload.coordinates, _lat = _attachments$0$payloa.lat, _long = _attachments$0$payloa.long;

                    userMessage = new UserTextMessage(_lat + ', ' + _long);
                  } else {
                    userMessage = new UserTextMessage(_text);
                  }
                } else if (postback) {
                  _JSON$parse = JSON.parse(postback.payload), dialog = _JSON$parse.dialog, entities = _JSON$parse.entities;

                  userMessage = new PostbackMessage(dialog, entities);
                }

                if (!userMessage) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 7;
                return this.handleMessage(userMessage.toJson(sender.id));

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function processEvent(_x5) {
        return _ref3.apply(this, arguments);
      }

      return processEvent;
    }()

    /** @inheritDoc */

  }, {
    key: 'addUserIfNecessary',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _get(MessengerAdapter.prototype.__proto__ || Object.getPrototypeOf(MessengerAdapter.prototype), 'addUserIfNecessary', this).call(this, userId);

              case 2:
                _context4.next = 4;
                return this.updateUserProfile(userId);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addUserIfNecessary(_x6) {
        return _ref4.apply(this, arguments);
      }

      return addUserIfNecessary;
    }()

    /** @inheritDoc */

  }, {
    key: 'getUrl',
    value: function getUrl() {
      return FB_GRAPH_URL + '/me/messages';
    }

    /** @inheritDoc */

  }, {
    key: 'getQueryParameters',
    value: function getQueryParameters() {
      return {
        access_token: process.env.FB_PAGE_ACCESS_TOKEN
      };
    }

    /** @inheritDoc */

  }, {
    key: 'getBody',
    value: function getBody(botMessage) {
      var message = this.adapt(botMessage);
      return {
        messaging_type: 'RESPONSE',
        recipient: {
          id: botMessage.user
        },
        message: message
      };
    }

    /**
     * @private
     * @param payload - the payload
     * @returns the text
     */

  }, {
    key: 'adaptText',
    value: function adaptText(payload) {
      return {
        text: payload.value
      };
    }

    /**
     * @private
     * @param payload - the payload
     * @returns the quickreplies
     */

  }, {
    key: 'adaptQuickreplies',
    value: function adaptQuickreplies(payload) {
      return {
        text: payload.options.text,
        quick_replies: payload.value.map(function (qr) {
          return {
            content_type: 'text',
            title: qr,
            payload: qr
          };
        })
      };
    }

    /**
     * @private
     * @param payload - the payload
     * @returns the image
     */

  }, {
    key: 'adaptImage',
    value: function adaptImage(payload) {
      return {
        attachment: {
          type: 'image',
          payload: {
            url: payload.value
          }
        }
      };
    }

    /**
     * @private
     * @param payload - the payload
     * @returns the actions
     */

  }, {
    key: 'adaptActions',
    value: function adaptActions(payload) {
      logger.debug('adaptActions', payload);
      return {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: payload.options.text,
            buttons: payload.value.map(MessengerAdapter.adaptAction)
          }
        }
      };
    }

    /**
     * @private
     * @param payload - the payload
     * @returns the cards
     */

  }, {
    key: 'adaptCards',
    value: function adaptCards(payload) {
      logger.debug('adaptCards', payload);
      var elements = payload.value.map(function (card) {
        var buttons = card.buttons.map(MessengerAdapter.adaptAction);
        return Object.assign(card, { buttons: buttons });
      });
      return {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: elements
          }
        }
      };
    }

    /**
     * Adapts payload.
     * @private
     * @param botMessage - the bot message
     * @returns the adapted message
     */

  }, {
    key: 'adapt',
    value: function adapt(botMessage) {
      logger.debug('adapt', botMessage);
      var payload = botMessage.payload;

      switch (botMessage.type) {
        case 'text':
          return this.adaptText(payload);
        case 'quickreplies':
          return this.adaptQuickreplies(payload);
        case 'image':
          return this.adaptImage(payload);
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

  }, {
    key: 'updateUserProfile',


    /**
     * Gets user profile informations and store it into the brain.
     * @param userId - the user id
     */
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userId) {
        var userProfile, res, profile;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                logger.debug('updateUserProfile', userId);
                // check for user profile informations
                _context5.next = 3;
                return this.bot.brain.userGet(userId, 'profile');

              case 3:
                userProfile = _context5.sent;

                if (!(!userProfile || !Object.keys(userProfile).length)) {
                  _context5.next = 22;
                  break;
                }

                _context5.prev = 5;
                _context5.next = 8;
                return rp({
                  json: true,
                  uri: FB_GRAPH_URL + '/' + userId,
                  qs: {
                    fields: 'first_name,last_name,gender',
                    access_token: process.env.FB_PAGE_ACCESS_TOKEN
                  }
                }).promise();

              case 8:
                res = _context5.sent;

                if (!(res.first_name && res.last_name)) {
                  _context5.next = 16;
                  break;
                }

                profile = {
                  firstName: res.first_name,
                  lastName: res.last_name,
                  gender: res.gender || null
                };
                _context5.next = 13;
                return this.bot.brain.userSet(userId, 'profile', profile);

              case 13:
                logger.debug('updateUserProfile: user profile updated with', profile);
                _context5.next = 17;
                break;

              case 16:
                logger.debug('updateUserProfile: no user profile data available');

              case 17:
                _context5.next = 22;
                break;

              case 19:
                _context5.prev = 19;
                _context5.t0 = _context5['catch'](5);

                logger.error('updateUserProfile: error', _context5.t0.message || _context5.t0.error || _context5.t0);

              case 22:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[5, 19]]);
      }));

      function updateUserProfile(_x7) {
        return _ref5.apply(this, arguments);
      }

      return updateUserProfile;
    }()
  }], [{
    key: 'adaptAction',
    value: function adaptAction(action) {
      logger.debug('adaptAction', action);
      switch (action.type) {
        case 'postback':
          return {
            type: 'postback',
            title: action.text,
            payload: JSON.stringify(action.value)
          };
        case 'link':
          return {
            type: 'web_url',
            title: action.text,
            url: action.value
          };
        default:
          return null;
      }
    }
  }]);

  return MessengerAdapter;
}(WebAdapter);

module.exports = MessengerAdapter;