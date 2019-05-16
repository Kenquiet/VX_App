var postsData = require('../../data/posts-data.js'); //这里只能使用相对路径
Page({
  //页面的初始数据
  data: {
    // 小程序总是会读取data 对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在 onload 事件执行之后发生
  },
  //生命周期函数--监听页面加载/页面初始化
  onLoad: function (options) {
    this.setData({
      post_key: postsData.postList// 放置到data中就是 post_key：[里面是数据]
    });// 这个的作用就是将数据放置到data中，因为页面只能从data中读到数据
  },
  onPostTap: function(event){
    // 如何获取postId 使用currentTarget 里面有 dataset
    var postId = event.currentTarget.dataset.postid;
    //页面跳转
    // ?id + postId 是为了将ID 传输到 post-detail.js 中去
    wx.navigateTo({
      url: 'post-detail/psot-detail?id=' + postId,
    })
  },
  //轮播图页面跳转详情
  // target 和 currentTarget 区别： target指的是当前点击事件，currentTarget指的是事件捕获的组件
  // target 指的是image ，而 currentTarget指的是 swiper 组件
  onSwiperTap:function(event){
    // 如何获取postId 使用 target 里面有 dataset
    var postId = event.target.dataset.postid;
    //页面跳转
    // ?id + postId 是为了将ID 传输到 post-detail.js 中去
    wx.navigateTo({
      url: 'post-detail/psot-detail?id=' + postId,
    })
  }
})