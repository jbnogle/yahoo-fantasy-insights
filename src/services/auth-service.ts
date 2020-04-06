import axios from "axios";
import { Dispatch } from "react";
import { AuthAction } from "../redux/reducers/types";
import * as AuthActions from "../redux/actions/authActions";

// export async function readCredentials() {
//   try {
//     // If the credentials file exists
//     if (existsSync(config.AUTH_FILE)) {
//       try {
//         CREDENTIALS = JSON.parse(readFileSync(config.AUTH_FILE, "utf8"));
//       } catch (err) {
//         console.error(
//           `Error parsing credentials file ${config.AUTH_FILE}: ${err}.\n`
//         );
//         process.exit();
//       }
//     } else {
//       // Get initial authorization token
//       const newToken = await getInitialAuthorization();
//       if (newToken && newToken.data && newToken.data.access_token) {
//         // writeToFile(JSON.stringify(newToken.data), config.AUTH_FILE, "w");
//         CREDENTIALS = newToken.data;
//       }
//     }
//   } catch (err) {
//     console.error(`Error in readCredentials(): ${err}`);
//     process.exit();
//   }
// }

export function getCredentialsRequest() {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch(AuthActions.getAccessToken());
    try {
      // dispatch(AuthActions.getAccessTokenSuccess(credentials));
    } catch (error) {
      console.error("Error getting initial auth.");
      dispatch(AuthActions.getAccessTokenError(error));
    }
  };
}

export function refreshAuthorizationToken(token: any) {
  return axios({
    // url: auth,
    method: "post",
    headers: {
      // Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36"
    }
    // data: stringify({
    //   redirect_uri: "oob",
    //   grant_type: "refresh_token",
    //   refresh_token: token
    // })
  }).catch(err => {
    console.error(`Error in refreshAuthorizationToken(): ${err}`);
  });
}
