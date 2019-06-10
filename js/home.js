console.log('home.js')


var cart = document.getElementById('carBtn'),
  swiper = document.getElementById('swiper'),
  swiperBox = swiper.getElementsByClassName('swiper-box')[0],
  dots = swiper.getElementsByClassName('dots')[0].getElementsByTagName('span'),
  box = document.getElementsByClassName('list')[0].getElementsByTagName('ul')[0],
  carData = '',
  shopNum = sessionStorage.getItem('shopNum');


// 轮播图切换
function turnPage(num){
  var now = Math.round(swiperBox.offsetLeft/swiper.offsetWidth)
  var next = now + num
  if(next < -4){
    next = 0
  }else if(next > 0){
    next = -4
  }
  swiperBox.style.left = next*100+'%'
  dotsLight(next)
}


// 小圆点高亮
function dotsLight(now){
  var length = Math.round(swiperBox.offsetWidth/swiper.offsetWidth)
  for(let i=0;i < length;i ++){
    dots[i].className = ''  
  }
  dots[now*-1].className = 'light'
}


// 小圆点点击
function dotsTap(){    
  for(let i=0;i<dots.length;i++){
    dots[i].addEventListener('click',()=>{  
      var now = Math.round(swiperBox.offsetLeft/swiper.offsetWidth)
      var index = now + i
      turnPage(-1*index)
    },false)
  }
}


// 自动播放
function autoPlay(btn){
  if(btn){
    timer = setInterval(()=>{turnPage(-1)},5000)
    // console.log(1)
  }else{
    clearInterval(timer)
  }
}


// 鼠标移入移出效果
swiper.addEventListener('mouseover',()=>{
  autoPlay(0)
})

swiper.addEventListener('mouseout',()=>{
  autoPlay(1)
})


// 明星产品翻页交互
function turn(w){
  if(w)box.style.left = '0px'    
  else box.style.left = '-100%'
}

// 点击购物车按钮 
function sendData(){
  sessionStorage.setItem('carData',carData)
  sessionStorage.setItem('shopNum',shopNum)
}


// 点击选购商品
function addData(name,price){
  var newData = name + - + price + ' '
  if(!carData.length) carData = newData
  else if(carData.indexOf(newData)!=-1) return
  else carData = carData + newData
  console.log(carData)
  shopNum ++;
  cart.innerHTML = shopNum
}