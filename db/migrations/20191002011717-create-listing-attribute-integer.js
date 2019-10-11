'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing_attribute_integer', {
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
        type: Sequelize.INTEGER
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
      .then(() => queryInterface.addConstraint('listing_attribute_integer', ['attribute_id'], {
        type: 'foreign key',
        name: 'fk_listing_attribute_integer_attribute_id',
        references: {
          table: 'eav_attribute',
          field: 'id'
        }
      }))
      .then(() => queryInterface.addConstraint('listing_attribute_integer', ['listing_id'], {
        type: 'foreign key',
        name: 'fk_listing_attribute_integer_listing_id',
        references: {
          table: 'Listing',
          field: 'id'
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_attribute_integer');
  }
};