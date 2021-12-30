const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

var taskList = ["Buy food", "Cook food", "Eat food"];

app.get("/", (req, res) => {
  const today = new Date();
  const option = {
    weekday: "long",
    day: "numeric",
    month: "short",
    // year: "numeric",
  };
  const day = today.toLocaleString("en-Us", option);
  res.render("./list", { day, taskList });
});

app.post("/", (req, res) => {
  const newTask = req.body.task;
  taskList.push(newTask);
  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
