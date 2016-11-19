/**
 * Created by Lynn on 2016/11/15 0015.
 */
var mySwiper=new Swiper('.swiper-container',{
    direction:'vertical',
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
                    case length-1:
                        item.id='page1';
                        break;
                    default :
                        item.id='page'+curIndex;
                }
            }
        })
    }
});