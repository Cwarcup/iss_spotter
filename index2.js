const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    passTimes.forEach(passTime => {
      const date = new Date(passTime.risetime * 1000);
      const duration = passTime.duration;
      console.log(`Next pass at ${date} for ${duration} seconds!`);
    });
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });