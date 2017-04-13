const request = require('request');
const geocodeAddress = (address) => {
  const encodedAddress = encodeURIComponent(address);
  return new Promise((resolve, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      debugger
      if (error) {
        return reject(error);
      }
      if (!body.results.length) {
        return reject(`Address not found`)
      }
      let {formatted_address, geometry} = body.results[0];
      resolve({address: formatted_address, lat: geometry.location.lat, lng: geometry.location.lng});
    });
  });
};

geocodeAddress('80219')
  .then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
  }, (error) => {
    console.log('Error - ', error);
  });
