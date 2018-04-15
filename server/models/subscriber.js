module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define('Subscriber', {
    email: {
    	type: DataTypes.STRING,
    	allowNull: true
    },
    phone: {
    	type: DataTypes.STRING,
    	allowNull: true
    },
  });
  Subscriber.associate = function(models) {
    // associations can be defined here
  };
  return Subscriber;
};
