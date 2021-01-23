const path = require('path');
const webpack = require('webpack');
//process.env.NODE_ENV 'production'; //배포모드일때


module.exports = {
    mode: 'development', //배포할때는 production
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
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [],
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],
    output: {
        path: path.join(__dirname, 'dist'), 
        filename: 'app.js'
    }, //출력
};