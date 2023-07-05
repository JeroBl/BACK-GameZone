const {Categories} = require("../db");


const categoriesGames = async (req, res) => {
  try {

    const dbGames = await Categories.findAll({});

    return res.status(200).json(dbGames);

  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
    categoriesGames
};