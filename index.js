/**
 * Module Dependencies
 */

var context = require('http-context');
var assign = require('object-assign');
var Ware = require('ware');
var noop = function(){};

/**
 * Export `Pagepipe`
 */

module.exports = Pagepipe;

/**
 * Default plugins
 */

var request = require('./plugins/request');

/**
 * Initialize the Page Pipe
 * with a `url`.
 *
 * @param {Object} defaults
 * @return {Function}
 */

function Pagepipe(defaults) {
  var ware = Ware();
  var plugins = [];
  var req = noop;

  // add in the defaults
  plugins.push(request());

  function pagepipe(url, fn) {
    var ctx = context();

    ctx = assign(ctx, defaults);
    ctx.method = 'get';
    ctx.state = {};
    ctx.url = url;

    // provide a request hook
    req(ctx);

    // run the plugins
    ware
      .use(plugins)
      .run(ctx, done);

    function done(err, ctx) {
      if (err) return fn(err);
      ctx.state.url = ctx.url;
      fn(null, ctx.state);
    }

    return pagepipe;
  }

  pagepipe.use = function(fn) {
    if (!arguments.length) return plugins;
    plugins.push(fn);
    return pagepipe;
  }

  pagepipe.request = function(fn) {
    if (!arguments.length) return req;
    req = fn;
    return pagepipe;
  }

  return pagepipe;
}
