const yargs = require('yargs');
const request = require('request');
const geocode = require('./api/geocode');
const weather = require('./api/weather');

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

geocode.geocodeAddress(argv.a, (error, results) => {
  console.log(`Looking up location ${argv.a}...`);
  if (error) {
    return console.log('Error fetching location data:', error);
  }
  let {address, lat, lng} = results;
  console.log(`Fetching weather for ${address}...`);
  weather.currentTemp({lat, lng}, (err, res) => {
    let {summary, feel} = res;
    if (err) {
      return console.log('Error fetching weather data:', err);
    }
    return console.log(`It's ${summary} outside, and feels like ${feel} degrees.`);
  });
});
