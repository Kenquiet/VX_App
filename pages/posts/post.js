var postsData = require('../../data/posts-data.js'); //这里只能使用相对路径
Page({
  //页面的初始数据
  data: {
    // 小程序总是会读取data 对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在 onload 事件执行之后发生
  },
  //生命周期函数--监听页面加载/页面初始化
  onLoad: function (options) {
    //this.data.postList = postsData.postList
    // 绝大多数下，我们直接给 data 这个 对象进行赋值就行，而不需要使用 setData 进行实时更新
    // 什么情况下使用setData 呢？如果你在 onload 函数下执行的是异步操作而且，这个异步操作里面我们对数据进行操作就必须在setData里面，进行数据绑定
    // 但是 凡是使用setData 进行数据绑定总是没错的
    this.setData({
      post_key: postsData.postList// 放置到data中就是 post_key：[里面是数据]
    });// 这个的作用就是将数据放置到data中，因为页面只能从data中读到数据
  },
})