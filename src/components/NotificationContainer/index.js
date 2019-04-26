/** @format */

// @flow

import React from 'react';
import m from 'moment';

export type NotificationShape = {
  subject: string,
  timestamp: number,
  message: string,
};

type PropsShape = {
  notifications: Array<NotificationShape>,
};

const NotificationContainer = ({
  notifications,
}: PropsShape): React$Element<*> => (
  <div className="notification-container">
    {(notifications &&
      notifications.length &&
      notifications.map(
        (v: NotificationShape, k: number): React$Element<*> => (
          <div className="notification-container__item" key={k}>
            <div className="notification-container__item__title">
              {m.unix(v.timestamp).format('LLL')} - {v.subject}
            </div>
            <div className="notification-container__item__body">
              {v.message}
            </div>
          </div>
        ),
      )) ||
      null}
  </div>
);

export default NotificationContainer;
