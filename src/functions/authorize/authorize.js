"use strict";

const jwt = require('jsonwebtoken')
// const req = require('request');

const buildIAMPolicy = (userId, effect, resource, context) => {
  const policy = {
    principalId: userId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  };

  return policy;
};

module.exports.main = (event, context, callback) => {
  if (!event.authorizationToken) {
    return callback('Authentication token missing exception!');
  }

  if (!(event.authorizationToken.split(' ')[0].toLowerCase() === 'bearer' && event.authorizationToken.split(' ')[1])) {
    return callback('Authentication token missing exception!')
  }

  try {
    jwt.verify(event.authorizationToken.split(' ')[1], 'Spacenow', (err, decoded) => {
      if (err)
        return callback(err)

      // req.get(`http://localhost:6001/users/legacy/${decoded.id}`, null, (err, resp) => {
      //   if(err)
      //     return callback(err)
      //   console.log(resp)
      
      const authorizerContext = { user: JSON.stringify({ role: 'admin', id: decoded.id }) };
      return callback(null, buildIAMPolicy(decoded.id, 'Allow', event.methodArn, authorizerContext));
      // })

    });
  } catch (err) {
    return callback(err)
  }

}