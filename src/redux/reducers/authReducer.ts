import { AuthAction, CredentialState } from "./types";
import {
  GET_CREDENTIALS,
  GET_CREDENTIALS_SUCCESS,
  GET_CREDENTIALS_ERROR
} from "../constants";

const initialCredState: CredentialState = {
  pending: false,
  completed: false,
  data: {
    refresh_token: "",
    access_token: ""
  },
  error: null
};

export const authReducer = (
  state: CredentialState = initialCredState,
  action: AuthAction
) => {
  switch (action.type) {
    case GET_CREDENTIALS:
      return {
        ...state,
        pending: true
      };
    case GET_CREDENTIALS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        completed: true
      };
    case GET_CREDENTIALS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
        completed: true
      };
    default:
      return state;
  }
};
