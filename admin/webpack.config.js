// webpack.config.js
export const module = {
    rules: [
        // other rules...
        {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        },
    ],
};
  