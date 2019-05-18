var postsData = require('../../../data/posts-data.js'); //这里只能使用相对路径
let app = getApp(); // 拿到全局的 app里面的 变量
Page({
  data: {
    detailObj: {},
    index: null,
    // 是否收藏
    isCollected: false
  },
  // 页面初始化
  onLoad: function (options) {
    // 从post.js 传过来的id 进行接收。
    var postId = options.id;
    // 将这个id 传送到data 里面 ，外面的函数需要这个id
    this.data.index = postId;
    //拿到postData 数据
    var postData = postsData.postList[postId];
    //console.log(postData);
    this.setData({
      postData:postData
    });

    // 获取本地缓存数据
    let storageObj = wx.getStorageSync("isCollected");
    //判断本地缓存中有没有这个数据,如果没有，那么我们添加并赋值一个空的对象
    if (!storageObj) {
      storageObj = {};
      wx.setStorage({
        key: 'isCollected',
        data: storageObj,
      });
    } else {
      //如果有这个数据，那么我们就根据当前页面是否收藏图标自动生成 isCollected
      let isCollected = storageObj[options.id] ? true : false;
      // 更新 isCollected 的值
      this.setData({ isCollected });
    };

    //如果全局变量为真，说明音乐正在播放，那么我们就要改变本地做数据绑定的状态值
    if (app.globaData.g_isMusicPlay && app.g_currentMusicPostId === postId){
      this.setData({
        isMusicPlay : true
      })
    }
    // 调用自定义函数方法
    this.setMusicMonitor();
  },

  // 这里的函数是从 onload 里面提取出来的
  setMusicMonitor:function(){
    // 对音乐状态和图标状态进行统一，音乐暂停图标也跟着变化
    let that = this
    wx.onBackgroundAudioPlay(() => {
      that.setData({
        isMusicPlay: true
      });
      app.globaData.g_isMusicPlay = true;
      app.g_currentMusicPostId = that.data.index;
    });
    // 监听音乐暂停事件
    wx.onBackgroundAudioPause(() => {
      that.setData({
        isMusicPlay: false
      });
      app.globaData.g_isMusicPlay = false;
      app.g_currentMusicPostId = null;
    });
    //音乐播放完成时间
    wx.onBackgroundAudioStop(() => {
      that.setData({
        isMusicPlay: false
      });
      app.globaData.g_isMusicPlay = false;
      app.g_currentMusicPostId = null;
    })
  },
  onCollectionTap(event){
    let isCollected = !this.data.isCollected;
    // 缓存之前首先获取之前的数据
    let obj = wx.getStorageSync('isCollected');
    // 将现在的正在点击的下标添加到 对象里面去
    obj[this.data.index] = isCollected;
    // 提示用户收藏状态
    let title = isCollected?"收藏成功":"取消收藏";
    wx.showToast({
      title,
      duration:1000,
      icon:'success'
    });
    //将数据设置到缓存中去
    wx.setStorageSync('isCollected', obj);
    // 更新状态
    this.setData({
      isCollected
    });
  },
  onShareTap:function(event){
    wx.showActionSheet({
      itemList: [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ],
      itemColor:"#405f8f",
      success:function(res){
        // res.cancel: 用户是不是点击了取消按钮
        // res.tapIndex: 数组元素的序号，从0开始
      }
    })
  },

  onMusictap:function(event){
    // 拿到数据id
    let id = this.data.index;
    let music = postsData.postList[id].music
    // 从data中拿到当前的状态
    let isMusicPlay = !this.data.isMusicPlay;
    // 状态更新
    this.setData({
      isMusicPlay
    });
    //判断音乐的状态，
    if(isMusicPlay){
      // 播放音乐
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImgUrl
      })
    }else{
      //暂停音乐
      wx.pauseBackgroundAudio()
    }
    
  }

})