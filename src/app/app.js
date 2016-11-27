import program from 'commander';
import Twit from 'twit';

import pkg from '../../package.json';

const DEFAULT_CONSUMER_KEY = 'wkcWm5RTq8JsWtlY7tIXD5e83';
const DEFAULT_CONSUMER_SECRET = 'qS6YBe7AQXO0MxFyUvelqE1El6UoTPlpQ31OBU7HjDJFolvo4y';
const DEFAULT_ACCESS_TOKEN = '203465100-qsUXAoYYpVFZ6tWTr17yVHHv0VEaPR5q1vlDQXd7';
const DEFAULT_ACCESS_TOKEN_SECRET = 'G3cxHx6FqrQlqhZDIwnGmCBdWqoJIUrB3BUvldFKXJTxT';

const DEFAULT_TIMEOUT_MS = 60 * 1000;

const DEFAULT_TOPIC = '#trump';

export default class App {
  constructor() {
    this.twitter = null;
  }

  main(args = process.argv) {
    program
      .version(pkg.version)
      .option('-t, --topic <TOPIC>', 'Topic to Crawl', DEFAULT_TOPIC)
      .parse(args);

    this.twitter = new Twit({
      consumer_key: DEFAULT_CONSUMER_KEY,
      consumer_secret: DEFAULT_CONSUMER_SECRET,
      access_token: DEFAULT_ACCESS_TOKEN,
      access_token_secret: DEFAULT_ACCESS_TOKEN_SECRET,
      timeout_ms: DEFAULT_TIMEOUT_MS
    });

    // See https://github.com/ttezel/twit
    const stream = this.twitter.stream('statuses/filter', { track: program.topic });
    stream.on('tweet', (tweet) => {
      console.log(tweet.text);
    });

    stream.on('error', (tweet) => {
      console.log(tweet);
    });

    stream.on('limitation', (tweet) => {
      console.log(tweet);
    });
  }
}
