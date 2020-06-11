const express = require("express");
const axios = require("axios");
const qs = require("qs");

const endpoints = require("./endpoints");
const config = require("./config");

const juicedBallsTestData = require("./test-data-juiced-balls");

const app = express();
const port = process.env.PORT || 5000;

const authHeader = Buffer.from(
  `${config.CONSUMER_KEY}:${config.CONSUMER_SECRET}`,
  `binary`
).toString(`base64`);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/express_backend", (req, res) => {
  let responseMessage = "YOUR EXPRESS BACKEND IS CONNECTED TO REACT ";
  if (req.query.auth_code) {
    responseMessage += req.query.auth_code;
  }
  res.send({ express: responseMessage });
});

app.get("/auth-token", (req, res) => {
  console.log(config);
  axios({
    url: endpoints.auth,
    method: "post",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36",
    },
    data: qs.stringify({
      client_id: config.CONSUMER_KEY,
      client_secret: config.CONSUMER_SECRET,
      redirect_uri: "oob",
      code: config.YAHOO_AUTH_CODE,
      grant_type: "authorization_code",
    }),
  })
    .then((credentials) => {
      res.send({ credentials: credentials });
    })
    .catch((err) => {
      console.log(err);
      res.send({ credentials: null });
    });
});

app.get("/auth/yahoo", function (req, res) {
  var authorizationUrl = "https://api.login.yahoo.com/oauth2/request_auth";

  var queryParams = qs.stringify({
    client_id: config.CONSUMER_KEY,
    redirect_uri: "https://fbc09e56.ngrok.io/auth/yahoo/callback",
    response_type: "code",
  });

  res.redirect(authorizationUrl + "?" + queryParams);
});

app.get("/auth/yahoo/callback", function (req, res) {
  var queryParams = qs.stringify({
    auth_code: req.query.code,
  });
  res.redirect("/express_backend" + "?" + queryParams);
});

app.get("/teams/:teamId/players", function (req, res) {
  var teamId = req.params.teamId;

  if (teamId === "juiced-balls") {
    res.send({ data: juicedBallsTestData.testData });
  } else {
    res.send({ error: "Error" });
  }
});
