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