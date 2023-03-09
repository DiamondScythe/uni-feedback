export default (sequelize, DataTypes) =>
sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        unique: True
    },
    title: {
        type: DataTypes.STRING,
    },
    body:
    {
        type: DataTypes.STRING,
    }
})