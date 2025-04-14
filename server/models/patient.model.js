// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Patient extends Model {
//     static associate(models) {
//       // define associations here if needed
//     }
//   }

//   Patient.init({
//     name: DataTypes.STRING,
//     email: {
//       type: DataTypes.STRING,
//       unique: true
//     },
//     password: DataTypes.STRING,
//     role: DataTypes.ENUM('admin', 'doctor', 'staff', 'patient')
//   }, {
//     sequelize,
//     modelName: 'Patient',
//     timestamps: false
//   });

//   return Patient;
// };
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    contact_number: DataTypes.STRING,
    blood_group: DataTypes.STRING,
    address: DataTypes.TEXT,
    
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};