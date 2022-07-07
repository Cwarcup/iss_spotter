// main fetching function

// Makes a single API request to retrieve the user's IP address.
// Input:
//   - A callback (to pass back an error or the IP string)
// Returns (via Callback):
//   - An error, if any (nullable)
//   - The IP address as a string (null if error). Example: "162.245.144.188"
const request = require('request');

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    
    const data = JSON.parse(body);
    callback(null, data.ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    const parsedBody = JSON.parse(body);

    if (parsedBody.success === false) {
      const msg = `Status success was ${parsedBody.success}. Server message says: ${parsedBody.message}`;
      return callback(Error(msg), null);
    }

    const { latitude, longitude } = parsedBody;
    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };