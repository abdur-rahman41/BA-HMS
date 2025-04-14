'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      // MedicalRecord belongs to Patient and Doctor
      MedicalRecord.belongsTo(models.Patient, {
        foreignKey: 'patient_id',
        as: 'patient',
      });
      MedicalRecord.belongsTo(models.Doctor, {
        foreignKey: 'doctor_id',
        as: 'doctor',
      });
    }
  }

  MedicalRecord.init(
    {
      record_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      patient_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      disease_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      prescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'MedicalRecord',
      tableName: 'medical_records',
      timestamps: false,
    }
  );

  return MedicalRecord;
};
