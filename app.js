const express = require("express");
const date = require("./date");
const _ = require("lodash");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.locals._ = _;

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.error(error));

const todoSchema = {
  task: {
    type: String,
    required: true,
  },
  list: String, //general or work, home,...
  checked: String, //on or ''
};

const listSchema = {
  name: {
    type: String,
    required: true,
  },
};

const Todo = mongoose.model("Todo", todoSchema);
const List = mongoose.model("List", listSchema);

app.get("/", async (req, res) => {
  try {
    const day = date.getDate();
    const todoList = await Todo.find();
    const taskList = await List.find();
    res.render("./list", { heading: day, path: "/", todoList, taskList });
  } catch (error) {
    console.error(error);
  }
});

app.get("/category/:list", async (req, res) => {
  try {
    const listHeading = _.capitalize(_.lowerCase(req.params.list));
    const listUrl = _.kebabCase(_.lowerCase(req.params.list));
    const foundList = await List.findOne({ name: listHeading });
    if (foundList) {
      const todoList = await Todo.find({ list: listUrl });
      const taskList = await List.find();
      res.render("./list", {
        heading: `${listHeading} List`,
        path: listUrl,
        todoList,
        taskList,
      });
    } else {
      res.send("Task list not found!");
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/", async (req, res) => {
  const newTask = req.body.task;
  const path = req.body.path;
  try {
    if (path === "/") {
      const newTodo = new Todo({
        task: newTask,
        list: "general",
        checked: "",
      });
      await newTodo.save();
      console.log("Added task successfully!");
      res.redirect("/");
    } else {
      const newTodo = new Todo({
        task: newTask,
        list: path,
        checked: "",
      });
      await newTodo.save();
      console.log("Added task successfully!");
      res.redirect(`/category/${path}`);
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/list", async (req, res) => {
  const listName = _.capitalize(_.lowerCase(req.body.list));
  const path = req.body.path;
  try {
    const foundList = await List.findOne({ name: listName });
    if (!foundList) {
      const newList = new List({ name: listName });
      await newList.save();
      console.log("List was created successfully!");
      if (path === "/") {
        res.redirect("/");
      } else {
        res.redirect(`/category/${path}`);
      }
    } else {
      res.send("This list existed!");
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  const path = req.body.path;
  try {
    await Todo.findByIdAndRemove(id);
    if (path === "/") {
      res.redirect("/");
    } else {
      res.redirect(`/category/${path}`);
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/check", async (req, res) => {
  const id = req.body.id;
  const path = req.body.path;
  let check;
  if (req.body.check) {
    checked = "checked";
  } else {
    checked = "";
  }
  try {
    await Todo.findByIdAndUpdate(id, { checked });
    if (path === "/") {
      res.redirect("/");
    } else {
      res.redirect(`/category/${path}`);
    }
  } catch (error) {
    console.error(error);
  }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
