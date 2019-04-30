/**
 * This Lambda function is used as an LWA authorizer. If the given token is valid, then access
 * to the requested resource is allowed. If not, then access is denied.
 * An authorizer response has to look like this (taken from AWS documentation):
{
  "principalId": "yyyyyyyy", // The principal user identification associated with the token sent by the client.
  "policyDocument": {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "execute-api:Invoke",
        "Effect": "Allow|Deny",
        "Resource": "arn:aws:execute-api:{regionId}:{accountId}:{appId}/{stage}/{httpVerb}/[{resource}/[{child-resources}]]"
      }
    ]
  },
  "context": {
    "stringKey": "value",
    "numberKey": "1",
    "booleanKey": "true"
  },
  "usageIdentifierKey": "{api-key}"
}

 */

const profile = require("./helpers/profile");
const policy = require("./helpers/policy");

exports.handler = function(event, context, callback) {
  var token = event.authorizationToken;
  // call amazon LWA profile endpoint with token
  profile(token)
    .then(json => {
      // if successfull generate a Allow response and set user context
      const response = policy(json.user_id, "Allow", event.methodArn);
      response.context = {
        userId: json.user_id,
        name: json.name,
        email: json.email
      };
      callback(null, response);
    })
    .catch(() => {
      // if anything goes wrong => deny access
      callback(null, policy("unauthorized", "Deny", event.methodArn));
    });
};
