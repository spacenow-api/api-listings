'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing_access_hour', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      listing_access_day_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      week_day: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      open: {
        type: Sequelize.TIME,
        defaultValue: false,
        allowNull: false
      },
      close: {
        type: Sequelize.TIME,
        defaultValue: false,
        allowNull: false
      },
      all_day: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
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
      .then(() => queryInterface.addConstraint('listing_access_hour', ['listing_access_day_id'], {
        type: 'foreign key',
        name: 'fk_listing_access_hour_listing_access_day_id',
        references: {
          table: 'listing_access_day',
          field: 'id'
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_access_hour');
  }
};