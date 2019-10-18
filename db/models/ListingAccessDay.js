'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingAccessDay = sequelize.define('ListingAccessDay', {
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
    mon: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'mon',
      defaultValue: false
    },
    tue: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'tue',
      defaultValue: false
    },
    wed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'wed',
      defaultValue: false
    },
    thu: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'thu',
      defaultValue: false
    },
    fri: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'fri',
      defaultValue: false
    },
    sat: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'sat',
      defaultValue: false
    },
    sun: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'sun',
      defaultValue: false
    },
    all247: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'all_24_7',
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

  ListingAccessDay.beforeCreate((listingAccessDay) => {
    if (listingAccessDay.all_24_7 === true) {
      listingAccessDay.mon = false
      listingAccessDay.tue = false
      listingAccessDay.wed = false
      listingAccessDay.thu = false
      listingAccessDay.fri = false
      listingAccessDay.sat = false
      listingAccessDay.sun = false
    }
  })

  ListingAccessDay.afterUpdate((listingAccessDay, options) => {
    if (listingAccessDay.mon || istingAccessDay.tue || listingAccessDay.wed || listingAccessDay.thu || listingAccessDay.fri || listingAccessDay.sat || listingAccessDay.sun) 
      listingAccessDay.update({ all247: true })
  })

  ListingAccessDay.associate = (models) => {
    ListingAccessDay.belongsTo(models.Listing, {
      foreignKey: 'id'
    });
  };

  return ListingAccessDay;
};