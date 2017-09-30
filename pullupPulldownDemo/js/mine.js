var myScroll,
 pullDownEl, pullDownOffset,
 pullUpEl, pullUpOffset,
 generatedCount = 0;

/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();  // 数据加载完成后，调用界面更新方法
 */
var  pullUpIndex = 0; // 设置初始值  （我设置了了pullUpIndex=3的时候不可以上拉加载）

// 上拉重新加载页面
function pullDownAction () {

// 这里写通过ajax 后台后台数据渲染到页面
 setTimeout(function () { // <-- Simulate network congestion, remove setTimeout from production!
  var el, li, i;
  el = document.getElementById('thelist');
  var result = "";
  for (i=0; i<2; i++) {
      result += `<div class="show_food_list">
        <div class="show_img">
          <img src="images/fd_banner.jpg" alt="">
        </div>
        <h4>东波四珍之一 ———— 东波肉2</h4>
        <div class="show_data_list">
          <div class="food_data">
            <img src="images/dianzan.png" alt="">
            <span>1233</span>
          </div>
          <div class="food_data">
            <img src="images/dianzan.png" alt="">
            <span>1233</span>
          </div>
          <div class="food_data">
            <img src="images/dianzan.png" alt="">
            <span>1233</span>
          </div>
        </div>
      </div>`
  }
  pullUpIndex = 0;
  $('#thelist').html(result);
  pullUpEl.querySelector('.pullUpLabel').innerHTML = '';

  myScroll.refresh();  //数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
 }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();  // 数据加载完成后，调用界面更新方法
 */
  // 上拉加载更多
function pullUpAction () {

// 这里写通过ajax 后台后台数据渲染到页面
 setTimeout(function () { // <-- Simulate network congestion, remove setTimeout from production!
  var el, li, i;
  el = document.getElementById('thelist');
  var result = "";
  for (i=0; i<4; i++) {
     result += `<div class="show_food_list">
        <div class="show_img">
          <img src="images/fd_banner.jpg" alt="">
        </div>
        <h4>东波四珍之一 ———— 东波肉2</h4>
        <div class="show_data_list">
          <div class="food_data">
            <img src="images/dianzan.png" alt="">
            <span>1233</span>
          </div>
          <div class="food_data">
            <img src="images/dianzan.png" alt="">
            <span>1233</span>
          </div>
          <div class="food_data">
            <img src="images/dianzan.png" alt="">
            <span>1233</span>
          </div>
        </div>
      </div>`
  }
  $("#thelist").append(result);

  
  myScroll.refresh();  // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
 }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 初始化iScroll控件
 */
 
function loaded() {
 pullDownEl = document.getElementById('pullDown');
 pullDownOffset = pullDownEl.offsetHeight;
 pullUpEl = document.getElementById('pullUp'); 
 pullUpOffset = pullUpEl.offsetHeight;

 myScroll = new iScroll('wrapper', {
  scrollbarClass: 'myScrollbar', /* 重要样式 */
  useTransition: false, /* 此属性不知用意，本人从true改为false */
  topOffset: pullDownOffset,
  // 拖动幅度比较小时候出发的方法
  onRefresh: function () {
   if (pullDownEl.className.match('loading')) {
    pullDownEl.className = '';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
   } else if (pullUpEl.className.match('loading')) {
    pullUpEl.className = '';
    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
   }
  },
  // 拖动距离比较大的出发的方法
  onScrollMove: function () {
   if (this.y > 5 && !pullDownEl.className.match('flip')) {
    pullDownEl.className = 'flip';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
    this.minScrollY = 0;
   } else if (this.y < 5 && pullDownEl.className.match('flip')) {
    pullDownEl.className = '';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
    this.minScrollY = -pullDownOffset;
   } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
    pullUpEl.className = 'flip';
    pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
    this.maxScrollY = this.maxScrollY;
   } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
    pullUpEl.className = '';
    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
    this.maxScrollY = pullUpOffset;
   }
  },
  // 放手后的方法
  onScrollEnd: function () {
   if (pullDownEl.className.match('flip')) {
    pullDownEl.className = 'loading';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';    
    pullDownAction(); // Execute custom function (ajax call?)
   } else if (pullUpEl.className.match('flip')) {
    pullUpIndex ++;
    console.log(pullUpIndex)
        pullUpEl.className = 'loading';
        if(pullUpIndex < 3){
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';    
            pullUpAction(); // Execute custom function (ajax call?)
        }else{
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '数据已全部加载完毕';   
        }
    
   }
  }
 });

 setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件 
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);