# Amazon LWA authorizer for AWS API Gateway

This is a Lambda function that is used as an authorizer for an AWS API gateway using Amazon LWA. The authorizer calls Amazon LWA profile endpoint with the provided access token to see if it is valid. If so, then access is granted otherwise denied.

## NPM scripts

If you want to use node-lambda to test and deploy the Lambda function, you need to copy the file ".env-template" to ".env" and fill out the respective fields (Access Key, Secret, Role, Region etc.pp.).

- test: run jest for unit tests
- package: create zip that can be uploaded using AWS Console
- deployDev: create AWS Lambda function with "dev"-suffix and upload packaged zip
- deployProd: create AWS Lambda function with "prod"-suffix and upload packaged zip
- debugLambda: debug lambda function on port 9229 (see Chrome inspector or VS Code debugger)
- testLambda: run lamda function locally
