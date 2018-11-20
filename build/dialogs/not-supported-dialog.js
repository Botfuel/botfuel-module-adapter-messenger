'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('botfuel-dialog'),
    BaseDialog = _require.BaseDialog;

var NotSupportedDialog = function (_BaseDialog) {
  _inherits(NotSupportedDialog, _BaseDialog);

  function NotSupportedDialog() {
    _classCallCheck(this, NotSupportedDialog);

    return _possibleConstructorReturn(this, (NotSupportedDialog.__proto__ || Object.getPrototypeOf(NotSupportedDialog)).apply(this, arguments));
  }

  return NotSupportedDialog;
}(BaseDialog);

module.exports = NotSupportedDialog;