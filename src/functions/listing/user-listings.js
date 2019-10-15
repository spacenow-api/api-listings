const listingService = require('../../services/listing.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { userId } = event.pathParameters
  context.callbackWaitsForEmptyEventLoop = false
  listingService
    .userListings(userId)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}