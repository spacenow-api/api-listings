const listingAmenityService = require('../../services/listing-amenity.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { listingId } = event.pathParameters
  const { pageIndex = 0, pageSize = 10 } = event.queryStringParameters
  context.callbackWaitsForEmptyEventLoop = false
  listingAmenityService
    .getListingAmenities(listingId, pageIndex, pageSize)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}