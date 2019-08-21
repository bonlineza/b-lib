/** @format */

export type RequestShape = {
  fetching: boolean,
  failed: boolean,
  success: boolean,
  payload: any,
};

const request: RequestShape = {
  fetching: false,
  failed: false,
  success: false,
  payload: null,
};

export { request };

export default request;
