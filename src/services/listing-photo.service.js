'use strict'

const { ListingPhoto } = require('../../db/models')
const paginate = require('../helpers/paginate.utils')

const getListingPhotos = async (id, pageIndex = 0, pageSize = 10) => {
  const where = { ...paginate(pageIndex, pageSize), where: { listingId: id } }
  try {
    const data = await ListingPhoto.findAndCountAll(where)
    return data
  } catch (error) {
    throw error
  }
}

const getListingPhoto = async (id) => {
  const where = { where: { id } }
  try {
    const data = await ListingPhoto.findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const postListingPhoto = async (value) => {
  try {
    const data = await ListingPhoto.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const deleteListingPhoto = async (id) => {
  const where = { where: { id } }
  try {
    const valueToUpdate = await ListingPhoto.findOne(where);
    if (!valueToUpdate) throw new Error(`Listing Photo ${id} not found.`);
    await ListingPhoto.delete(where)
    return Object.assign(`Listing Photo ${id} delete.`)
  } catch (error) {
    throw error
  }
}

const coverListingPhoto = async (id, user) => {
  const where = { where: { id } }
  const value = { isCover: true }
  try {
    const valueToUpdate = await ListingPhoto.findOne(where);
    if (!valueToUpdate) throw new Error(`Listing ${id} not found or not ready to be published.`);
    if( !valueToUpdate.isCover )
      await Listing.update(value, where)
    return Object.assign(valueToUpdate, value)
  } catch (error) {
    throw error
  }
}

module.exports = { getListingPhotos, getListingPhoto, postListingPhoto, deleteListingPhoto, coverListingPhoto }