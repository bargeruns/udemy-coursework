const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Zip code or street address to check weather.',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.a);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Address not found.')
    }
    let location = {lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng};
    let weatherURL = `https://api.darksky.net/forecast/d04e68fe2fc67492a6822f2b78332c00/${location.lat},${location.lng}`;
    return axios.get(weatherURL)
  })
  .then((response) => {
    let temp = response.data.currently.temperature;
    let feel = response.data.currently.apparentTemperature;
    console.log(`It feels like ${feel} degrees outside.`);
  })
  .catch((error) => {
    if (error.code === 'ENOTFOUND') {
      return console.log('Could not connect to API');
    }
    console.log(error);
  });
