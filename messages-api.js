const express = require("express");

const app = express();
const port = 3000;

//body-parser
const bodyParser = require("body-parser");
const bodyParserMiddleware = bodyParser.json();
app.use(bodyParserMiddleware);

//Limit middleware
const limit = 5;
let reqLeft = limit
const sendLimitMiddleware = (req, res, next) => {
  if (!reqLeft) {
    res.status(429).end();
  } else {
    reqLeft -= 1;
    next();
  }
};

app.post("/messages", sendLimitMiddleware, (req, res, next) => {
  if (!req.body.text) {
    res.status(400).end();
  }

  console.log("TEXT received: ", req.body.text);
  res.json({
    message: "Message received loud and clear"
  });
});

app.listen(port, () => console.log("Listening on port", port));
