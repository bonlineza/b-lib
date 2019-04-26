/** @format */

import React from 'react';

class SwitchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeViewType: this.props.views
        .filter(v => v.active === true)
        .reduce((pv, cv) => cv.type, ''),
      showOptions: this.props.views.length > 1,
    };
  }

  switchActiveView = type => () =>
    this.setState({
      activeViewType: type,
    });

  render() {
    return (
      <div className="switch-view">
        {this.state.showOptions ? (
          <div className="switch-view__item">
            {this.props.views.map((view, k) => (
              <span className="" key={k}>
                <button
                  type="button"
                  className="btn--inverse--base-lt"
                  onClick={this.switchActiveView(view.type)}>
                  {view.label}
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="align--center" />
        )}
        <div>
          {React.cloneElement(
            this.props.children
              .filter(child => child.props.type === this.state.activeViewType)
              .reduce((pv, cv) => cv, null),
            {
              switchViewActive: true,
            },
          )}
        </div>
      </div>
    );
  }
}

export default SwitchView;
