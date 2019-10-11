const listingCategoryService = require('../../services/listing-category.service')
const r = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { id } = event.pathParameters
  const { pageIndex = 0, pageSize = 10 } = event.queryStringParameters
  context.callbackWaitsForEmptyEventLoop = false
  listingCategoryService
    .getListingCategories(id, pageIndex, pageSize)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}