const path = require('path');

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
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    output: {
        path: path.join(__dirname, 'dist'), //경로를 알아서 합쳐줌
        filename: 'app.js'
    }, //출력
};