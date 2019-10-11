'use strict'

const { ListingAttributeValue } = require('../../db/models')
const paginate = require('../helpers/paginate.utils')

const getListingAttributeValues = async (id, pageIndex = 0, pageSize = 10) => {
  const where = { ...paginate(pageIndex, pageSize), where: { listingId: id } }
  try {
    const data = await ListingAttributeValue.findAndCountAll(where)
    return data
  } catch (error) {
    throw error
  }
}

const getListingAttributeValue = async (id) => {
  const where = { where: { id } }
  try {
    const data = await ListingAttributeValue.findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const postListingAttributeValue = async (value) => {
  try {
    const data = await ListingAttributeValue.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const putListingAttributeValue = async (id, value) => {
  try {
    const valueToUpdate = await ListingAttributeValue.findOne({ where: { id } });
    if (!valueToUpdate) throw new Error(`Listing Category ${id} not found.`);
    await ListingAttributeValue.update(value, { where: { id } })
    return Object.assign(valueToUpdate, value)
  } catch (error) {
    throw error
  }
}

const deleteListingAttributeValue = async (id) => {
  try {
    const valueToUpdate = await ListingAttributeValue.findOne({ where: { id } });
    if (!valueToUpdate) throw new Error(`Listing Category ${id} not found.`);
    await ListingAttributeValue.delete({ where: { id } })
    return Object.assign(`Listing Category ${id} delete.`)
  } catch (error) {
    throw error
  }
}

module.exports = { getListingAttributeValues, getListingAttributeValue, postListingAttributeValue, putListingAttributeValue, deleteListingAttributeValue }