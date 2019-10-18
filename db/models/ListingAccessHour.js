'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingAccessHour = sequelize.define('ListingAccessHour', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'id'
    },
    listingAccessDayId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'listing_access_day_id',
      references: {
        model: 'ListingAccessDay',
        key: 'id'
      }
    },
    weekday: {
      allowNull: false,
      type: DataTypes.INTEGER(1),
      field: 'weekday'
    },
    open: {
      allowNull: false,
      type: DataTypes.TIME,
      field: 'open'
    },
    close: {
      allowNull: false,
      type: DataTypes.TIME,
      field: 'close'
    },
    allday: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'all_day',
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

  ListingAccessHour.associate = (models) => {
    ListingAccessHour.belongsTo(models.ListingAccessDay, {
      foreignKey: 'id'
    });
  };

  return ListingAccessHour;
};