'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingPhoto = sequelize.define('ListingPhoto', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'id'
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'listing_id',
      references: {
        model: 'Listing',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isCover: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'is_cover',
      defaultValue: false
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
    tableName: 'listing_photo',
    indexes: [
      {
        unique: true,
        fields: ['listing_id']
      }
    ]
  });

  return ListingPhoto;
};