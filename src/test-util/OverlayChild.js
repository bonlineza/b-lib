import React from 'react';

export default props => (
  <div className="overlay-child" id={`overlay-child-${props.id}`}>
    Overlay Child {props.id}
    <button id="next-button" type="button" onClick={props.next}>
      Next Button
    </button>
    <button id="prev-button" type="button" onClick={props.prev}>
      Prev Button
    </button>
  </div>
);
