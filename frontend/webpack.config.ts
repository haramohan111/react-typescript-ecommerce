module.exports = {
    entry: './src/index.tsx', // Adjust the entry point as needed
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          use: [
            '@svgr/webpack', // Converts SVGs into React components
            'url-loader',    // Loads SVGs as URLs
          ],
        },       
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist', // Adjust the output path as needed
    },
  };
  