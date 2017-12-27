const loader = document.querySelector('.loader__wrapper');
loader.classList.add('js');

function initMap() {
    const cord = { lat: 51.081646, lng: 17.038184 };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: cord,
        title: 'Wrocław',
        styles: [{
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                        "hue": "#7fc8ed"
                    },
                    {
                        "saturation": 55
                    },
                    {
                        "lightness": -6
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                        "hue": "#7fc8ed"
                    },
                    {
                        "saturation": 55
                    },
                    {
                        "lightness": -6
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                        "hue": "#83cead"
                    },
                    {
                        "saturation": 1
                    },
                    {
                        "lightness": -15
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                        "hue": "#f3f4f4"
                    },
                    {
                        "saturation": -84
                    },
                    {
                        "lightness": 59
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [{
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                        "hue": "#bbbbbb"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 26
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                        "hue": "#ffcc00"
                    },
                    {
                        "saturation": 100
                    },
                    {
                        "lightness": -35
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                        "hue": "#ffcc00"
                    },
                    {
                        "saturation": 100
                    },
                    {
                        "lightness": -22
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [{
                        "hue": "#d7e4e4"
                    },
                    {
                        "saturation": -60
                    },
                    {
                        "lightness": 23
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]


    });
    var marker = new google.maps.Marker({
        position: cord,
        map: map
    });
}
/*FUNCTIONS*/

const removeLoader = () => {
    loader.classList.add('scale-out-center');

    const loadertime = setTimeout(() => {
        loader.parentNode.removeChild(loader);
    clearTimeout(loadertime);
    }, 5000);

};

const addMenuScroll = () => {
    const listMenu = document.querySelectorAll('.list__link'),
        directionMenu = listMenu.href,
        menuArray = Array.from(listMenu);
    console.log(listMenu);

    menuArray.map((elem, index) => {

        elem.addEventListener('click', (e) => {
            e.preventDefault();
            const nameId = elem.hash.slice(1),
                target = document.getElementById(nameId);
            target.scrollIntoView({ behavior: 'smooth' });


        }, false);

    })

};
/*events*/

window.addEventListener('load', () => {

    removeLoader();
    addMenuScroll();





}, false);