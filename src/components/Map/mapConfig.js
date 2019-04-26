/** @format */

export default {
  GOOGLE_MAPS_API_KEY:
    typeof window !== 'undefined' ? window.allianz_maps_key : '',
  options: {
    panControl: true,
    zoomControl: true,
    disableDefaultUI: true,
    mapTypeId: 'roadmap',
    gestureHandling: 'cooperative',
    styles: [
      {
        featureType: 'landscape.man_made',
        elementType: 'all',
        stylers: [
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'poi.attraction',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi.business',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi.government',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi.medical',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'all',
        stylers: [
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#b1cba4',
          },
        ],
      },
      {
        featureType: 'poi.place_of_worship',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi.school',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi.sports_complex',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit.line',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: [
          {
            lightness: '26',
          },
          {
            saturation: '74',
          },
          {
            color: '#a3bbdd',
          },
        ],
      },
    ],
  },
};
