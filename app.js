const express = require("express");
const date = require("./date");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

const taskList = ["Go shopping", "Send contract"];
const workList = ["Send contract"];
let path = "";

app.get("/", (req, res) => {
  const day = date.getDate();
  // const day = date.getDay();
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
