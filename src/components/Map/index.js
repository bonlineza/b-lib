import React, { createRef } from 'react';
import GoogleMap from 'google-map-react';
import findZoomAndCenter from './findZoomAndCenter.js';

/**
 * Example:
 *
  <MapComp
    markerClass={MapMarker}
    markers={[
      ...data.map.jobs.map((item, index) => ({
        key: index,
        title: item.street,
        lat: item.lat,
        lng: item.lng,
        svg: 'map_pin_blue',
      })),
    ]}
  />
 */
type MapTypes = {
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
  mapConfig?: Object,
  markerClass: Object,
  width?: string,
  height?: string,
};

class Map extends React.Component {
  static defaultProps = {
    apiKey: '',
    apiOptions: {},
    center: { lat: 47.3773697, lng: 8.3966319 },
    zoom: 10,
    markers: [],
    initialSize: {
      width: 800, // Map width in pixels
      height: 350, // Map height in pixels
    },
    markerMapper: item => item,
    width: '100%',
    height: '100%',
  };

  constructor(props: MapTypes) {
    super(props);
    this.state = {
      center: props.center,
      zoom: props.zoom,
      hasError: false,
      error: '',
    };
    this.size = props.initialSize;
    this.onMapLoaded = this.onMapLoaded.bind(this);
    this.mapContainer = createRef();
  }

  componentDidMount() {
    this.size = {
      height: this.mapContainer.current.offsetHeight,
      width: this.mapContainer.current.offsetWidth,
    };
  }

  componentWillReceiveProps(nextProps: Object) {
    if (
      nextProps.markers.length > 0 &&
      nextProps.markers.length !== this.props.markers.length
    ) {
      this.zoomAndCenter(nextProps.markers);
    }
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true, error: info });
  }

  // state may have changed during a map load - so check them markers here too
  onMapLoaded(): any {
    if (this.props.markers.length) {
      this.zoomAndCenter(this.props.markers);
    }
  }

  zoomAndCenter = markers => {
    const { center, zoom } = findZoomAndCenter({ size: this.size }, markers);
    this.setState({
      ...this.state,
      center,
      zoom,
    });
  };

  render(): React$Element<*> {
    const {
      markers,
      markerClass: MapMarker,
      width,
      height,
      apiKey,
      apiOptions,
    } = this.props;
    const { zoom, center } = this.state;
    return (
      <div ref={this.mapContainer} style={{ width, height }}>
        <GoogleMap
          bootstrapURLKeys={{
            key: apiKey,
          }}
          zoom={zoom}
          center={center}
          options={apiOptions}
          onGoogleApiLoaded={this.onMapLoaded}
          yesIWantToUseGoogleMapApiInternals>
          {markers && markers.length
            ? markers.map((item: Object, index: number): void => (
                <MapMarker key={index} {...item} />
              ))
            : null}
        </GoogleMap>
      </div>
    );
  }
}
export default Map;
