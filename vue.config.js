module.exports = {
    lintOnSave: false,
    devServer: {
        // open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false, 
        proxy: {
            "/query": {
                target: "http://106.54.102.12:8080/query", // 跨域访问
                changOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/query': '',
                }
            }
        }
    },
}
// const path = require('path')
// module.exports = {
//     devServer: {
//         assetsSubDirectory: 'static',
//         assetsPublicPath: '/',
//         proxyTable: {
//             '/query': {
//                 target: 'http://106.54.102.12:8080/query',
//                 changeOrigin: true,
//                 pathRewrite: { 
//                     '^/query': '/query'
//                 }
//             }
//         },
//     }
// }