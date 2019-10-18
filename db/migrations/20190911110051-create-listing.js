'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      booking_period: {
        type: Sequelize.ENUM('hourly', 'daily', 'weekly', 'monthly')
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: 'AUD'
      },
      price: {
        type: Sequelize.FLOAT(12, 2),
      },
      booking_type: {
        type: Sequelize.ENUM('instant', 'request', 'poa'),
        allowNull: false,
        defaultValue: 'instant',
      },
      minimum_term: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      is_absorved_fee: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      is_ready: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('active', 'deleted', 'claimed'),
        allowNull: false,
        defaultValue: 'active'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
      .then(() => queryInterface.addConstraint('listing', ['location_id'], {
        type: 'foreign key',
        name: 'fk_listing_location_id',
        references: {
          table: 'Location',
          field: 'id'
        }
      }))
    // .then(() => queryInterface.addConstraint('listing', ['user_id'], {
    //   type: 'foreign key',
    //   name: 'fk_listing_user_id',
    //   references: {
    //     table: 'User',
    //     field: 'id'
    //   }
    // }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing');
  }
};