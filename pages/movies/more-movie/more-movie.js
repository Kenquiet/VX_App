// pages/movies/more-movie/more-movie.js
let app = getApp()
let util = require('../../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    navigateTitle: "",
    requestUrl:"",
    totalCount:0,
    isEmpty:true,//指代的是当前movies 这个数据变量里面 是不是空的
    refreshing: false,//下拉刷新，正在加载，默认是false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取 category
    let category = options.category;
    this.data.navigateTitle = category;
    // 根据不同的 category 加载不同的 url
    let dataUrl = {}
    switch (category) {
      case "正在热映":
        dataUrl = app.globaData.doubanBase + "/v2/movie/in_theaters";
      break;
      case "即将上映":
        dataUrl = app.globaData.doubanBase + "/v2/movie/coming_soon";
      break;
      case "豆瓣top250":
        dataUrl = app.globaData.doubanBase + "/v2/movie/top250";
      break;
    };
    // 将数据传输到data 让onScrollLower 进行使用
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },
  // 下拉刷新
  onScrollTop:function(evnet){
    wx.showNavigationBarLoading();
    wx.startPullDownRefresh();// 开始下拉刷新
    this.setData({
      refreshing: true,
    });
    let refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {} ;// 将状态置空，不然会出现重复不信去除试试看
    this.data.isEmpty = true;
    util.http(refreshUrl, this.processDoubanData);
  },
  // 上拉加载
  onScrollLower:function(event){
    wx.showNavigationBarLoading();
    let nextUrl = this.data.requestUrl + "?start="+this.data.totalCount+ "&count=20";
    util.http(nextUrl, this.processDoubanData);
    //让加载的时候，出现加载图标，它的位置是在标题的位置

  },

  // 处理数据函数
  processDoubanData: function (moviesDouban){
    let movies = [];//用来保存我们遍历的数据
    for (let idx in moviesDouban.subjects) {
      let subject = moviesDouban.subjects[idx];
      let title = subject.title;
      // 对超过6个的名字 后面用省略号处理
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      };
      // 获取到 名字 评分 和 图片 和 id
      let temp = {
        // stars 自定义的方法处理评星
        stars: util.converToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      //添加到数据数组中
      movies.push(temp);
    };

    let totalMovies={};
    // 如果要绑定新加载的数据，那么需要同现有的数据合并在一起
    //判断 当前是不是第一次加载
    if(!this.data.isEmpty){
      //让新加载的 和 原来的合并在一起
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({ 
      movies:totalMovies,
      refreshing: false // 将下拉刷新进行隐藏
      });
    // 在成功绑定之后 下滑加载，每一次下滑，totalCount 就会增加20
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();// 数据加载完成之后我们就将加载图标消除
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //设置动态导航栏
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})