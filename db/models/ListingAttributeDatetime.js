'use strict';

module.exports = (sequelize, DataTypes) => {

  const ListingAttributeDatetime = sequelize.define('ListingAttributeDatetime', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'value_id'
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
    attributeId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'attribute_id',
      references: {
        model: 'Attribute',
        key: 'id'
      }
    },
    value: {
      allowNull: false,
      type: DataTypes.DATE
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
    tableName: 'listing_attribute_datetime',
    indexes: [
      {
        unique: true,
        fields: ['listing_id']
      },
      {
        unique: true,
        fields: ['attribute_id']
      }
    ]
  });

  ListingAttributeDatetime.associate = (models) => {
    ListingAttributeDatetime.belongsTo(models.Listing, {
      foreignKey: 'id'
    });
  };

  return ListingAttributeDatetime;

}