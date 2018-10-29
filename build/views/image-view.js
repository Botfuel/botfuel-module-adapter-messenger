'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('botfuel-dialog'),
    View = _require.View,
    BotTextMessage = _require.BotTextMessage;

var ImageView = function (_View) {
  _inherits(ImageView, _View);

  function ImageView() {
    _classCallCheck(this, ImageView);

    return _possibleConstructorReturn(this, (ImageView.__proto__ || Object.getPrototypeOf(ImageView)).apply(this, arguments));
  }

  _createClass(ImageView, [{
    key: 'render',
    value: function render(userMessage, _ref) {
      _objectDestructuringEmpty(_ref);

      return [new BotTextMessage('Image uploads are not supported.')];
    }
  }]);

  return ImageView;
}(View);

module.exports = ImageView;