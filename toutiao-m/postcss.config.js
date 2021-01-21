// postcss 支持200多种插件，比如说postcss preset env 让你使用新的css语法
module.exports = {
  plugins: {
    // 能够帮你自动的添加css声明前缀,vue内部已经配置了
    // autoprefixer: {
    //   browsers: ["Android >= 4.0", "iOS >= 8"]
    // },
    // 将px单位转化为rem
    "postcss-pxtorem": {
      // 根元素基准值 按照设计稿来 如果是 750宽 的设计稿 就写 750/10
      // 但是实际上vant是基于375像素的，所以如果改成750，虽然可以根据UI稿直接拿长宽，但是实际显示会很小
      // 所以在开发时，这个37.5不动，UI图宽如果是750， 就人工/2 ；如果是375 那拿来就可以用
      rootValue: 37.5,
      // 需要转化的css属性 font-size
      propList: ["*"]
    }
  }
};
