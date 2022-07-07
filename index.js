const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  passTimes.forEach(passTime => {
    const date = new Date(passTime.risetime * 1000);
    const duration = passTime.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  });
});