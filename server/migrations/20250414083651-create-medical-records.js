'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medical_records', {
      record_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        // references: {
        //   model: 'Patients',
        //   key: 'id',
        // },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Doctor',
        //   key: 'id',
        // },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      disease_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      prescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medical_records');
  },
};
