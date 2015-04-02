/**
 * Module Dependencies
 */

var superagent = require('superagent');
var assign = require('object-assign');
var fmt = require('util').format;
var assert = require('assert');

/**
 * Module Dependencies
 */

module.exports = Readability;

/**
 * API endpoint
 */

var api = 'https://readability.com/api/content/v1/parser?url=%s&token=%s';

/**
 * Pass th
 */

function Readability(options) {
  options = options || {};
  assert(options.key, 'Readability requires an API key: https://readability.com/settings/account');

  function readability(ctx, fn) {
    var endpoint = fmt(api, ctx.url, options.key);

    // request the data
    superagent.get(endpoint, function(err, res) {
      if (err) return fn(err);
      else if (error(res.status)) return fn(new Error(res.status + ': ' + res.statusText));

      var body = JSON.parse(res.text);
      ctx.state = assign(ctx.state, body);

      fn(null, ctx);
    });
  }

  return readability;
}

/**
 * Check the error statsu
 *
 * @param {Number} status
 * @return {Boolean}
 */

function error(status) {
  var type = status / 100 | 0;
  return 4 == type || 5 == type;
}
