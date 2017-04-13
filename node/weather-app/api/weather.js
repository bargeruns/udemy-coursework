const request = require('request');

const currentTemp = (location, callback) => {
  request({
    url: `https://api.darksky.net/forecast/d04e68fe2fc67492a6822f2b78332c00/${location.lat},${location.lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      return callback(error);
    }
    if (response.statusCode !== 200) {
      return callback(`${response.statusCode} - ${response.statusMessage}`);
    }
    return callback(null, {
      summary: body.currently.summary,
      temp: body.currently.temperature,
      feel: body.currently.apparentTemperature
    });
  });
};

module.exports = {
  currentTemp
};
