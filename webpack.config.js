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
	          presets: ['es2016']
	        }
	      }
	    },
	   	{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
				]
			},
	    {
        test: /\.(mp4)$/, // Add more file-types in new rule if required.
        use: [
          {
            loader: 'file-loader',
            options: {
            	name: '[name].[ext]',
            	context: 'video/'
            }  
          }
        ]
      },
      {
        test: /\.template$/,
        use: 'raw-loader'
      }]
	},
	resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  }
}