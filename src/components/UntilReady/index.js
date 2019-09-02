import React from 'react';

type PropsShape = {
  children: any,
  ready: boolean, // when true display children, over-rides waiting
  waiting: boolean, // when true display some waiting text
  notReadyOrWaitingText?: string, // fallback for if !waiting && !ready
  loadingRenderer?: Function,
  baseClass?: string,
};

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
