var app = getApp();
// 引用公共方法
let util = require('../../utils/utils.js');

Page({
  data:{
    // 如果对数据绑定是一个对象话，一定要给一个空值，不然数据传递到组件将无法读取
    inTheaters: {},
    comingSoon: {},
    top250: {},
  },
  onLoad: function(event) {
    //正在上映  取第0页的3条数据"?start=0&count=3"
    var inTheatersUrl = app.globaData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    //即将上映
    let comingSoonUrl = app.globaData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    //经典电影
    var top250Url = app.globaData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣top250");
  },

  //访问豆瓣 api 的一个公共方法，setterKey 就是为了知道我们处理的是哪个数据
  getMovieListData: function (url, setterKey, catetoryTitle) {
    let that = this;
    // 调用服务器数据
    wx.request({
      url,
      //url: 'https://douban.uieee.com/v2/movie/top250',
      method: "GET",
      header: {
        "content-Type": "application/xml"
      },
      success: function(res) {
        console.log(res);
        that.processDoubanData(res.data, setterKey, catetoryTitle);
      },
      fail: function(error) {
        // 断网了才会走 fail
        console.log("调用失败~");
      }
    })
  },
  // 对获取到的数据进行处理，因为我们并不需要那么多数据,而 setterKey 就是为了知道我们处理的是哪个数据
  processDoubanData: function (moviesDouban, setterKey,catetoryTitle){
    let movies = [];//用来保存我们遍历的数据
    for(let idx in moviesDouban.subjects){
      let subject = moviesDouban.subjects[idx];
      let title = subject.title;
      // 对超过6个的名字 后面用省略号处理
      if(title.length >=6){
        title = title.substring(0,6) + '...';
      };
      // 获取到 名字 评分 和 图片 和 id
      let temp = {
        // stars 自定义的方法处理评星
        stars: util.converToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl: subject.images.large,
        movieId:subject.id
      }
      //添加到数据数组中
      movies.push(temp);
    };
    // 这里使用了经典的 JavaScript 的动态绑定,然后进行传递数据
    let readyData = {};
    readyData[setterKey] = {
      movies:movies,
      catetoryTitle: catetoryTitle
      };
    this.setData(readyData);
  }
})