module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'dist/bundle.js'
  },
	devServer: {
		contentBase: './dist'
	},
  module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['env']
	        }
	      }
	    }
	  ]
	}
}