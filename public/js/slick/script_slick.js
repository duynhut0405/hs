(function ($) {
    $(document).ready(function () {
        var $window = $(window);

    // Responsive Slick    
    function itemSlick(slick,responsive,paramslide) {
            var autospeed = 5000,
                margin = 0,
                marginRes = 10,
                arrows = 'icon-arrow-1',                
                speed,dataout,datain,dotsContainer,navContainer;

            var slideArray = paramslide.split('||');
            $.each(slideArray, function (index, value) {
              var value = value.split('=');

              if(value[0] == 'speed')
                speed = parseInt(value[1]);
              if(value[0] == 'autospeed')
                autospeed = parseInt(value[1]);
              else if(value[0] == 'out')
                dataout = value[1];
              else if(value[0] == 'in')
                datain = value[1];
              else if(value[0] == 'nav')
                navContainer = value[1];
              else if(value[0] == 'dot')
                dotsContainer = value[1];
              else if(value[0] == 'margin')
                margin = parseInt(value[1]);
                if(margin==0){  marginRes = 0;  }            
              else if(value[0] == 'arrows')
                arrows = value[1];            
            });


            slick.slick({
                nextArrow: '<span class="nextArrow"><i class="icon-arrow-1 "></i></span>',
                prevArrow: '<span class="prevArrow"><i class="icon-arrow-1 ix"></i></span>',
                infinite: slick.hasClass('s-loop') ? true : false,
                fade: (slick.hasClass('s-fade') ? true : false),                                   
                adaptiveHeight: (slick.hasClass('s-height') ? true : false),
                arrows: (slick.hasClass('s-nav') ? true : false),
                dots: (slick.hasClass('s-dots') ? true : false),
                speed: (speed ? parseInt(speed) : 400),
                variableWidth: (slick.hasClass('s-width') ? true : false),
                autoplaySpeed: (autospeed ? parseInt(autospeed) : 5000),
                autoplay: slick.hasClass('s-auto') ? true : false,
                centerMode: slick.hasClass('s-center') ? true : false,

                slidesToShow: parseInt(responsive[0]),
                  responsive: [
                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: parseInt(responsive[1]),
                        arrows: false,
                        autoplay:true
                      }
                    },
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToShow: parseInt(responsive[2]),
                        arrows: false,
                        autoplay:true
                      }
                    },                        
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: parseInt(responsive[3]),
                        arrows: false,
                        autoplay:true   
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: parseInt(responsive[4]),
                        arrows: false,
                        autoplay:true     
                      }
                    }
                  ]
            });
 
    }        

    // Responsive Slick    
    function ResSlickSlider() {
        $(".slick-res").each(function () {
            var slick = $(this),
                responsive =  slick.attr('data-res'),
                paramslide = slick.attr('paramslide'); 
                if(!paramslide) paramslide='';

            if(!responsive) { responsive = '1,1,1,1'; }
            responsive = responsive.split(',');
            itemSlick(slick,responsive,paramslide);
        });    
    }        
    ResSlickSlider();    

    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      nextArrow: '<span class="nextArrow"><i class="icon-arrow-1 "></i></span>',
      prevArrow: '<span class="prevArrow"><i class="icon-arrow-1 ix"></i></span>',      
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      focusOnSelect: true
    });



   

    });
})(jQuery); 