import { ActionType } from "typesafe-actions";
import * as AuthActions from "../actions/authActions";

export type AuthAction = ActionType<typeof AuthActions>;

export type CredentialState = {
  readonly pending: boolean;
  readonly completed: boolean;
  readonly data: any;
  readonly error: any;
};
