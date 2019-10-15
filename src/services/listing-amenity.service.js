'use strict'

const { ListingAmenity } = require('../../db/models')
const paginate = require('../helpers/paginate.utils')

const getListingAmenities = async (id, pageIndex = 0, pageSize = 10) => {
  const where = { ...paginate(pageIndex, pageSize), where: { listingId: id } }
  try {
    const data = await ListingAmenity.findAndCountAll(where)
    return data
  } catch (error) {
    throw error
  }
}

const getListingAmenity = async (id) => {
  const where = { where: { id } }
  try {
    const data = await ListingAmenity.findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const postListingAmenity = async (value) => {
  try {
    const data = await ListingAmenity.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const putListingAmenity = async (id, value) => {
  try {
    const valueToUpdate = await ListingAmenity.findOne({ where: { id } });
    if (!valueToUpdate) throw new Error(`Listing Amenity ${id} not found.`);
    await ListingAmenity.update(value, { where: { id } })
    return Object.assign(valueToUpdate, value)
  } catch (error) {
    throw error
  }
}

const deleteListingAmenity = async (id) => {
  try {
    const valueToUpdate = await ListingAmenity.findOne({ where: { id } });
    if (!valueToUpdate) throw new Error(`Listing Amenity ${id} not found.`);
    await ListingAmenity.delete({ where: { id } })
    return Object.assign(`Listing Amenity ${id} delete.`)
  } catch (error) {
    throw error
  }
}

module.exports = { getListingAmenities, getListingAmenity, postListingAmenity, putListingAmenity, deleteListingAmenity }