const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwhois.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (coords) => {
  const { latitude, longitude } = JSON.parse(coords);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => JSON.parse(data).response);
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };