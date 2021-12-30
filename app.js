const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

let taskList = ["Go shopping", "Send contract"];
let workList = ["Send contract"];
let path = "";

app.get("/", (req, res) => {
  const today = new Date();
  const option = {
    weekday: "long",
    day: "numeric",
    month: "short",
    // year: "numeric",
  };
  const day = today.toLocaleString("en-Us", option);
  path = "/";
  res.render("./list", { heading: day, list: taskList, path });
});

app.post("/", (req, res) => {
  const newTask = req.body.task;
  taskList.push(newTask);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  path = "/work";
  res.render("./list", { heading: "Work List", list: workList, path });
});

app.post("/work", (req, res) => {
  const newTask = req.body.task;
  taskList.push(newTask);
  workList.push(newTask);
  res.redirect("/work");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
