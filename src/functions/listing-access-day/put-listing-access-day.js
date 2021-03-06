const listingAccessDayService = require('../../services/listing-access-day.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { id } = event.pathParameters
  context.callbackWaitsForEmptyEventLoop = false
  listingAccessDayService
    .putListingAccessDay(id, JSON.parse(event.body))
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}