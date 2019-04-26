/** @format */

// @flow

import React from 'react';
import GoogleMap from 'google-map-react';

import mapConfig from './mapConfig.js';
import findZoomAndCenter from './findZoomAndCenter.js';
import MapMarker from './MapMarker.js';

type MapComponentTypes = {
  /* eslint-disable react/no-unused-prop-types */
  center?: {
    lat: number,
    lng: number,
  },
  zoom?: number,
  markers: Array<{
    lat: number | string,
    lng: number | string,
    name: string,
    isLink?: boolean,
    url?: string,
  }>,
  mapConfig: Object,
};

class MapComponent extends React.Component {
  static defaultProps = {
    mapConfig,
    center: { lat: 47.3773697, lng: 8.3966319 },
    zoom: 10,
    markers: [],
    size: {
      width: 800, // Map width in pixels
      height: 350, // Map height in pixels
    },
  };

  constructor(props: MapComponentTypes) {
    super(props);
    this.state = {
      center: props.center,
      zoom: props.zoom,
      markers: props.markers,
      size: props.size,
      hasError: false,
      error: '',
    };
    this.size = props.size;
    this.onMapLoaded = this.onMapLoaded.bind(this);
  }

  componentDidMount() {
    this.size = {
      height: this.mapContainer.offsetHeight,
      width: this.mapContainer.offsetWidth,
    };
  }

  componentWillReceiveProps(nextProps: Object) {
    if (
      nextProps.markers.length > 0 &&
      nextProps.markers.length !== this.state.markers.length
    ) {
      this.zoomAndCenter(nextProps.markers);
    }
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true, error: info });
  }

  // state may have changed during a map load - so check them markers here too
  onMapLoaded(): any {
    if (this.state.markers.length) {
      this.zoomAndCenter(this.state.markers);
    }
  }

  zoomAndCenter = markers => {
    const { center, zoom } = findZoomAndCenter({ size: this.size }, markers);
    this.setState({
      ...this.state,
      center,
      zoom,
      markers,
    });
  };

  render(): React$Element<*> {
    return (
      <div
        ref={(container: any): any => {
          this.mapContainer = container;
        }}
        style={{ width: '100%', height: '100%' }}>
        <GoogleMap
          bootstrapURLKeys={{
            key: mapConfig.GOOGLE_MAPS_API_KEY,
          }}
          zoom={this.state.zoom}
          center={this.state.center}
          options={this.props.mapConfig.options}
          onGoogleApiLoaded={this.onMapLoaded}
          yesIWantToUseGoogleMapApiInternals>
          {this.state.markers && this.state.markers.length
            ? this.state.markers.map(
                (item: Object, index: number): void => (
                  <MapMarker
                    title={item.street || ''}
                    lat={item.lat}
                    lng={item.lng}
                    key={index}
                    svg={item.color ? `map_pin_${item.color}` : 'map_pin_red'}
                    isLink={!!item.isLink}
                    url={item.url || ''}
                  />
                ),
              )
            : null}
        </GoogleMap>
      </div>
    );
  }
}
export default MapComponent;
