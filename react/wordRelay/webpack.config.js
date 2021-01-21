const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', //실서비스 : production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./client'], //다른파일에서 이미 불러오고 있는 파일은 적어줄 필요 없음.
    }, //입력

    module: {
        rules: [{
            test: /\.jsx?/,
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
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output: {
        path: path.join(__dirname, 'dist'), //경로를 알아서 합쳐줌
        filename: 'app.js',
        publicPath: '/dist/', //webpack-dev-server가 사용하는 결과물간의 상대 경로 
    }, //출력
    devServer: {
        publicPath: '/dist/',
        hot: true,
    },
};