const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos, Reviews, Users } = require("../db");
const NP = require('number-precision');
require('dotenv').config();

const searchId = async (req, res) => {
  try {
    const { id } = req.params;

    const gameDetail = await Games.findByPk(id, {
      include: [
        { model: Developers, attributes: ['developer'], through: { attributes: [] } },
        { model: Languages, attributes: ['language'], through: { attributes: [] } },
        { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
        { model: Genres, attributes: ['genre'], through: { attributes: [] } },
        { model: Categories, attributes: ['category'], through: { attributes: [] } },
        { model: Images, attributes: ['image'], through: { attributes: [] } },
        { model: Videos, attributes: ['video'], through: { attributes: [] } },
        { model: Reviews, include: [{ model: Users, attributes: ['name', 'profileImage'], through: { attributes: [] } }] }
      ],
    });

    const game = gameDetail; // Since it's a single game, there's no need to use map
    const gameCurrency = game.price_overview.slice(0, 3);
    const gamePrice = game.price_overview.slice(5).replace('.', '').replace(',', '.');

    if (game.price_overview === "Free") {
      game.price_overview = 0;
    } else if (gameCurrency === "COL") {
      const number = NP.times(gamePrice / 4177.5).toFixed(2);
      game.price_overview = Number(number);
    } else if (gameCurrency === "CDN") {
      const number = NP.times(gamePrice / 1.32).toFixed(2);
      game.price_overview = Number(number);
    } else if (gameCurrency === "¥") {
      const number = NP.times(gamePrice, 0.0069).toFixed(2);
      game.price_overview = Number(number);
    } else if (gameCurrency === "₫") {
      const number = NP.times(gamePrice, 0.000042).toFixed(2);
      game.price_overview = Number(number);
    } else if (gameCurrency === "₹") {
      const number = NP.times(gamePrice, 0.012).toFixed(2);
      game.price_overview = Number(number);
    } else if (gameCurrency === "ARS") {
      const number = NP.times(gamePrice / 266.5).toFixed(2);
      console.log(number);
      game.price_overview = Number(number);
    } else if (gameCurrency === "Mex") {
      const number = NP.times(gamePrice / 17.12).toFixed(2);
      game.price_overview = Number(number);
    }

    return res.status(200).json(game);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  searchId
};