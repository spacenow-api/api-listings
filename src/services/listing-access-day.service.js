'use strict'

const { ListingAccessDay } = require('../../db/models')
const paginate = require('../helpers/paginate.utils')

const getListingAccessDays = async (id, pageIndex = 0, pageSize = 10) => {
  const where = { ...paginate(pageIndex, pageSize), where: { listingId: id } }
  try {
    const data = await ListingAccessDay.findAndCountAll(where)
    return data
  } catch (error) {
    throw error
  }
}

const getListingAccessDay = async (id) => {
  const where = { where: { id } }
  try {
    const data = await ListingAccessDay.findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const putListingAccessDay = async (id, value) => {
  const where = { where: { id }, individualHooks: true }
  try {
    const valueToUpdate = await ListingAccessDay.findOne(where);
    if (!valueToUpdate) throw new Error(`Listing Access Day ${id} not found.`);
      await ListingAccessDay.update(value, where)
    return await ListingAccessDay.findOne(where)
  } catch (error) {
    throw error
  }
}

const postListingAccessDay = async (value) => {
  try {
    const data = await ListingAccessDay.create(value, { individualHooks: true })
    return data
  } catch (error) {
    throw error
  }
}

const deleteListingAccessDay = async (id) => {
  try {
    const valueToUpdate = await ListingAccessDay.findOne({ where: { id } });
    if (!valueToUpdate) throw new Error(`Listing Access Day ${id} not found.`);
    await ListingAccessDay.delete({ where: { id } })
    return Object.assign(`Listing Access Day ${id} delete.`)
  } catch (error) {
    throw error
  }
}

module.exports = { getListingAccessDays, getListingAccessDay, putListingAccessDay, postListingAccessDay, deleteListingAccessDay }