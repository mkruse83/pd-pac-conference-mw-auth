const AWSXRay = require("aws-xray-sdk");
const https = AWSXRay.captureHTTPs(require("https"));
/**
 * Call Amazon profile endpoint with given token.
 * @returns Promise that resolves if profile endpoint could be called successfully => token is valid.
 *    The promise rejects when there is an error (e.g. Token is not valid)
 */
module.exports = token => {
  // use header to set token to prevent token in URL
  const options = {
    host: "api.amazon.com",
    port: 443,
    path: "/user/profile",
    method: "GET",
    headers: { "x-amz-access-token": token }
  };

  return new Promise((resolve, reject) => {
    // use built-in https instead of a framework to reduce code injection through node modules
    https
      .get(options, resp => {
        let data = "";
        resp.on("data", chunk => {
          data += chunk;
        });

        resp.on("end", () => {
          console.log("end", JSON.parse(data));
          const result = JSON.parse(data);
          if (result.error) {
            reject(new Error(result.error));
          } else {
            resolve(result);
          }
        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
        reject(err);
      });
  });
};
