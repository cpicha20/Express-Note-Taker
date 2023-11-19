const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

app.get("/api/notes", (req, res) =>
  fs.readFile("./db/db.json", function (err, data) {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(JSON.parse(data));
  })
);

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) {
      return res.status(500).json(err);
    }
    let database = JSON.parse(data);
    console.log(req.body);
    database.push({...req.body,id:uuidv4()});
    fs.writeFile("./db/db.json", JSON.stringify(database), function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ message: "Note was saved." });
    });
    // res.json(JSON.parse(data));
  });
});

app.delete("/api/notes/:id", (req, res) => {
console.log(req.params.id);
let database = JSON.parse(data);


});

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
