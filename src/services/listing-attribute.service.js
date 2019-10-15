'use strict'

const { ListingAttributeDatetime, ListingAttributeDecimal, ListingAttributeInteger, ListingAttributeText, ListingAttributeVarchar } = require('../../db/models')
const _ = require('lodash')

const ListingAttribute = (type) => {
  switch (type) {
    case 'datetime':
      return ListingAttributeDatetime;
    case 'decimal':
      return ListingAttributeDecimal;
    case 'integer':
      return ListingAttributeInteger;
    case 'text':
      return ListingAttributeText;
    default:
      return ListingAttributeVarchar;

  }
}

const getListingAttributes = async (id) => {
  const where = { where: { listingId: id } }
  try {
    let data = await ListingAttributeDatetime.findAll(where)
    data = _.concat(data, await ListingAttributeDecimal.findAll(where))
    data = _.concat(data, await ListingAttributeInteger.findAll(where))
    data = _.concat(data, await ListingAttributeText.findAll(where))
    data = _.concat(data, await ListingAttributeVarchar.findAll(where))
    return data
  } catch (error) {
    throw error
  }
}

const getListingAttribute = async (id, type) => {
  const where = { where: { id } }
  try {
    const data = await ListingAttribute(type).findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const postListingAttribute = async (value, type) => {
  try {
    const data = await ListingAttribute(type).create(value)
    return data
  } catch (error) {
    throw error
  }
}

const putListingAttribute = async (id, value, type) => {
  const where = { where: { id } }
  try {
    const valueToUpdate = await ListingAttribute(type).findOne(where);
    if (!valueToUpdate) throw new Error(`Listing Attribute ${id} not found.`);
    await ListingAttribute(type).update(value, where)
    return Object.assign(valueToUpdate, value)
  } catch (error) {
    throw error
  }
}

const deleteListingAttribute = async (id, type) => {
  const where = { where: { id } }
  try {
    const valueToUpdate = await ListingAttribute(type).findOne(where);
    if (!valueToUpdate) throw new Error(`Listing Attribute ${id} not found.`);
    await ListingAttribute(type).delete(where)
    return Object.assign(`Listing Attribute ${id} delete.`)
  } catch (error) {
    throw error
  }
}

module.exports = { getListingAttributes, getListingAttribute, postListingAttribute, putListingAttribute, deleteListingAttribute }