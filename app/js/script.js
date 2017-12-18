'use strict';

var loader = document.querySelector('.loader__wrapper');
loader.classList.add('js');

window.addEventListener('load', function () {

    loader.classList.add('scale-out-center');

    //    const loadertime = setTimeout(()=>{

    // loader.classList.add('js');

    //    }, 200);

    // clearTimeout(loaderTime);
}, false);

function initMap() {
    var cord = { lat: 51.081646, lng: 17.038184 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: cord,
        title: 'Wrocław',
        styles: [{
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "hue": "#7fc8ed"
            }, {
                "saturation": 55
            }, {
                "lightness": -6
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "hue": "#7fc8ed"
            }, {
                "saturation": 55
            }, {
                "lightness": -6
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#83cead"
            }, {
                "saturation": 1
            }, {
                "lightness": -15
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#f3f4f4"
            }, {
                "saturation": -84
            }, {
                "lightness": 59
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [{
                "hue": "#ffffff"
            }, {
                "saturation": -100
            }, {
                "lightness": 100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#ffffff"
            }, {
                "saturation": -100
            }, {
                "lightness": 100
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "hue": "#bbbbbb"
            }, {
                "saturation": -100
            }, {
                "lightness": 26
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#ffcc00"
            }, {
                "saturation": 100
            }, {
                "lightness": -35
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#ffcc00"
            }, {
                "saturation": 100
            }, {
                "lightness": -22
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.school",
            "elementType": "all",
            "stylers": [{
                "hue": "#d7e4e4"
            }, {
                "saturation": -60
            }, {
                "lightness": 23
            }, {
                "visibility": "on"
            }]
        }]

    });
    var marker = new google.maps.Marker({
        position: cord,
        map: map
    });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJsb2FkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdE1hcCIsImNvcmQiLCJsYXQiLCJsbmciLCJtYXAiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJ6b29tIiwiY2VudGVyIiwidGl0bGUiLCJzdHlsZXMiLCJtYXJrZXIiLCJNYXJrZXIiLCJwb3NpdGlvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxTQUFTQyxTQUFTQyxhQUFULENBQXVCLGtCQUF2QixDQUFmO0FBQ0lGLE9BQU9HLFNBQVAsQ0FBaUJDLEdBQWpCLENBQXFCLElBQXJCOztBQUVKQyxPQUFPQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFJOztBQUVwQ04sV0FBT0csU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUIsa0JBQXJCOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBRUMsQ0FaRCxFQVlFLEtBWkY7O0FBZUEsU0FBU0csT0FBVCxHQUFtQjtBQUNmLFFBQU1DLE9BQU8sRUFBRUMsS0FBSyxTQUFQLEVBQWtCQyxLQUFLLFNBQXZCLEVBQWI7O0FBRUEsUUFBTUMsTUFBTSxJQUFJQyxPQUFPQyxJQUFQLENBQVlDLEdBQWhCLENBQW9CYixTQUFTYyxjQUFULENBQXdCLEtBQXhCLENBQXBCLEVBQW9EO0FBQzVEQyxjQUFNLEVBRHNEO0FBRTVEQyxnQkFBUVQsSUFGb0Q7QUFHNURVLGVBQU8sU0FIcUQ7QUFJNURDLGdCQUFRLENBQ1o7QUFDSSwyQkFBZSxPQURuQjtBQUVJLDJCQUFlLEtBRm5CO0FBR0ksdUJBQVcsQ0FDUDtBQUNJLHVCQUFPO0FBRFgsYUFETyxFQUlQO0FBQ0ksOEJBQWM7QUFEbEIsYUFKTyxFQU9QO0FBQ0ksNkJBQWEsQ0FBQztBQURsQixhQVBPLEVBVVA7QUFDSSw4QkFBYztBQURsQixhQVZPO0FBSGYsU0FEWSxFQW1CWjtBQUNJLDJCQUFlLE9BRG5CO0FBRUksMkJBQWUsUUFGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYztBQURsQixhQUpPLEVBT1A7QUFDSSw2QkFBYSxDQUFDO0FBRGxCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQW5CWSxFQXFDWjtBQUNJLDJCQUFlLFVBRG5CO0FBRUksMkJBQWUsVUFGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYztBQURsQixhQUpPLEVBT1A7QUFDSSw2QkFBYSxDQUFDO0FBRGxCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQXJDWSxFQXVEWjtBQUNJLDJCQUFlLFdBRG5CO0FBRUksMkJBQWUsVUFGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYyxDQUFDO0FBRG5CLGFBSk8sRUFPUDtBQUNJLDZCQUFhO0FBRGpCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQXZEWSxFQXlFWjtBQUNJLDJCQUFlLFdBRG5CO0FBRUksMkJBQWUsUUFGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYyxDQUFDO0FBRG5CLGFBSk8sRUFPUDtBQUNJLDZCQUFhO0FBRGpCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQXpFWSxFQTJGWjtBQUNJLDJCQUFlLE1BRG5CO0FBRUksMkJBQWUsVUFGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYyxDQUFDO0FBRG5CLGFBSk8sRUFPUDtBQUNJLDZCQUFhO0FBRGpCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQTNGWSxFQTZHWjtBQUNJLDJCQUFlLE1BRG5CO0FBRUksMkJBQWUsUUFGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYyxDQUFDO0FBRG5CLGFBSk8sRUFPUDtBQUNJLDZCQUFhO0FBRGpCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQTdHWSxFQStIWjtBQUNJLDJCQUFlLGVBRG5CO0FBRUksMkJBQWUsVUFGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYztBQURsQixhQUpPLEVBT1A7QUFDSSw2QkFBYSxDQUFDO0FBRGxCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQS9IWSxFQWlKWjtBQUNJLDJCQUFlLGNBRG5CO0FBRUksMkJBQWUsVUFGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYztBQURsQixhQUpPLEVBT1A7QUFDSSw2QkFBYSxDQUFDO0FBRGxCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQWpKWSxFQW1LWjtBQUNJLDJCQUFlLFlBRG5CO0FBRUksMkJBQWUsS0FGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYyxDQUFDO0FBRG5CLGFBSk8sRUFPUDtBQUNJLDZCQUFhO0FBRGpCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQW5LWTs7QUFKb0QsS0FBcEQsQ0FBWjtBQTZMQSxRQUFJQyxTQUFTLElBQUlSLE9BQU9DLElBQVAsQ0FBWVEsTUFBaEIsQ0FBdUI7QUFDaENDLGtCQUFVZCxJQURzQjtBQUVoQ0csYUFBS0E7QUFGMkIsS0FBdkIsQ0FBYjtBQUlIIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXJfX3dyYXBwZXInKTtcclxuICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKCdqcycpO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKT0+e1xyXG5cclxubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ3NjYWxlLW91dC1jZW50ZXInKTtcclxuXHJcbi8vICAgIGNvbnN0IGxvYWRlcnRpbWUgPSBzZXRUaW1lb3V0KCgpPT57XHJcblxyXG4vLyBsb2FkZXIuY2xhc3NMaXN0LmFkZCgnanMnKTtcclxuXHJcbi8vICAgIH0sIDIwMCk7XHJcblxyXG4vLyBjbGVhclRpbWVvdXQobG9hZGVyVGltZSk7XHJcblxyXG59LGZhbHNlKTtcclxuXHJcblxyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgY29uc3QgY29yZCA9IHsgbGF0OiA1MS4wODE2NDYsIGxuZzogMTcuMDM4MTg0IH07XHJcbiAgICBcclxuICAgIGNvbnN0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICAgICAgem9vbTogMTcsXHJcbiAgICAgICAgY2VudGVyOiBjb3JkLFxyXG4gICAgICAgIHRpdGxlOiAnV3JvY8WCYXcnLFxyXG4gICAgICAgIHN0eWxlczogW1xyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiM3ZmM4ZWRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogNTVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogLTZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjN2ZjOGVkXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IDU1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IC02XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiIzgzY2VhZFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IC0xNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmM2Y0ZjRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogLTg0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDU5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmZmZmZmZcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogLTEwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAxMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmZmZmZmZcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogLTEwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAxMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNiYmJiYmJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogLTEwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAyNlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZmZjYzAwXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IDEwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAtMzVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmZmNjMDBcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogMTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IC0yMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuc2Nob29sXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiI2Q3ZTRlNFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiAtNjBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMjNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5dXHJcblxyXG5cclxuICAgIH0pO1xyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIHBvc2l0aW9uOiBjb3JkLFxyXG4gICAgICAgIG1hcDogbWFwXHJcbiAgICB9KTtcclxufSJdfQ==
