/*--String.prototype--*/
~function (pro) {
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);
/*阻止系统默认事件  阻止冒泡*/
$(document).on("touchmove",function (e) {
    e.preventDefault();
    e.stopPropagation();
});


/*--LOADING--*/
var loadingRender = (function () {
    /* ../img/swiper/ */
    var ary = ["6-1.png", "6-2.png", "6-3.png", "6-4.png", "6-5.png", "about.png", "ajax.png", "bg1.png", "bg2.jpg", "bg3.jpg", "bg33.png", "bg44.png", "bg5.jpg", "bg55.png", "bg6.jpg", "company1.png", "company2.png", "company3.png", "company4.png", "corner1.png", "corner2.png", "css-3-logo.png", "e.png", "education.png", "experience.png", "html.png", "jquery.png", "less.png", "liubianti.png", "next.png", "node.png", "pingjia.png", "skills.png", "social-angular.png", "social-javascript.png", "work.png", "xuan.png"];
    /* ../img/ */
    var arr=[ '2016.png','man.png', 'resume.png', 'xian1.png', 'xian2.png', 'xian3.png', 'xing1.png', 'xing2.png', 'xing3.png', 'cube1.png', 'cube2.png', 'cube3.png', 'cube4.png', 'cube5.png', 'cube6.png', 'zf_cubeBg.jpg', 'cubeTip.png', 'zf_outline.png', 'return.png' ];
    //->获取需要操作的元素
    var $loading = $('#loading'),
        $progressBox = $loading.find('.progressBox');
    var step = 0,
        total = ary.length+arr.length;

    return {
        init: function () {
            $loading.css('display', 'block');

            //->循环加载所有的图片,控制进度条的宽度
            $.each(ary, function (index, item) {
                var oImg = new Image;
                oImg.src = 'img/swiper/' + item;
                oImg.onload = function () {
                    step++;
                    $progressBox.css('width', step / total * 100 + '%');
                    oImg = null;
                    if (step === total) {
                        console.log(step)
                        console.log(total)
                        // if (page === 0) return;
                        window.setTimeout(function () {
                            $loading.css('display', 'none');
                            firstRender.init();
                        }, 2000);
                    }
                }
            });
            $.each(arr, function (index, item) {
                var oImg = new Image;
                oImg.src = 'img/' + item;
                oImg.onload = function () {
                    step++;
                    $progressBox.css('width', step / total * 100 + '%');
                    oImg = null;
                    if (step === total) {
                        console.log(step)
                        console.log(total)
                        // if (page === 0) return;
                        window.setTimeout(function () {
                            $loading.css('display', 'none');
                            firstRender.init();
                        }, 2000);
                    }
                }
            });
            /*音频预加载？？？*/
            // $('#proudBoy').oncanplay=function () {
                //->所有图片和音频都已经加载完毕:关闭LOADING,显示PHONE

            // };

        }
    }
})();
/*MUSIC*/
var musicRender = (function () {
    return {
        init: function () {
            var music = document.querySelector(".music"),
                proudBoy = document.querySelector("#proudBoy");
            window.setTimeout(function () {
                proudBoy.play();
                proudBoy.addEventListener("canplay", function () {
                    music.className = "music musicCur";
                })
            }, 1000);
            music.addEventListener("click", function () {
                //paused属性判断音频文件是播放的还是停止 beyond.paused=true说明音频文件目前是停止播放
                //让音频文件播放play(),让音频文件停止是pause();
                if (proudBoy.paused) {//停止
                    proudBoy.play();
                    music.className = "music musicCur";
                } else {
                    proudBoy.pause();
                    music.className = "music";
                    music.style.opacity = 1;
                }
            }, false);
        }
    }
})();
/*firstRender*/
var firstRender = function () {
    var $firstPage = $('#firstPage'),
        $next = $firstPage.find('.next');

    return {
        init: function () {
            musicRender.init();
            $firstPage.css('display', 'block');
            /*点击、滑动进入魔方页面*/
            /*PC端用mouse系列解决--怎么辨别PC还是移动端？？？？*/
            $firstPage.on('swipeUp', function () {
                $firstPage.css('display', 'none');
                cubeRender.init();
            });
            /*next按钮*/
            /*PC端*/
            $next.on('click', function () {
                $firstPage.css('display', 'none');
                cubeRender.init();
            });
            /*移动端*/
            /*$next.tap(function () {
                $firstPage.css('display', 'none');
                cubeRender.init();
            });*/
        }
    }
}();

/*--CUBE--*/
var cubeRender = (function () {
    var $cube = $('#cube'),
        $cubeBox = $cube.children('.cubeBox'),
        $cubBoxLis = $cubeBox.children('li'),
        $return = $cube.children('.return'),
        $down = $cube.find('.down'),
        $next = $down.find('.next');
    //->滑动的处理
    function isSwipe(changeX, changeY) {
        return Math.abs(changeX) > 30 || Math.abs(changeY) > 0;
    }

    function start(ev) {
        var point = ev.touches[0];
        $(this).attr({
            strX: point.clientX,
            strY: point.clientY,
            changeX: 0,
            changeY: 0
        });
    }

    function move(ev) {
        var point = ev.touches[0];
        var changeX = point.clientX - $(this).attr('strX'),
            changeY = point.clientY - $(this).attr('strY');
        $(this).attr({
            changeX: changeX,
            changeY: changeY
        });
    }

    function end(ev) {
        var changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY'));
        var rotateX = parseFloat($(this).attr('rotateX')),
            rotateY = parseFloat($(this).attr('rotateY'));
        if (isSwipe(changeX, changeY) === false) return;
        /*判断旋转方向*/
        var rX=(Math.abs(rotateX))%360;
        if((rX<90&&rX>0)||(rX>270&&rX<360)){
            rotateY = rotateY + changeX / 4;
        }else{
            rotateY = rotateY - changeX / 4;
        }
        rotateX = rotateX - changeY / 4;


        $(this).attr({
            rotateX: rotateX,
            rotateY: rotateY
        }).css('transform', 'scale(0.6) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
    }

    //->PC拖拽处理（PC端-未启动）
    function dragDown(ev) {
        $cubeBox.attr({
            strX: ev.clientX,
            strY: ev.clientY,
            changeX: 0,
            changeY: 0
        });
        $(document).on('mousemove', dragMove);
        $(document).on('mouseup', dragEnd);
    }

    function dragMove(ev) {
        var changeX = ev.clientX - $cubeBox.attr('strX'),
            changeY = ev.clientY - $cubeBox.attr('strY');
        $cubeBox.attr({
            changeX: changeX,
            changeY: changeY
        });
    }

    function dragEnd(ev) {
        var changeX = parseFloat($cubeBox.attr('changeX')),
            changeY = parseFloat($cubeBox.attr('changeY'));
        var rotateX = parseFloat($cubeBox.attr('rotateX')),
            rotateY = parseFloat($cubeBox.attr('rotateY'));
        if (isSwipe(changeX, changeY) === false) return;
        rotateX = rotateX - changeY / 3;
        rotateY = rotateY + changeX / 3;
        $cubeBox.attr({
            rotateX: rotateX,
            rotateY: rotateY
        }).css('transform', 'scale(0.6) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');

        $(document).off('mousemove', dragMove);
        $(document).off('mouseup', dragEnd);
    }

    return {
        init: function () {
            $cube.css('display', 'block');

            //->魔方区域的滑动
           /* if (lx === 100) {
                $cubeBox.attr({
                    rotateX: -35,
                    rotateY: 45
                });
                $cubeBox.on('mousedown', dragDown);
            } else {*/
                $cubeBox.attr({
                    rotateX: -35,
                    rotateY: 45
                }).on('touchstart', start).on('touchmove', move).on('touchend', end);
            //}

            //->每一个页面的点击操作
            /*lx是什么？？？==100？？？？*/
            if (lx === 100) {
                $cubBoxLis.on('click', function () {
                    var index = $(this).index();
                    $cube.css('display', 'none');
                    swiperRender.init(index);
                });
            } else {
                $cubBoxLis.singleTap(function () {
                    var index = $(this).index();
                    $cube.css('display', 'none');
                    swiperRender.init(index);
                });
            }
            /*返回按钮*/
            if (lx === 100) {
                $return.on('click', function () {
                    $cube.css('display', 'none');
                    $('#firstPage').css('display', 'block');
                });
            } else {
                $return.singleTap(function () {
                    $cube.css('display', 'none');
                    $('#firstPage').css('display', 'block');
                });
            }

            /*next按钮*/
            $down.on('swipeUp', function () {
                $cube.css('display', 'none');
                swiperRender.init(1);
            });
            $next.on('click', function () {
                $cube.css('display', 'none');
                swiperRender.init(1);
            });
        }
    }
})();

/*--SWIPER--*/
var swiperRender = (function () {
    var $swiper = $('#swiper'),
        // $makisu = $('#makisu'),
        $return = $swiper.children('.return');

    //->effect one:实现每一屏幕滑动切换后控制页面的动画
   /* function change(example) {
     var slidesAry = example.slides,
     activeIndex = example.activeIndex;
     $.each(slidesAry, function (index, item) {
     if (index === activeIndex) {
     item.id = 'slide' + (activeIndex + 1);
     return;
     }
     item.id = null;
     });
     }*/

    return {
        init: function (index) {
            $swiper.css('display', 'block');

            //->初始化SWIPER实现六个页面之间的切换
            var mySwiper = new Swiper('.swiper-container', {
                /*effect one*/
               /* effect: 'coverflow',
                onTransitionEnd: change,
                onInit: change,*/

                /*effect two*/
                direction: 'vertical',//horizontal  vertical
                loop: true,
                 /*可循换-->因为loop之后swiper在首尾默认增加了两个滑块-要让首尾各添加的滑块显示正确的效果*/
                onSlideChangeEnd: function (swiper) {
                    var slides = swiper.slides,
                        curIndex = swiper.activeIndex;
                    var lastIndexSlide = slides.length - 1,
                        trueIndexSlide = slides.length - 2;
                    [].forEach.call(slides, function (item, index) {
                        item.id = '';
                        if (curIndex === index) {
                            switch (index) {
                                case 0:
                                    item.id = 'slide' + trueIndexSlide;
                                    break;
                                case (slides.length - 1):
                                    item.id = 'slide1';
                                    break;
                                default :
                                    item.id = 'slide' + curIndex;
                            }
                        }
                    })
                }

            });
            index = index || 0;
            mySwiper.slideTo(index, 0);

            //->给返回按钮绑定单击事件
            // if (lx === 100) {
                $return.on('click', function () {
                    $swiper.css('display', 'none');
                    $('#cube').css('display', 'block');
                });
            // } else {
            //     $return.singleTap(function () {
            //         $swiper.css('display', 'none');
            //         $('#cube').css('display', 'block');
            //     });
            // }
        }
    }
})();

/*--控制显示--*/
var urlObj = window.location.href.queryURLParameter(),
    page = parseFloat(urlObj['page']),
    lx = parseFloat(urlObj['lx']);
console.log(page)
page === 0 || isNaN(page) ? loadingRender.init() : null;
page === 1 ? firstRender.init() : null;
page === 2 ? cubeRender.init() : null;
page === 3 ? swiperRender.init(1) : null;

/*if (lx === 100) {
    $('body').css('cursor', 'pointer');
    FastClick.attach(document.body);
}*/

