/** @format */

// @flow

import React from 'react';
import GetSvg from 'components/GetSvg';
import { withRouter } from 'react-router-dom';

type PropsShape = {
  title: string,
  svg: string,
  url: string,
  isLink: boolean,
  history: Object,
};

class MapMarker extends React.Component<PropsShape> {
  clickHandler = e => {
    if (e) {
      e.preventDefault();
    }

    if (this.props.isLink) {
      this.props.history.push(this.props.url);
    }

    return false;
  };

  render() {
    return (
      <div
        className={`map-marker${this.props.title ? '--tooltip' : ''}`}
        onClick={this.clickHandler}
        role="presentation"
        onKeyPress={this.clickHandler}>
        <GetSvg svg={this.props.svg} wrapperClass="map-marker__icon" />
        {this.props.title && (
          <span className="map-marker__text">{this.props.title}</span>
        )}
      </div>
    );
  }
}

export default withRouter(MapMarker);
