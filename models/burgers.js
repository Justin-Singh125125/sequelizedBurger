module.exports = function (sequelize, dataTypes) {
    var Burgers = sequelize.define("Burgers", {
        burger_name: {
            type: dataTypes.STRING,
            validate: {
                len: [1, 160]
            }
        },
        devoured: {
            type: dataTypes.BOOLEAN,
            defaultValue: -1
        }
    });

    return Burgers;
};