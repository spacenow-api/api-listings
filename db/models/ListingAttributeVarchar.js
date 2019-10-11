'use strict';

module.exports = (sequelize, DataTypes) => {

  const ListingAttributeVarchar = sequelize.define('ListingAttributeVarchar', {
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
      type: DataTypes.STRING
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
    tableName: 'category_entity_varchar',
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

  ListingAttributeVarchar.associate = (models) => {
    ListingAttributeVarchar.belongsTo(models.Listing, {
      foreignKey: 'id'
    });
  };

  return ListingAttributeVarchar;

}