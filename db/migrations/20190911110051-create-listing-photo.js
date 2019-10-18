'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing_photo', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      listing_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      is_cover: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
      .then(() => queryInterface.addConstraint('listing_photo', ['listing_id'], {
        type: 'foreign key',
        name: 'fk_listing_photo_listing_id',
        references: {
          table: 'listing',
          field: 'id'
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_photo');
  }
};