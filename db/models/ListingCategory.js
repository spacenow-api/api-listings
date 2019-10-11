'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingCategory = sequelize.define('ListingCategory', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'id'
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'category_id',
      references: {
        model: 'Category',
        key: 'id'
      }
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'listing_id',
      references: {
        model: 'Listing',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    tableName: 'listing_category',
    indexes: [
      {
        unique: true,
        fields: ['listing_id']
      },
      {
        unique: true,
        fields: ['category_id']
      }
    ]
  });

  return ListingCategory;
};