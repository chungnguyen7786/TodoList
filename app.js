const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.get("/", (req, res) => {
  const today = new Date();
  const currentDay = today.getDay();
  var day;
  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log(`Error: current day is equal to ${currentDay}`);
  }
  res.render("./list", { day });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
