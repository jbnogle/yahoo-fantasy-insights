import { action } from "typesafe-actions";
import * as actions from "../constants/authActionTypes";

export const getAccessToken = () => action(actions.GET_CREDENTIALS);

export const getAccessTokenSuccess = (token: any) =>
  action(actions.GET_CREDENTIALS_SUCCESS, token);

export const getAccessTokenError = (error: any) =>
  action(actions.GET_CREDENTIALS_ERROR, error);
