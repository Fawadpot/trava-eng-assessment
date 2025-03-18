const express = require("express");
const usersRoutes = require("./src/routes/users");
const cors = require("cors");
const generate8DigitAlphanumericHash = require("./src/utils/generateHash");

const app = express();
const PORT = process.env.PORT || 5000;
const routes = {};

app.use(cors());
app.use(express.json());

const hashQueryMiddleware = (req, res, next) => {
  if ("hash" in req.query) {
    let queryObj = Object.fromEntries(
      new URLSearchParams(routes[req.query.hash])
    );
    console.log(queryObj);
    req["query"] = queryObj;
  }
  next();
};

app.use("/api", hashQueryMiddleware, usersRoutes);

app.post("/api/url/shorten", async (req, res) => {
  try {
    let url = req.body.url;
    let hash = req.body.url;
    let newHash = generate8DigitAlphanumericHash();
    if (hash in routes) {
      routes[hash] = url;
      return res.status(200).json(hash);
    } else {
      routes[newHash] = url;
      return res.status(200).json(newHash);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
