Page({
  onTap:function(){
    //wx.navigateTo({
    //  url: '../posts/post',//跳转到二级页面
    //});
    wx.redirectTo({
      url: '../posts/post',// 页面平级跳转,关闭当前页面，跳转到应用内的某个页面,不允许返回原来的页面
    })
  },
  // 说明 onUnload 生命周期是 页面被卸载 关闭页面时执行
  onUnload:function(){
   
  },
  // 当执行navigation 函数时，生命周期 onHide 被执行，说明 主页面切换到子页面时，执行 onHide 生命周期函数
  onHide:function(){
   
  }
})