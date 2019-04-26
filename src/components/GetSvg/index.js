/** @format */

// @flow

import React from 'react';
import { connect } from 'react-redux';

import manifest from 'helpers/manifest';

import { fetchSvgFromStorage } from './actions';

// svgs stored in svg sprite
// const svgList = [
//   'angle_down',
//   'angle_left',
//   'angle_right',
//   'angle_up',
//   'building',
//   'caret_down',
//   'circle_check',
//   'circle_clear',
//   'circle_info',
//   'circle_minus',
//   'circle_plus',
//   'circle_section',
//   'circle_user',
//   'close',
//   'contractor',
//   'dashboard',
//   'eagle',
//   'filter_menu',
//   'filter',
//   'house',
//   'job',
//   'menu',
//   'object',
//   'scale',
//   'search',
//   'settings',
//   'star_empty',
//   'star_full',
//   'thumbs_up',
//   'user',
//   'view',
//   'loading',
//   'lock',
//   'job_slanted',
//   'triangle_ex',
//   'map_pin_blue',
//   'map_pin_red',
//   'add_file',
//   'download',
//   'sort_up',
//   'sort_down',
//   'file',
//   'archive',
//   'nominee',
//   'spin',
//   'symbol-file',
// ];

// svgs that should be requested seperately
const loadableSvgs = ['spin', 'loading', 'barcode_file'];

type ReduxStateShape = {
  svgPointer: any,
};

type ReduxActionShape = {
  fetchSvg: Function,
};

type PropsShape = {
  svgPointer?: string,
  title?: string,
  svg: string,
  wrapperClass?: string,
  fetchSvg?: Function,
} & ReduxStateShape &
  ReduxActionShape;

type StateShape = PropsShape;

class GetSvg extends React.Component<PropsShape, StateShape> {
  static defaultProps = {
    wrapperClass: '',
    title: '',
    svg: '',
    svgPointer: '',
  };

  constructor(props: PropsShape) {
    super(props);
    this.state = {
      ...props,
    };
  }
  state: PropsShape;

  componentWillMount() {
    this.getSvgProcess();
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.svg !== this.props.svg) {
      this.getSvgProcess('symbol-file');
    }

    this.setState(
      (prevState: PropsShape): PropsShape => ({
        ...prevState,
        wrapperClass: nextProps.wrapperClass,
      }),
    );
  }

  shouldComponentUpdate(nextProps: Object): boolean {
    return (
      nextProps.wrapperClass !== this.state.wrapperClass ||
      nextProps.svg !== this.props.svg ||
      nextProps.svgPointer !== this.props.svgPointer
    );
  }

  getSvgProcess = (): boolean => {
    if (this.isLoadable(this.props.svg)) {
      this.props.fetchSvg(this.props.svg);
    }

    return true;
  };

  svgSymbols = `/svgs/${manifest('/svg-symbols.svg')}`;

  isLoadable = (svg: string): boolean => loadableSvgs.includes(svg);

  render(): React$Element<*> {
    return (
      <span className={`icon ${this.state.wrapperClass}`}>
        {this.isLoadable(this.props.svg) ? (
          <span
            title={this.props.title}
            className="icon__inner"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: this.props.svgPointer }}
          />
        ) : (
          <span title={this.props.title} className="icon__inner">
            <svg className="icon" aria-hidden="true" focusable="false">
              <use xlinkHref={`${this.svgSymbols}#${this.props.svg}`} />
            </svg>
          </span>
        )}
      </span>
    );
  }
}

const mapState = (
  state: Object,
  { svg }: { svg: string },
): ReduxStateShape => ({
  svgPointer: state.svgStore[svg],
});

const mapActions = (dispatch: Function): ReduxActionShape => ({
  fetchSvg(svgName: string): any {
    return fetchSvgFromStorage(svgName, dispatch);
  },
});

export default connect(
  mapState,
  mapActions,
)(GetSvg);
