
# page-pipe

  pass pages through a pluggable pipeline to extract information from them.

## Current plugins

- [Alchemy](http://www.alchemyapi.com/)
- [Readability](http://readability.com/developers/api/parser)
- [Tika](https://tika.apache.org)

## Installation

```
npm install page-pipe
```

## API

```js
pagepipe = Pagepipe()
  .use(readability({ key: API_KEY }))
  .use(alchemy({ key: API_KEY }))
  .use(tika());


pagepipe('http://en.wikipedia.org/wiki/Sloth', function(err, data) {
  if (err) throw err;
  console.log(data);
})
```

## Test server-side example

[`GET http://news.lapwinglabs.com/http://en.wikipedia.org/wiki/Sloth`](http://news.lapwinglabs.com/http://news.lapwinglabs.com/http://en.wikipedia.org/wiki/Sloth)

If you abuse this endpoint, I will take it down ;-)

## License

(The MIT License)

Copyright (c) 2015 Matthew Mueller &lt;matt@lapwinglabs.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
