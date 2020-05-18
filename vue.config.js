const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
          alias: {
            '@': path.join(__dirname, 'src/client') // 1. @の参照先の変更
          }
        }
    },
    outputDir: 'dist', // 2. 出力先
    pages: {
        index: {
            entry: 'src/client/main.ts', // エントリーポイント
            template: 'src/client/public/index.html', //3. index.htmlテンプレート
            filename: 'index.html' // 省略可
        }
    }
}