'use strict'

const { ListingCategory } = require('../../db/models')
const paginate = require('../helpers/paginate.utils')

const getListingCategories = async (id, pageIndex = 0, pageSize = 10) => {
  const where = { ...paginate(pageIndex, pageSize), where: { listingId: id } }
  try {
    const data = await ListingCategory.findAndCountAll(where)
    return data
  } catch (error) {
    throw error
  }
}

const getListingCategory = async (id) => {
  const where = { where: { id } }
  try {
    const data = await ListingCategory.findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const postListingCategory = async (value) => {
  try {
    const data = await ListingCategory.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const putListingCategory = async (id, value) => {
  try {
    const valueToUpdate = await ListingCategory.findOne({ where: { id } });
    if (!valueToUpdate) throw new Error(`Listing Category ${id} not found.`);
    await ListingCategory.update(value, { where: { id } })
    return Object.assign(valueToUpdate, value)
  } catch (error) {
    throw error
  }
}

const deleteListingCategory = async (id) => {
  try {
    const valueToUpdate = await ListingCategory.findOne({ where: { id } });
    if (!valueToUpdate) throw new Error(`Listing Category ${id} not found.`);
    await ListingCategory.delete({ where: { id } })
    return Object.assign(`Listing Category ${id} delete.`)
  } catch (error) {
    throw error
  }
}

module.exports = { getListingCategories, getListingCategory, postListingCategory, putListingCategory, deleteListingCategory }