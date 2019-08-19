const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2FudGFjbGF1c2hnIiwiYSI6ImNqemRrbnJ2NjA3Z3ozbXFqbHpoa3ltMmYifQ.Yh6wlC_gzKLSK7Uo8hqbbg&limit=1`;
  request({ url: url, json: true }, (error, response, { features }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { center, place_name } = features[0];
      const [latitude, longitude] = center;
      callback(undefined, {
        latitude,
        longitude,
        location: place_name
      });
    }
  });
};

module.exports = geocode;
