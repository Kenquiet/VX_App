let app = getApp();
let util = require('../../../utils/utils.js');
Page({


  //页面的初始数据
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let movieId = options.id;
    let url = app.globaData.doubanBase + "/v2/movie/subject/" + movieId;
    util.http(url, this.processDoubanData)
  },
  // 对引进的数据进行处理
  processDoubanData: function(data) {
    if(!data){
      return ;
    }
    let director = {
      avatar: "",
      name: "",
      id: ""
    }
    //判断二级属性是否为空，如果不是空，那么取到图片，
    if (data.directors[0]!= null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    let movie = {
      movieImg: data.images ? data.images.large : "", //最大的电影海报
      country: data.countries[0],//
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count, //多少人想看
      commentCount: data.comments_count, // 多少人评论
      year: data.year,
      genres: data.genres.join("、"),// 剧情类型，将一个数组转换成一个字符串
      stars: util.converToStarsArray(data.rating.stars),// utils里面的一个处理函数
      score: data.rating.average,// 电影评分
      director: director, //上面我们处理过的变量
      casts: util.converToStarsString(data.casts),// 影人的信息
      castsInfo: util.converToCastInfos(data.casts),// 对应的影人的部分
      summary: data.summary //简介
    }
    //console.log(movie);
    this.setData({
      movie: movie
    })
  },
  // 查看图片
  viewMoviePostImg:function(e){
    let src= e.currentTarget.dataset.src;
    wx.previewImage({
      current:src, //当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})
