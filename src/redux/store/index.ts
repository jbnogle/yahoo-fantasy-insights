import { CredentialState } from "../reducers/types";
import { combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";

export interface ApplicationState {
  credentials: CredentialState;
}

export const createRootReducer = () =>
  combineReducers({
    credentials: authReducer
  }) as any;
