const {Platforms} = require("../db");


const platformGames = async (req, res) => {
  try {

    const dbGames = await Platforms.findAll({});

    return res.status(200).json(dbGames);

  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  platformGames
};