function converToStarsArray(stars){
  let num = stars.toString().substring(0,1);// 这里的意思就是 如果接受到的是30，只要3，50的话只要5
  let arrary = [];// 主要让数组形成 [1,1,1,0,0] 这个方式
  for(let i=0; i<5; i++ ){
    if(i<num){
      arrary.push(1);
    }else{
      arrary.push(0);
    }
  }
  return arrary;
}
//访问豆瓣 api 的一个公共方法，setterKey 就是为了知道我们处理的是哪个数据
function http(url,callBack) {
  wx.request({
    url,
    //url: 'https://douban.uieee.com/v2/movie/top250',
    method: "GET",
    header: {
      "content-Type": "application/xml"
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (error) {
      // 断网了才会走 fail
      console.log("调用失败~");
    }
  })
}
// 将函数开放接口，输出
module.exports = {
  converToStarsArray,
  http
}