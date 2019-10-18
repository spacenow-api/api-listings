'use strict'

const { Listing } = require('../../db/models')
const paginate = require('../helpers/paginate.utils')

const getListings = async (pageIndex = 0, pageSize = 10) => {
  const order = [['created_at']];
  try {
    const data = await Listing.findAndCountAll({ ...paginate(pageIndex, pageSize), order })
    return data
  } catch (error) {
    throw error
  }
}

const getListing = async (id) => {
  const where = { where: { id } }
  try {
    const data = await Listing.findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const postListing = async (value) => {
  try {
    const data = await Listing.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const putListing = async (id, value, user) => {
  const where = { where: { id }, individualHooks: true }
  try {
    const valueToUpdate = await Listing.findOne(where);
    if (!valueToUpdate) throw new Error(`Listing ${id} not found.`);
    if (user.role === 'admin' || valueToUpdate.userId === user.id)
      await Listing.update(value, where)
    else throw new Error(`You are not the owner.`);
    return await Listing.findOne(where)
  } catch (error) {
    throw error
  }
}

const deleteListing = async (id, user) => {
  const where = { where: { id } }
  const value = { isPublished: false,  }
  try {
    const valueToUpdate = await Listing.findOne(where);
    if (!valueToUpdate) throw new Error(`Listing ${id} not found.`);
    if (user.role === 'admin' || valueToUpdate.userId === user.id)
      await Listing.update(value, where)
    else throw new Error(`You are not the owner.`);
    return Object.assign(`Listing ${id} delete.`)
  } catch (error) {
    throw error
  }
}

const publishListing = async (id, user) => {
  const where = { where: { id, is_ready: true } }
  const value = { isPublished: true }
  try {
    const valueToUpdate = await Listing.findOne(where);
    if (!valueToUpdate) throw new Error(`Listing ${id} not found or not ready to be published.`);
    if (user.role === 'admin' || valueToUpdate.userId === user.id)
      await Listing.update(value, where)
    else throw new Error(`You are not the owner.`);
    return Object.assign(valueToUpdate, value)
  } catch (error) {
    throw error
  }
}

const unpublishListing = async (id, user) => {
  const where = { where: { id } }
  const value = { isPublished: false }
  try {
    const valueToUpdate = await Listing.findOne(where);
    if (!valueToUpdate) throw new Error(`Listing ${id} not found.`);
    if (user.role === 'admin' || valueToUpdate.userId === user.id)
    await Listing.update(value, where)
    else throw new Error(`You are not the owner.`);
    return Object.assign(valueToUpdate, value)
  } catch (error) {
    throw error
  }
}

const userListings = async (userId, pageIndex = 0, pageSize = 10) => {
  const order = [['created_at']];
  const where = { where: { userId }, ...paginate(pageIndex, pageSize), order }
  try {
    const data = await Listing.findAndCountAll(where)
    return data
  } catch (error) {
    throw error
  }
}

const claimListing = async (id) => {
  const where = { where: { id, is_ready: true } }
  const value = { status: 'claimed' }
  try {
    const valueToUpdate = await Listing.findOne(where);
    if (!valueToUpdate) throw new Error(`Listing ${id} not found or not ready to be published.`);
    await Listing.update(value, where)
    return Object.assign(valueToUpdate, value)
  } catch (error) {
    throw error
  }
}

module.exports = { getListings, getListing, postListing, putListing, deleteListing, publishListing, unpublishListing, userListings, claimListing }