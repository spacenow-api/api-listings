const listingAttributeService = require('../../services/listing-attribute.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { id, type } = event.pathParameters
  context.callbackWaitsForEmptyEventLoop = false
  listingAttributeService
    .putListingAttribute(id, JSON.parse(event.body), type)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}