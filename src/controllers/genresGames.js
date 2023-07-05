const {Genres} = require("../db");


const genresGames = async (req, res) => {
  try {

    const dbGames = await Genres.findAll({});

    return res.status(200).json(dbGames);

  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
    genresGames
};