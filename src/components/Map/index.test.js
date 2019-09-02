import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import Map from './index';

const MapMarker = ({ title }) => (
  <div className="map-marker">
    <span>{title}</span>
  </div>
);

const defaultProps = {
  markers: [
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
  ],
  markerClass: MapMarker,
  initialSize: {
    width: 800, // Map width in pixels
    height: 350, // Map height in pixels
  },
  width: '100%',
  height: '100%',
};

const setup = props => mount(<Map {...defaultProps} {...props} />);

describe('Map', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('without error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('2x MapMarkers', () => {
      expect(wrapper.find('MapMarker').length).toBe(2);
    });
    it('First Marker will contain text `Marker 1`', () => {
      expect(
        wrapper
          .find('MapMarker')
          .first()
          .text(),
      ).toBe(defaultProps.markers[0].title);
    });
    it('Initial size will be set to 0 due to lack of parent size compute', () => {
      expect(wrapper.instance().size.width).not.toBe(
        defaultProps.initialSize.width,
      );
      expect(wrapper.instance().size.height).not.toBe(
        defaultProps.initialSize.width,
      );
    });
    it('MapContainer will have 100% width/height to fill', () => {
      expect(wrapper.instance().mapContainer.current.style.width).toBe(
        defaultProps.width,
      );
      expect(wrapper.instance().mapContainer.current.style.height).toBe(
        defaultProps.height,
      );
    });
  });

  describe('Behaviour', () => {
    it('calling zoomAndCenter will apply new center/zoom state', () => {
      const { zoom: initalZoom, center: initialCenter } = wrapper.state();
      // no 'mapLoaded' event is fired here so trigger function manually
      wrapper.instance().zoomAndCenter(defaultProps.markers);
      expect(initalZoom).not.toBe(wrapper.state().zoom);
      expect(initialCenter).not.toBe(wrapper.state().center);
    });
  });
});
