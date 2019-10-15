const listingAttributeService = require('../../services/listing-attribute.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { id, type } = event.pathParameters
  context.callbackWaitsForEmptyEventLoop = false
  listingAttributeService
    .deleteListingAttribute(id, type)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}