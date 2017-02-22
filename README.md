# elixirscript webpack loader

## Requirements

- Erlang installed

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### Recommended configuration

```js
{
  module: {
    loaders: [
      { test: /\.exjs$/, exclude: /(node_modules|bower_components)/, loader: "babel?presets[]=es2015!elixirscript" },
      { test: /\.js$/,   exclude: /(node_modules|bower_components)/, loader: "babel?presets[]=es2015" }
    ]
  }
}
```

If you use Webpack's `--watch` option or the Webpack dev server, it's also recommended to exclude `node_modules` from
the watched files. In your Webpack config:

```js
const webpack = require('webpack');

module.exports = {
  // other config...
  plugins: [
    new webpack.WatchIgnorePlugin([/node_modules|bower_components/])
  ]
};
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
