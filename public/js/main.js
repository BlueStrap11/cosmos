// preloader
$(window).on("load", function() {
    $("#overlay").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350).css({
        overflow: "visible"
    })
});

//smooth link
$(function() {
    $(".smooth").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var a = $(this.hash);
            if (a = a.length ? a : $("[name=" + this.hash.slice(1) + "]"), a.length) return $("html,body").animate({
                scrollTop: a.offset().top
            }, 700), !1
        }
    })
})


$(document).ready(function(){
    // menu filter
   $('.navigate a').on('click', function(event){
       event.preventDefault();
       $('.navigate a').removeClass('active');  
       $(this).addClass("active");
       //var currentId = $(this).attr('href');
       //$(".card").fadeOut(300);
       //$(currentId).delay(300).fadeIn();
   });

   $('.navigate1 a').on('click', function(event){
       event.preventDefault();
       $('.navigate1 a').removeClass('active');  
       $(this).addClass("active");
       var currentId = $(this).attr('href');
       $(".card1").fadeOut(300);
       $(currentId).delay(300).fadeIn();
   });

   $('.navigate2 a').on('click', function(event){
       event.preventDefault();
       $('.navigate2 a').removeClass('active');  
       $(this).addClass("active");
       var currentId = $(this).attr('href');
       $(".card2").fadeOut(300);
       $(currentId).delay(300).fadeIn();
   });

   $('.location1 a').on('click', function(event){
       event.preventDefault();
       $('.location2 a').removeClass('active');  
       $(this).addClass("active");
       // var currentId = $(this).attr('href');
       // $(".card2").fadeOut(300);
       // $(currentId).delay(300).fadeIn();
   });

   $('.location2 a').on('click', function(event){
       event.preventDefault();
       $('.location1 a').removeClass('active');  
       $(this).addClass("active");
       // var currentId = $(this).attr('href');
       // $(".card2").fadeOut(300);
       // $(currentId).delay(300).fadeIn();
   });
    
    //show arrows
    $('.evnt-calendar').on('mouseenter', function(){
        if ($(".arrows").hasClass('show') == false){
            $(".arrows").addClass('show');
        } else {
            return false;
        }
    });
    $('.evnt-calendar').on('mouseleave', function(){
        if ($(".arrows").hasClass('show') == true){
            $(".arrows").removeClass('show');
        } else {
            return false;
        }
    });
    
    //handlers
    $('.handlers a').on('click', function(event){
       event.preventDefault();
       $('.handlers a').removeClass("active");
       $(this).addClass("active");
       var place = $(this).parent().index();
       $('.scroll').animate({'margin-left':'-' + 100 * place + "%"}, 'slow');
      });
    
    //next
    $(".arrows #next").on('click', function(event){
        event.preventDefault();
        if ($('.handlers .active').parent().index() <= $('.handlers .active').parent().length){
            $('.handlers .active').parent().next().children('a').trigger('click', event.preventDefault());
        } else {
            $('.handlers li').first().children('a').trigger('click', event.preventDefault());
        }
    });
    
    //prev
    $(".arrows #prev").on('click', function(event){
        event.preventDefault();
        if ($('.handlers .active').parent().index() > 0){
            $('.handlers .active').parent().prev().children('a').trigger('click', event.preventDefault());
        } else {
            $('.handlers li').last().children('a').trigger('click', event.preventDefault());
        }
    });
});

// GOOGLE MAP SETTING from https://snazzymaps.com/style/151/ultra-light-with-labels
// When the window has finished loading create our google map below
// We are using a div with id="map" seen below in the <body>
var mapElement = document.getElementById('map');
var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,
        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles:[  
         {  
            "featureType":"water",
            "elementType":"geometry",
            "stylers":[  
               {  
                  "color":"#e9e9e9"
               },
               {  
                  "lightness":17
               }
            ]
         },
         {  
            "featureType":"landscape",
            "elementType":"geometry",
            "stylers":[  
               {  
                  "color":"#f5f5f5"
               },
               {  
                  "lightness":20
               }
            ]
         },
         {  
            "featureType":"road.highway",
            "elementType":"geometry.fill",
            "stylers":[  
               {  
                  "color":"#ffffff"
               },
               {  
                  "lightness":17
               }
            ]
         },
         {  
            "featureType":"road.highway",
            "elementType":"geometry.stroke",
            "stylers":[  
               {  
                  "color":"#ffffff"
               },
               {  
                  "lightness":29
               },
               {  
                  "weight":0.2
               }
            ]
         },
         {  
            "featureType":"road.arterial",
            "elementType":"geometry",
            "stylers":[  
               {  
                  "color":"#ffffff"
               },
               {  
                  "lightness":18
               }
            ]
         },
         {  
            "featureType":"road.local",
            "elementType":"geometry",
            "stylers":[  
               {  
                  "color":"#ffffff"
               },
               {  
                  "lightness":16
               }
            ]
         },
         {  
            "featureType":"poi",
            "elementType":"geometry",
            "stylers":[  
               {  
                  "color":"#f5f5f5"
               },
               {  
                  "lightness":21
               }
            ]
         },
         {  
            "featureType":"poi.park",
            "elementType":"geometry",
            "stylers":[  
               {  
                  "color":"#dedede"
               },
               {  
                  "lightness":21
               }
            ]
         },
         {  
            "elementType":"labels.text.stroke",
            "stylers":[  
               {  
                  "visibility":"on"
               },
               {  
                  "color":"#ffffff"
               },
               {  
                  "lightness":16
               }
            ]
         },
         {  
            "elementType":"labels.text.fill",
            "stylers":[  
               {  
                  "saturation":36
               },
               {  
                  "color":"#333333"
               },
               {  
                  "lightness":40
               }
            ]
         },
         {  
            "elementType":"labels.icon",
            "stylers":[  
               {  
                  "visibility":"off"
               }
            ]
         },
         {  
            "featureType":"transit",
            "elementType":"geometry",
            "stylers":[  
               {  
                  "color":"#f2f2f2"
               },
               {  
                  "lightness":19
               }
            ]
         },
         {  
            "featureType":"administrative",
            "elementType":"geometry.fill",
            "stylers":[  
               {  
                  "color":"#fefefe"
               },
               {  
                  "lightness":20
               }
            ]
         },
         {  
            "featureType":"administrative",
            "elementType":"geometry.stroke",
            "stylers":[  
               {  
                  "color":"#fefefe"
               },
               {  
                  "lightness":17
               },
               {  
                  "weight":1.2
               }
            ]
         }
      ]
    };

google.maps.event.addDomListener(window, 'load', locate_rajapark);

function locate_mansarover() {
  // The latitude and longitude to center the map (always required)
  mapOptions.center = new google.maps.LatLng(26.8435679,75.7686004)
  var map = new google.maps.Map(mapElement, mapOptions);
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(26.8435679,75.7686004),
      map: map,
  });
}

function locate_rajapark() {
  // The latitude and longitude to center the map (always required)
  mapOptions.center = new google.maps.LatLng(26.894253,75.821861)
  var map = new google.maps.Map(mapElement, mapOptions);
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(26.894253,75.821861),
      map: map,
  });
}
    