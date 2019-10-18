const listingService = require('../../services/listing.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const user = JSON.parse(event.requestContext.authorizer.user);
  const { id } = event.pathParameters
  context.callbackWaitsForEmptyEventLoop = false
  listingService
    .unpublishListing(id, user)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}