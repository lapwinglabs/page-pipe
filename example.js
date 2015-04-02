/**
 * Environment variables
 */

require('localenv');

var envvar = require('envvar');
envvar.string('ALCHEMY_KEY');
envvar.string('READABILITY_PARSER_KEY');
envvar.string('TIKA_SERVER');

/**
 * Module Dependencies
 */

var Pagepipe = require('./');

/**
 * URL
 */

var url = 'http://seekingalpha.com/article/3046116-heres-why-facebooks-advertising-revenues-could-grow-to-over-40-billion-by-2021';

/**
 * Plugins
 */

var readability = require('./plugins/readability');
var alchemy = require('./plugins/alchemy');
var tika = require('./plugins/tika');

/**
 * Request
 */

pagepipe = Pagepipe()
  .use(tika({
    url: process.env.TIKA_SERVER
  }))
  .use(alchemy({
    key: process.env.ALCHEMY_KEY
  }))
  .use(readability({
    key: process.env.READABILITY_PARSER_KEY
  }))

/**
 * Make the request
 */

pagepipe(url, function(err, obj) {
  if (err) {
    console.log(err);
    // throw err;
  } else {
    console.log(JSON.stringify(obj, true, 2));
  }
})
