import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_MESSAGE,
} from "./types";

import MsTrackerService from "../services/msTracker.service";

export const msRegister = (msName, isProfReq, isPtRequired) => (dispatch) => {
  return MsTrackerService.register(msName, isProfReq, isPtRequired).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
