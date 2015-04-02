/**
 * Module Dependencies
 */

var superagent = require('superagent');

/**
 * Export `Request`
 */

module.exports = Request;

/**
 * Create the request
 */

function Request() {

  function request(ctx, fn) {
    if (ctx.body) return fn(null, ctx);

    superagent[ctx.method](ctx.url, function (err, res, body) {
      if (err) return fn(err);
      ctx.status = res.statusCode;
      ctx.body = res.body;
      fn(null, ctx);
    });
  }

  return request;
}
