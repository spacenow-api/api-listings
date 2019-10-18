'use strict'

const { ListingAccessHour } = require('../../db/models')
const paginate = require('../helpers/paginate.utils')

const getListingAccessHours = async (id, pageIndex = 0, pageSize = 10) => {
  const where = { ...paginate(pageIndex, pageSize), where: { listingAccessDayId: id } }
  try {
    const data = await ListingAccessHour.findAndCountAll(where)
    return data
  } catch (error) {
    throw error
  }
}

const getListingAccessHour = async (id) => {
  const where = { where: { id } }
  try {
    const data = await ListingAccessHour.findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const putListingAccessHour = async (id, value) => {
  const where = { where: { id }, individualHooks: true }
  try {
    const valueToUpdate = await ListingAccessHour.findOne(where);
    if (!valueToUpdate) throw new Error(`Listing Access Hour ${id} not found.`);
      await ListingAccessHour.update(value, where)
    return await ListingAccessHour.findOne(where)
  } catch (error) {
    throw error
  }
}

const postListingAccessHour = async (value) => {
  try {
    const data = await ListingAccessHour.create(value, { individualHooks: true })
    return data
  } catch (error) {
    throw error
  }
}

const deleteListingAccessHour = async (id) => {
  try {
    const valueToUpdate = await ListingAccessHour.findOne({ where: { id } });
    if (!valueToUpdate) throw new Error(`Listing Access Hour ${id} not found.`);
    await ListingAccessHour.delete({ where: { id } })
    return Object.assign(`Listing Access Hour ${id} delete.`)
  } catch (error) {
    throw error
  }
}

module.exports = { getListingAccessHours, getListingAccessHour, putListingAccessHour, postListingAccessHour, deleteListingAccessHour }