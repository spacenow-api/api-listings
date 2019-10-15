const listingService = require('../../services/listing.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { pageIndex = 0, pageSize = 10 } = event.queryStringParameters
  context.callbackWaitsForEmptyEventLoop = false
  listingService
    .getListings(pageIndex, pageSize)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}