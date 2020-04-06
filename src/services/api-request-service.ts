import axios from "axios";
import { xml2json } from "xml-js";
import config from "../config";
import {
  refreshAuthorizationToken,
  getCredentialsRequest
} from "./auth-service";
import { store } from "../index";

export async function makeAPIrequest(url: string): Promise<any> {
  let response;
  await store.dispatch<any>(getCredentialsRequest());

  const credentialsState = store.getState().credentials.data;
  let access_token = credentialsState.access_token;
  let refresh_token = credentialsState.refresh_token;
  try {
    response = await axios({
      url: url,
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36"
      }
    });
    const jsonData = JSON.parse(xml2json(response.data));
    return jsonData;
  } catch (err) {
    if (
      err.response.data &&
      err.response.data.error &&
      err.response.data.error.description &&
      err.response.data.error.description.includes("token_expired")
    ) {
      const newToken = await refreshAuthorizationToken(refresh_token);
      if (newToken && newToken.data && newToken.data.access_token) {
        // CREDENTIALS = newToken.data;
        // writeToFile(JSON.stringify(newToken.data), config.AUTH_FILE, "w");
        return makeAPIrequest(
          url
          //newToken.data.access_token,
          //newToken.data.refresh_token
        );
      }
    } else {
      console.error(
        `Error with credentials in makeAPIrequest()/refreshAuthorizationToken(): ${err}`
      );
      process.exit();
    }
  }
}
