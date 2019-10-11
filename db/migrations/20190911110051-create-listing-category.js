'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing_category', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      listing_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category_id: {
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
      .then(() => queryInterface.addConstraint('listing_category', ['category_id'], {
        type: 'foreign key',
        name: 'fk_listing_category_category_id',
        references: {
          table: 'category',
          field: 'id'
        }
      }))
      .then(() => queryInterface.addConstraint('listing_category', ['listing_id'], {
        type: 'foreign key',
        name: 'fk_listing_category_listing_id',
        references: {
          table: 'Listing',
          field: 'id'
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_category');
  }
};