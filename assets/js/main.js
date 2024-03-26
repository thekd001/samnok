// 마우스효과
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// nav
$('.nav').hover(function(){
    $('.nav .sub-list').addClass('on');
    $('header').addClass('on');
});
$('.header').on('mouseleave',function(){
    $('.nav .sub-list').removeClass('on');
    $('header').removeClass('on');
});

// mobile menu
$('.m_btn').click(function(){
    lenis.stop();
    $(this).toggleClass('on');
    $('.m_bg').toggleClass('show');
    $('.m_menu').toggleClass('show');
    if(!$(this).hasClass('on')){
        lenis.start();
    }
});
$(document).click(function(e){
    if ($('.header').has(e.target).length === 0){
        $('.m_btn').removeClass('on');
        $('.m_bg').removeClass('show');
        $('.m_menu').removeClass('show');
        lenis.start();
    }
})

$('.m-link').click(function(e){
    e.preventDefault();
    if($(this).hasClass('on')){
        $('.m-link').removeClass('on').siblings('.sub').stop().slideUp();
    }else{
        $('.m-link').removeClass('on').siblings('.sub').stop().slideUp();
        $(this).addClass('on').siblings('.sub').stop().slideDown();
    }
})

// header 스크롤
let scrollTimer = 0;
function hd_scroll(){
    $('.header').addClass('hide');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
        $('.header').removeClass('hide');
    }, 100);
}

$(window).scroll(function(){
    curr = $(this).scrollTop();
    if(curr >= 50){
        $('.header').addClass('active')
    }else{
        $('.header').removeClass('active')
    }
    if(!$('.m_menu').hasClass('show')){
		hd_scroll();
	}
})

gsap.registerPlugin(ScrollTrigger);

// 비주얼
function visEffect(){
    let visual = gsap.timeline({
        onUpdate:function(){
            $('.header').removeClass('hide');
        }
    });
    visual.from(".sc-visual .bg-area",1,{scale:1.1, 'filter': 'blur(4px)'}, 'a');
    visual.from(".sc-visual .content h1",0.5,{y:-100, opacity:0}, 'a');
    visual.from(".sc-visual .content .img",0.5,{y:-100, opacity:0, delay:0.5}, 'a');
    first = gsap.timeline({
        scrollTrigger:{
            trigger:".first-wrap",
            start:"0% 70%",
            end:"100% 100%",
            toggleActions:"play resume resume reverse",
        },
    })
    first.from('.first-wrap .img-box',{y:150, opacity:0}, 'a');
    first.from('.first-wrap h2',{y:150, opacity:0, delay:0.5}, 'a');
    first.from('.first-wrap p',{y:150, opacity:0, delay:0.8}, 'a');
}

// 기업소개
function companyEffect(){
    company = gsap.timeline({
        scrollTrigger:{
            trigger:".sc-company",
            start:"0% 80%",
            end:"100% 100%",
            toggleActions:"play resume resume reverse",
        },
    })
    company.from('.sc-company .title-area',0.8,{xPercent:-10, opacity:0}, 'a');
    company.from('.sc-company .scroll-down',0.8,{y:-100, opacity:0}, 'a');
       
    
    gsap.utils.toArray('.sc-company .img-common').forEach(element => {
        item01 = gsap.timeline({
            scrollTrigger:{
                trigger:element,
                start:"0% 80%",
                end:"100% 100%",
                toggleActions:"play resume resume reverse",
            },
        })    
        item01.from(element.querySelector('.img-area'),{ opacity:0 },'a');
        item01.from(element.querySelector('.img-area img'),{ scale:1.3 },'a');
        item01.from(element.querySelector('.text-wrap'),{ opacity:0, y:100 },'a+=0.5');
        item01.from(element.querySelector('.stroke-wrap'),{ opacity:0, y:100 },'a+=0.5');
    });
}

$('.box-in .btn-more, .stroke-in .btn-more').hover(function(){
    $('.box-in .btn-more, .stroke-in .btn-more').addClass('on')
},function(){
    $('.box-in .btn-more, .stroke-in .btn-more').removeClass('on')
})

// 사업분야
function businessEffect(){
    ScrollTrigger.matchMedia({        
        "(min-width: 768px)": function(){
            let imgWidth_ = $('.sc-business').find('.img-wrap').width();
            let textWidth = $('.sc-business').find(".text-last").width();					
            let wdWidth = $(window).outerWidth();
            let setWidth = textWidth + wdWidth;
            let moveWidth = imgWidth_ + setWidth;
            
            business = gsap.timeline({
                scrollTrigger:{
                    trigger:".sc-business",
                    start:"0% 0%",
                    end:"100% 100%",
                    scrub:0,
                    invalidateOnRefresh: true,
                },
            })
            gsap.set('.sc-business .other .common-wrap',{
                x:function(){
                    return window.innerWidth
                }
            });
            gsap.set('.sc-business .other .text-area',{
                x:function(){
                    return -setWidth
                }
            });
            business.to('.sc-business .content.first .img-wrap',{width:'46%'},'a')
            business.to('.sc-business .content.first .wrap',{height:'50vh'},'a')
            business.to('.sc-business .content.first .box-in',{left:"100%"}, 'a');
            business.to('.sc-business .content.first .stroke-in',{left:"100%"}, 'a');
            business.to('.sc-business .content.first .img-wrap',{
                x:function(){
                    return -window.innerWidth;
            }},'b');
            business.set('.sc-business .content:nth-child(2)',{'z-index':2},'b+=0.2');
            business.to('.sc-business .content:nth-child(2) .common-wrap',{
                x:function(){
                    return -window.innerWidth
                }
            },'b+=0.2');
            business.to('.sc-business .content:nth-child(2) .text-area',{
                x:function(){
                    return moveWidth
                }
            },'b+=0.2');
            business.set('.sc-business .content:nth-child(3)',{'z-index':3},'c-=0.2');
            business.to('.sc-business .content:nth-child(3) .common-wrap',{
                x:function(){
                    return -window.innerWidth
                }
            },'c-=0.2');
            business.to('.sc-business .content:nth-child(3) .text-area',{
                x:function(){
                    return moveWidth
                }
            },'c-=0.2');
            business.set('.sc-business .content:nth-child(4)',{'z-index':4},'d-=0.2');
            business.to('.sc-business .content:nth-child(4) .common-wrap',{
                x:function(){
                    return -window.innerWidth
                }
            },'d-=0.2');
            business.to('.sc-business .content:nth-child(4) .text-area',{
                x:function(){
                    return moveWidth
                }
            },'d-=0.2');
            business.set('.sc-business .content:nth-child(5)',{'z-index':5},'e-=0.2');
            business.to('.sc-business .content:nth-child(5) .common-wrap',{
                x:function(){
                    return -window.innerWidth
                }
            },'e-=0.2');
            business.to('.sc-business .content:nth-child(5) .text-area',{
                x:function(){
                    return moveWidth
                }
            },'e-=0.2');
        },
        "(max-width: 767px)": function () {
            busiTitle = gsap.timeline({
                scrollTrigger:{
                    trigger:".business-mobile",
                    start:"0% 70%",
                    end:"100% 100%",
                    toggleActions:"play resume resume reverse",
                },
            })
            busiTitle.from('.business-mobile .title-area',{y:-100, opacity:0}, 'a');
            busiTitle.from('.business-mobile .slide-wrap',{y:-100, opacity:0, delay:0.5}, 'a');
        },
    });
}

// 사업분야 모바일슬라이드
const slide1 = new Swiper('.busi-slide',{   
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
})

visEffect();
companyEffect();
businessEffect();

$(window).resize(function(){
    document.location.reload();
});
// cursor
$(window).mousemove(function(e){
    x = e.clientX;
    y = e.clientY;

    gsap.to('.cursor',{
        x:x,
        y:y
    })
})

$('.cursor-area').mouseover(function(){
    $('.cursor').addClass('on')
})
$('.cursor-area').mouseleave(function(){
    $('.cursor').removeClass('on')
})