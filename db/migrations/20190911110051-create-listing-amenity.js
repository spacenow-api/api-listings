'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing_amenity', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      listing_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      attribute_id: {
        type: Sequelize.UUID,
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
      .then(() => queryInterface.addConstraint('listing_amenity', ['attribute_id'], {
        type: 'foreign key',
        name: 'fk_listing_amenity_attribute_id',
        references: {
          table: 'attribute',
          field: 'id'
        }
      }))
      .then(() => queryInterface.addConstraint('listing_amenity', ['listing_id'], {
        type: 'foreign key',
        name: 'fk_listing_amenity_listing_id',
        references: {
          table: 'listing',
          field: 'id'
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_amenity');
  }
};