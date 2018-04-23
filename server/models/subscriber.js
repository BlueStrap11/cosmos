module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define('Subscriber', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NA'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NA',
    }
  });

  Subscriber.associate = function(models) {
    // associations can be defined here
  };
  return Subscriber;
};
