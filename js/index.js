/**
 * Created by Lynn on 2016/11/15 0015.
 */
var mySwiper=new Swiper('.swiper-container',{
    direction:'vertical',
    /*effect : 'cube',
    cube: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 100,
        shadowScale: 0.6
    },*/
    //autoplay:2000,
    //autoplayDisableOnInteraction:false,
    loop:true,/*可循换-->因为loop之后swiper在首尾默认增加了两个滑块-要让首尾各添加的滑块显示正确的效果*/
    onSlideChangeEnd: function (swiper) {
        var slides=swiper.slides,
            curIndex=swiper.activeIndex;
        var lastIndexSlide=slides.length-1,
            trueIndexSlide=slides.length-2;
        [].forEach.call(slides, function (item,index) {
            item.id='';
            if(curIndex===index){
                switch (index){
                    case 0:
                        item.id='page'+trueIndexSlide;
                        break;
                    case (slides.length-1):
                        item.id='page1';
                        break;
                    default :
                        item.id='page'+curIndex;
                }
            }
        })
    }
});
/*MUSIC*/
var music = document.querySelector(".music"),
    proudBoy = document.querySelector("#proudBoy");
window.setTimeout(function(){
    proudBoy.play();
    proudBoy.addEventListener("canplay",function(){
        music.className = "music musicCur";
    })
},1000);
music.addEventListener("click",function(){
    //paused属性判断音频文件是播放的还是停止 beyond.paused=true说明音频文件目前是停止播放
    //让音频文件播放play(),让音频文件停止是pause();
    if(proudBoy.paused){//停止
        proudBoy.play();
        music.className = "music musicCur";
    }else{
        proudBoy.pause();
        music.className = "music";
        music.style.opacity = 1;
    }
},false);