'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.plant)
      models.user.hasMany(models.note)
    }
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4,50],
          msg: 'Username must be between 4 and 50 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  // // async version
  // user.addHook('beforeCreate', async(pendingUser, options)=>{
  //   await bcrypt.hash(pendingUser.password, 10) // <- 10 = # of salt rounds
  //   .then(hashedPassword=>{
  //     console.log(`${pendingUser.password} became -----> ${hashedPassword}`)
  //     // replace the OG password with the hash
  //     pendingUser.password = hashedPassword
  //   })
  // })

  // sync version 
  user.addHook('beforeCreate', (pendingUser, options)=>{
    let hashedPassword = bcrypt.hashSync(pendingUser.password, 10) //hash sync forces JS to run so don't need .then
    console.log(`${pendingUser.password} became -----> ${hashedPassword}`)
    pendingUser.password = hashedPassword
  })

  user.prototype.validPassword = async function(passwordInput) {
    let match = await bcrypt.compare(passwordInput, this.password)
    console.log("?????match:", match)
    return match
  }

  return user;
};