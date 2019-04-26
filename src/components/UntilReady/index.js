/** @format */

// @flow
import React from 'react';
import GetSvg from '../../components/GetSvg';
import l from '../../helpers/locale';

type PropsShape = {
  children: any,
  ready: boolean, // when true display children, over-rides waiting
  waiting: boolean, // when true display some waiting text
  notReadyOrWaitingText?: string, // fallback for if !waiting && !ready
};

const UntilReady = ({
  children,
  ready,
  waiting,
  notReadyOrWaitingText,
}: PropsShape): React$Element<*> => (
  <div className="until-ready">
    {ready
      ? // is ready
        children
      : // is not ready
        (waiting && (
          <div className="until-ready__container">
            <GetSvg svg="loading" wrapperClass="until-ready__loading" />
          </div>
        )) || <div className="align--center">{notReadyOrWaitingText}</div>}
  </div>
);

UntilReady.defaultProps = {
  notReadyOrWaitingText: l('RESULT-ERROR-retrieving_data'),
};

export default UntilReady;
