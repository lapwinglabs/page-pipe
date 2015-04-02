/**
 * Module Dependencies
 */

var debug = require('debug')('page-pipe:alchemy');
var superagent = require('superagent');
var assign = require('object-assign');
var fmt = require('util').format;
var assert = require('assert');

/**
 * Export `Alchemy`
 */

module.exports = Alchemy;

/**
 * API endpoint
 */

var api = 'http://access.alchemyapi.com/calls/url/URLGetRankedNamedEntities?apikey=%s&outputMode=json&sentiment=1&quotations=1&url=%s';

/**
 * Attach `alchemy` information
 *
 * @param {Object} options
 * @return {Function}
 */

function Alchemy(options) {
  options = options || {};
  assert(options.key, 'Alchemy requires an API key: http://www.alchemyapi.com/api/register.html')

  function alchemy(ctx, fn) {
    var endpoint = fmt(api, options.key, ctx.url);

    // request the data
    superagent.get(endpoint, function(err, res) {
      if (err) return fn(err);
      else if (error(res.status)) return fn(new Error(res.status + ': ' + res.statusText));

      var body = res.body;

      ctx.state = assign(ctx.state, {
        entities: body.entities,
        language: body.language
      });

      fn(null, ctx);
    });

  }

  return alchemy;
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
