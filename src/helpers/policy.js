/**
 * Helper function to create a IAM policy to deny or allow access to given resource.
 */
module.exports = (principalId, effect, resource) => {
  const authResponse = {
    principalId
  };
  if (effect && resource) {
    authResponse.policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource
        }
      ]
    };
  }
  return authResponse;
};
