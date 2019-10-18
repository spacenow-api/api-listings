'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'id'
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'code',
      unique: true
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'location_id',
      references: {
        model: 'Location',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'user_id',
      references: {
        model: 'User',
        key: 'id'
      }
    },
    bookingPeriod: {
      type: DataTypes.ENUM('hourly', 'daily', 'weekly', 'monthly'),
      field: 'booking_period'
    },
    title: {
      type: DataTypes.STRING,
      field: 'title'
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description'
    },
    currency: {
      type: DataTypes.STRING(3),
      field: 'currency',
      defaultValue: 'AUD'
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      field: 'price'
    },
    bookingType: {
      type: DataTypes.ENUM('instant', 'request'),
      field: 'booking_type',
      defaultValue: 'request',
    },
    minimumTerm: {
      type: DataTypes.INTEGER,
      field: 'minimum_term',
      defaultValue: 1
    },
    isAbsorvedFee: {
      type: DataTypes.BOOLEAN,
      field: 'is_absorved_fee',
      defaultValue: 0
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      field: 'is_published',
      defaultValue: 0
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      field: 'is_ready',
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('active', 'deleted', 'claimed'),
      field: 'status',
      defaultValue: 'active'
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
    tableName: 'listing',
    indexes: [
      {
        unique: true,
        fields: ['location_id']
      },
      {
        unique: true,
        fields: ['user_id']
      }
    ]
  });

  Listing.beforeCreate((listing) => {
    listing.code = Math.floor(Math.random() * Math.floor(999999));
  })

  Listing.afterUpdate((listing, options) => {
    listing.bookingPeriod !== null &&
      listing.title !== '' &&
      listing.description !== '' &&
      listing.price > 0 ?
      listing.update({ isRead: 1 }) :
      listing.update({ isRead: 0, isPublished: 0 });
  })

  Listing.associate = (models) => {
    Listing.belongsTo(models.ListingCategory, {
      foreignKey: 'id'
    });
  };

  return Listing;
};