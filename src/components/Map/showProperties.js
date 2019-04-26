/** @format */

// Loop through the results array and place a marker for each
// set of coordinates.
export function showProperties(map) {
  return properties => {
    const { google } = window;
    const blue = {
      url: 'https://vmp.allianz.ch/public_files/0027_map_pin_blue.png',
      // This marker is 20 pixels wide by 20 pixels high.
      size: new google.maps.Size(31, 31),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (10, 20).
      anchor: new google.maps.Point(16, 31),
    };

    const red = {
      url: 'https://vmp.allianz.ch/public_files/0027_map_pin_red.png',
      // This marker is 20 pixels wide by 20 pixels high.
      size: new google.maps.Size(31, 31),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (10, 20).
      anchor: new google.maps.Point(16, 31),
    };

    /* Shapes define the clickable region of the icon.
     * The type defines an HTML
     *
     * <area> element 'poly' which traces out a
     * polygon as a series of X,Y points.
     *
     * The final coordinate closes the poly by connecting
     * to the first coordinate.
     */
    const shape = {
      coords: [5, 1, 5, 31, 24, 31, 5, 1],
      type: 'poly',
    };

    const bounds = new google.maps.LatLngBounds();

    for (let i = 0; i < properties.length; i += 1) {
      const data = properties[i];
      const latLng = new google.maps.LatLng(data[0], data[1]);
      const marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: latLng,
        title: data[2],
        icon: i % 2 === 0 ? blue : red,
        shape,
        map,
      });
      bounds.extend(marker.position);
    }
    map.fitBounds(bounds);
  };
}
