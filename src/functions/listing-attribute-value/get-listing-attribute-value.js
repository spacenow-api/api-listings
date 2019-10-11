const listingAttributeValueService = require('../../services/listing-attribute-value.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { id } = event.pathParameters
  context.callbackWaitsForEmptyEventLoop = false
  listingAttributeValueService
    .getListingAttributeValue(id)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}