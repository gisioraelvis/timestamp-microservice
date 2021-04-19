const express = require("express");
const app = express();
const port = 5000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

const getTimestamp = (date) => ({
  unix: date.getTime(),
  utc: date.toUTCString(),
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:dateString?", (req, res) => {
  const dateString = req.params.dateString;
  let timestamp;

  if (dateString === undefined || dateString.trim() === "") {
    timestamp = getTimestamp(new Date());
  } else {
    const date = !isNaN(dateString)
      ? new Date(parseInt(dateString))
      : new Date(dateString);

    if (!isNaN(date.getTime())) {
      timestamp = getTimestamp(date);
    } else {
      timestamp = {
        error: "invalid date",
      };
    }
  }

  res.end(JSON.stringify(timestamp));
});

app.listen(process.env.PORT || port, () => {
  console.log(`App listening on port " ${port}`);
});
