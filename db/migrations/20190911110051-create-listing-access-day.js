'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing_access_day', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      listing_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      mon: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      tue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      wed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      thu: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      fri: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      sat: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      sun: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      all_24_7: {
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
      .then(() => queryInterface.addConstraint('listing_access_day', ['listing_id'], {
        type: 'foreign key',
        name: 'fk_listing_access_day_listing_id',
        references: {
          table: 'listing',
          field: 'id'
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_access_day');
  }
};