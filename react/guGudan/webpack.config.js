const path = require('path');

module.exports = {
    mode: 'development', 
    devtool: 'eval', //개발때는 eval, production일때는 hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./client'], 
    }, //입력

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [],
            },
        }],
    },
    output: {
        path: path.join(__dirname, 'dist'), 
        filename: 'app.js'
    }, //출력
};