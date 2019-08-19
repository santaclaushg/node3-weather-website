const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/7054b9c017f274ed5c86ad97d2cc0442/${latitude},${longitude}`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, precipProbability } = body.currently;
      const { summary } = body.daily.data[0];
      callback(
        null,
        `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability} chance of rain`
      );
    }
  });
};

module.exports = forecast;
