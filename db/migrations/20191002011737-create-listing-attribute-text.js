'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing_attribute_text', {
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
        type: Sequelize.TEXT
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
      .then(() => queryInterface.addConstraint('listing_attribute_text', ['attribute_id'], {
        type: 'foreign key',
        name: 'fk_listing_attribute_text_attribute_id',
        references: {
          table: 'eav_attribute',
          field: 'id'
        }
      }))
      .then(() => queryInterface.addConstraint('listing_attribute_text', ['listing_id'], {
        type: 'foreign key',
        name: 'fk_listing_attribute_text_listing_id',
        references: {
          table: 'Listing',
          field: 'id'
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_attribute_text');
  }
};