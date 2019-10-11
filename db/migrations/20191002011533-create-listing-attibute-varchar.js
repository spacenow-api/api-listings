'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing_attribute_varchar', {
      value_id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      listing_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      attribute_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING
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
      .then(() => queryInterface.addConstraint('listing_attribute_varchar', ['listing_id'], {
        type: 'foreign key',
        name: 'fk_listing_attribute_varchar_listing_id',
        references: {
          table: 'Listing',
          field: 'id'
        }
      }))
      .then(() => queryInterface.addConstraint('listing_attribute_varchar', ['attribute_id'], {
        type: 'foreign key',
        name: 'fk_listing_attribute_varchar_attribute_id',
        references: {
          table: 'eav_attribute',
          field: 'id'
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_attribute_varchar');
  }
};