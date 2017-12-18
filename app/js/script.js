'use strict';

var loader = document.querySelector('.loader__wrapper');
loader.classList.add('js');

window.addEventListener('load', function () {

    loader.classList.remove('js');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJsb2FkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlIiwiaW5pdE1hcCIsImNvcmQiLCJsYXQiLCJsbmciLCJtYXAiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJ6b29tIiwiY2VudGVyIiwidGl0bGUiLCJzdHlsZXMiLCJtYXJrZXIiLCJNYXJrZXIiLCJwb3NpdGlvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxTQUFTQyxTQUFTQyxhQUFULENBQXVCLGtCQUF2QixDQUFmO0FBQ0lGLE9BQU9HLFNBQVAsQ0FBaUJDLEdBQWpCLENBQXFCLElBQXJCOztBQUVKQyxPQUFPQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFVOztBQUUxQ04sV0FBT0csU0FBUCxDQUFpQkksTUFBakIsQ0FBd0IsSUFBeEI7QUFJQyxDQU5ELEVBTUUsS0FORjs7QUFTQSxTQUFTQyxPQUFULEdBQW1CO0FBQ2YsUUFBTUMsT0FBTyxFQUFFQyxLQUFLLFNBQVAsRUFBa0JDLEtBQUssU0FBdkIsRUFBYjs7QUFFQSxRQUFNQyxNQUFNLElBQUlDLE9BQU9DLElBQVAsQ0FBWUMsR0FBaEIsQ0FBb0JkLFNBQVNlLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBcEIsRUFBb0Q7QUFDNURDLGNBQU0sRUFEc0Q7QUFFNURDLGdCQUFRVCxJQUZvRDtBQUc1RFUsZUFBTyxTQUhxRDtBQUk1REMsZ0JBQVEsQ0FDWjtBQUNJLDJCQUFlLE9BRG5CO0FBRUksMkJBQWUsS0FGbkI7QUFHSSx1QkFBVyxDQUNQO0FBQ0ksdUJBQU87QUFEWCxhQURPLEVBSVA7QUFDSSw4QkFBYztBQURsQixhQUpPLEVBT1A7QUFDSSw2QkFBYSxDQUFDO0FBRGxCLGFBUE8sRUFVUDtBQUNJLDhCQUFjO0FBRGxCLGFBVk87QUFIZixTQURZLEVBbUJaO0FBQ0ksMkJBQWUsT0FEbkI7QUFFSSwyQkFBZSxRQUZuQjtBQUdJLHVCQUFXLENBQ1A7QUFDSSx1QkFBTztBQURYLGFBRE8sRUFJUDtBQUNJLDhCQUFjO0FBRGxCLGFBSk8sRUFPUDtBQUNJLDZCQUFhLENBQUM7QUFEbEIsYUFQTyxFQVVQO0FBQ0ksOEJBQWM7QUFEbEIsYUFWTztBQUhmLFNBbkJZLEVBcUNaO0FBQ0ksMkJBQWUsVUFEbkI7QUFFSSwyQkFBZSxVQUZuQjtBQUdJLHVCQUFXLENBQ1A7QUFDSSx1QkFBTztBQURYLGFBRE8sRUFJUDtBQUNJLDhCQUFjO0FBRGxCLGFBSk8sRUFPUDtBQUNJLDZCQUFhLENBQUM7QUFEbEIsYUFQTyxFQVVQO0FBQ0ksOEJBQWM7QUFEbEIsYUFWTztBQUhmLFNBckNZLEVBdURaO0FBQ0ksMkJBQWUsV0FEbkI7QUFFSSwyQkFBZSxVQUZuQjtBQUdJLHVCQUFXLENBQ1A7QUFDSSx1QkFBTztBQURYLGFBRE8sRUFJUDtBQUNJLDhCQUFjLENBQUM7QUFEbkIsYUFKTyxFQU9QO0FBQ0ksNkJBQWE7QUFEakIsYUFQTyxFQVVQO0FBQ0ksOEJBQWM7QUFEbEIsYUFWTztBQUhmLFNBdkRZLEVBeUVaO0FBQ0ksMkJBQWUsV0FEbkI7QUFFSSwyQkFBZSxRQUZuQjtBQUdJLHVCQUFXLENBQ1A7QUFDSSx1QkFBTztBQURYLGFBRE8sRUFJUDtBQUNJLDhCQUFjLENBQUM7QUFEbkIsYUFKTyxFQU9QO0FBQ0ksNkJBQWE7QUFEakIsYUFQTyxFQVVQO0FBQ0ksOEJBQWM7QUFEbEIsYUFWTztBQUhmLFNBekVZLEVBMkZaO0FBQ0ksMkJBQWUsTUFEbkI7QUFFSSwyQkFBZSxVQUZuQjtBQUdJLHVCQUFXLENBQ1A7QUFDSSx1QkFBTztBQURYLGFBRE8sRUFJUDtBQUNJLDhCQUFjLENBQUM7QUFEbkIsYUFKTyxFQU9QO0FBQ0ksNkJBQWE7QUFEakIsYUFQTyxFQVVQO0FBQ0ksOEJBQWM7QUFEbEIsYUFWTztBQUhmLFNBM0ZZLEVBNkdaO0FBQ0ksMkJBQWUsTUFEbkI7QUFFSSwyQkFBZSxRQUZuQjtBQUdJLHVCQUFXLENBQ1A7QUFDSSx1QkFBTztBQURYLGFBRE8sRUFJUDtBQUNJLDhCQUFjLENBQUM7QUFEbkIsYUFKTyxFQU9QO0FBQ0ksNkJBQWE7QUFEakIsYUFQTyxFQVVQO0FBQ0ksOEJBQWM7QUFEbEIsYUFWTztBQUhmLFNBN0dZLEVBK0haO0FBQ0ksMkJBQWUsZUFEbkI7QUFFSSwyQkFBZSxVQUZuQjtBQUdJLHVCQUFXLENBQ1A7QUFDSSx1QkFBTztBQURYLGFBRE8sRUFJUDtBQUNJLDhCQUFjO0FBRGxCLGFBSk8sRUFPUDtBQUNJLDZCQUFhLENBQUM7QUFEbEIsYUFQTyxFQVVQO0FBQ0ksOEJBQWM7QUFEbEIsYUFWTztBQUhmLFNBL0hZLEVBaUpaO0FBQ0ksMkJBQWUsY0FEbkI7QUFFSSwyQkFBZSxVQUZuQjtBQUdJLHVCQUFXLENBQ1A7QUFDSSx1QkFBTztBQURYLGFBRE8sRUFJUDtBQUNJLDhCQUFjO0FBRGxCLGFBSk8sRUFPUDtBQUNJLDZCQUFhLENBQUM7QUFEbEIsYUFQTyxFQVVQO0FBQ0ksOEJBQWM7QUFEbEIsYUFWTztBQUhmLFNBakpZLEVBbUtaO0FBQ0ksMkJBQWUsWUFEbkI7QUFFSSwyQkFBZSxLQUZuQjtBQUdJLHVCQUFXLENBQ1A7QUFDSSx1QkFBTztBQURYLGFBRE8sRUFJUDtBQUNJLDhCQUFjLENBQUM7QUFEbkIsYUFKTyxFQU9QO0FBQ0ksNkJBQWE7QUFEakIsYUFQTyxFQVVQO0FBQ0ksOEJBQWM7QUFEbEIsYUFWTztBQUhmLFNBbktZOztBQUpvRCxLQUFwRCxDQUFaO0FBNkxBLFFBQUlDLFNBQVMsSUFBSVIsT0FBT0MsSUFBUCxDQUFZUSxNQUFoQixDQUF1QjtBQUNoQ0Msa0JBQVVkLElBRHNCO0FBRWhDRyxhQUFLQTtBQUYyQixLQUF2QixDQUFiO0FBSUgiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcl9fd3JhcHBlcicpO1xyXG4gICAgbG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2pzJyk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XHJcblxyXG5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnanMnKTtcclxuICAgXHJcblxyXG5cclxufSxmYWxzZSk7XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuICAgIGNvbnN0IGNvcmQgPSB7IGxhdDogNTEuMDgxNjQ2LCBsbmc6IDE3LjAzODE4NCB9O1xyXG4gICAgXHJcbiAgICBjb25zdCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgIHpvb206IDE3LFxyXG4gICAgICAgIGNlbnRlcjogY29yZCxcclxuICAgICAgICB0aXRsZTogJ1dyb2PFgmF3JyxcclxuICAgICAgICBzdHlsZXM6IFtcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjN2ZjOGVkXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IDU1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IC02XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiIzdmYzhlZFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiA1NVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAtNlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiM4M2NlYWRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAtMTVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZjNmNGY0XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC04NFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiA1OVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjYmJiYmJiXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMjZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiI2ZmY2MwMFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiAxMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogLTM1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZmZjYzAwXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IDEwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAtMjJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnNjaG9vbFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNkN2U0ZTRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogLTYwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDIzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXVxyXG5cclxuXHJcbiAgICB9KTtcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBwb3NpdGlvbjogY29yZCxcclxuICAgICAgICBtYXA6IG1hcFxyXG4gICAgfSk7XHJcbn0iXX0=
