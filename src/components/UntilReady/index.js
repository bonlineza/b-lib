import React from 'react';

type PropsShape = {
  /** all jsx that this component has wrapped */
  children: any,
  /** when true display `children`, over-rides `waiting` */
  ready: boolean,
  /** when true display some waiting text */
  waiting: boolean,
  /** fallback text for if `!waiting && !ready` */
  notReadyOrWaitingText?: string, // fallback for if !waiting && !ready
  /** Function that render custom component that acts as loader */
  loadingRenderer?: Function,
  /** css class given to root div of this component. All child css classes will
   * have `baseClass` prepended to it */
  baseClass?: string,
};

/**
 * UntilReady can be used to control the display of a loading state in a standardised way
 * this component has been largely replaced by 'PageReady' as it also abstracts the request handling
 */
const UntilReady = ({
  children,
  ready,
  waiting,
  notReadyOrWaitingText,
  loadingRenderer,
  baseClass,
}: PropsShape): React$Element<*> => (
  <div className={baseClass}>
    {ready
      ? // is ready
        children
      : // is not ready
        (waiting && (
          <div className={`${baseClass}__container`}>{loadingRenderer()}</div>
        )) || <div className="align--center">{notReadyOrWaitingText}</div>}
  </div>
);

UntilReady.defaultProps = {
  notReadyOrWaitingText: 'Error completing request',
  loadingRenderer: () => 'loading',
  baseClass: 'until-ready',
};

export default UntilReady;
