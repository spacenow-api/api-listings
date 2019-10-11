'use strict';

module.exports = (sequelize, DataTypes) => {

  const ListingAttributeText = sequelize.define('ListingAttributeText', {
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
        model: 'EAVAttribute',
        key: 'id'
      }
    },
    value: {
      allowNull: false,
      type: DataTypes.TEXT
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
    tableName: 'listing_attribute_text',
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

  ListingAttributeText.associate = (models) => {
    ListingAttributeText.belongsTo(models.Listing, {
      foreignKey: 'id'
    });
  };

  return ListingAttributeText;

}