const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        return callback(`Received status ${response.statusCode} for address ${address}.`);
      }
      if (body.status === 'ZERO_RESULTS') {
        return callback(`Nothing found for address ${address}.`);
      }
      return callback(null, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      });
    });
}

module.exports = {
  geocodeAddress
}
