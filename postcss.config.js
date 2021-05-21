/**
 * 配置文件,运行在nodejs中
 */
module.exports = {
    plugins: {
        // 自动添加浏览器厂商声明前缀，用来兼容不同浏览器
    //   autoprefixer: {
    //     browsers: ['Android >= 4.0', 'iOS >= 8'],
    //   },
        //   px转为rem
      'postcss-pxtorem': {
        rootValue: 37.5,
        
        propList: ['*'],
      },
    },
};

// Vant 建议设置为 37.5  因为 Vant 是基于逻辑像素 375 写的，所以如果你设置为 75 的话，Vant 的样式就小了一半。
// module.exports = {
//   plugins: {
//     'postcss-pxtorem': {
//       rootValue ({ file }) {
//         // 如果是 Vant 的样式就按照 37.5 处理转换
//         // 如果是我们自己的样式就按照 75 处理转换
//         return file.indexOf('vant') !== -1 ? 37.5 : 75
//       },
//       propList: ['*']
//     }
//   }
// }