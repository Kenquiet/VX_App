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
// 将函数开放接口，输出
module.exports = {
  converToStarsArray
}