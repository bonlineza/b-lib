import React from 'react';
import { storiesOf } from '@storybook/react';
import Map from 'components/Map';
import Readme from '../docs/Map.md';

const mapOptions = {
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
          color: '#ff0000',
        },
      ],
    },
  ],
};

const MapMarker = ({ title }) => (
  <div
    style={{
      width: '3rem',
      height: '1rem',
      backgroundColor: 'black',
      color: 'white',
    }}>
    <span>{title}</span>
  </div>
);

const defaultMapItems = [
  {
    key: 1,
    title: 'Marker 1',
    lat: 13,
    lng: 13,
  },
  {
    key: 2,
    title: 'Marker 2',
    lat: 14,
    lng: 14,
  },
];

const defaultProps = {
  markers: defaultMapItems,
  markerClass: MapMarker,
  apiKey: process.env.STORYBOOK_MAPS_API_KEY,
};

const DefaultMap = props => <Map {...defaultProps} {...props} />;

storiesOf('Map', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Two Markers', () => <DefaultMap />)
  .add('Four Markers', () => (
    <DefaultMap
      markers={[
        ...defaultMapItems
          .concat({
            key: 3,
            title: 'Marker 3',
            lat: 16,
            lng: 16,
          })
          .concat({
            key: 4,
            title: 'Marker 4',
            lat: 36,
            lng: 36,
          }),
      ]}
    />
  ))
  .add('Map Options', () => <DefaultMap apiOptions={mapOptions} />);
