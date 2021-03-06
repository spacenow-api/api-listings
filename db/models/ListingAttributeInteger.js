'use strict';

module.exports = (sequelize, DataTypes) => {

  const ListingAttributeInteger = sequelize.define('ListingAttributeInteger', {
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
      type: DataTypes.INTEGER
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
    tableName: 'listing_attribute_integer',
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

  ListingAttributeInteger.associate = (models) => {
    ListingAttributeInteger.belongsTo(models.Listing, {
      foreignKey: 'id'
    });
  };

  return ListingAttributeInteger;

}