const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../../weather-app/utils/geocode");
const forecast = require("../../weather-app/utils/forecast");

const app = express();

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App!",
    name: "Andrew Mead"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Andrew Mead"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Andrew Mead",
    helpText: "This is some helpful text"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  const { address } = req.query;
  console.log(address);
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log("Error", error);
      }
      return res.send({
        address,
        location,
        forecastData
      });
    });
  });

  // return res.send({
  //   address: req.query.address,
  //   forecast: "It is raining",
  //   location: "Philadelphia"
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  return res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page is not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page is not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
