Page({
  onTap:function(){
    //wx.navigateTo({
    //  url: '../posts/post',//跳转到二级页面
    //});
    wx.switchTab({
      url: '../posts/post',// 页面平级跳转,关闭当前页面，跳转到应用内的某个页面,不允许返回原来的页面
    })
  },
})