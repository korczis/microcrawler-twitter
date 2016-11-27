'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _twit = require('twit');

var _twit2 = _interopRequireDefault(_twit);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_CONSUMER_KEY = 'wkcWm5RTq8JsWtlY7tIXD5e83';
var DEFAULT_CONSUMER_SECRET = 'qS6YBe7AQXO0MxFyUvelqE1El6UoTPlpQ31OBU7HjDJFolvo4y';
var DEFAULT_ACCESS_TOKEN = '203465100-qsUXAoYYpVFZ6tWTr17yVHHv0VEaPR5q1vlDQXd7';
var DEFAULT_ACCESS_TOKEN_SECRET = 'G3cxHx6FqrQlqhZDIwnGmCBdWqoJIUrB3BUvldFKXJTxT';

var DEFAULT_TIMEOUT_MS = 60 * 1000;

var DEFAULT_TOPIC = '#trump';

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.twitter = null;
  }

  _createClass(App, [{
    key: 'main',
    value: function main() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.argv;

      _commander2.default.version(_package2.default.version).option('-t, --topic <TOPIC>', 'Topic to Crawl', DEFAULT_TOPIC).parse(args);

      this.twitter = new _twit2.default({
        consumer_key: DEFAULT_CONSUMER_KEY,
        consumer_secret: DEFAULT_CONSUMER_SECRET,
        access_token: DEFAULT_ACCESS_TOKEN,
        access_token_secret: DEFAULT_ACCESS_TOKEN_SECRET,
        timeout_ms: DEFAULT_TIMEOUT_MS
      });

      // See https://github.com/ttezel/twit
      var stream = this.twitter.stream('statuses/filter', { track: _commander2.default.topic });
      stream.on('tweet', function (tweet) {
        console.log(tweet.text);
      });

      stream.on('error', function (tweet) {
        console.log(tweet);
      });

      stream.on('limitation', function (tweet) {
        console.log(tweet);
      });
    }
  }]);

  return App;
}();

exports.default = App;