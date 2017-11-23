// external
import * as webpack from 'webpack'
import * as path    from 'path'

interface Config extends webpack.Configuration {
  module: {
    rules: webpack.NewUseRule[]
  }
}

const config: Config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve( 'dist' ),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  target: "node",
  devtool: 'source-map',
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}

export default config
