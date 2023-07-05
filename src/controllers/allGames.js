const NP = require('number-precision');
const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos, Reviews, Users } = require("../db");
require('dotenv').config();

const allGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 80;

    const dbGames = await Games.findAll({
      attributes: { exclude: ["currency", "support_info", "abouth_the_game", "short_description"] },
      include: [
        { model: Developers, attributes: ['developer'], through: { attributes: [] } },
        { model: Languages, attributes: ['language'], through: { attributes: [] } },
        { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
        { model: Genres, attributes: ['genre'], through: { attributes: [] } },
        { model: Categories, attributes: ['category'], through: { attributes: [] } },
        { model: Images, attributes: ['image'], through: { attributes: [] } },
        { model: Videos, attributes: ['video'], through: { attributes: [] } },
        { model: Reviews, include: [{ model: Users, attributes: ['name', 'profileImage'], through: { attributes: [] } } ] }      ],
      offset: (page - 1) * limit,
      limit: limit
    });

    const gamesWithModifiedPrice = dbGames.map(game => {
      const gameCurrency = game.price_overview.slice(0, 3);
      const gamePrice = game.price_overview.slice(5).replace('.', '').replace(',', '.');
      const gameprice2 = game.price_overview.slice(5).replace(",")
      const gamename = game.name
      console.log(gamename)

      if (game.price_overview === "Free") {
        game.price_overview = 0;
      } else if (gameCurrency === "COL") {
        const number = NP.times(gamePrice / 4177.5).toFixed(2);
        game.price_overview = Number(number);
      } else if (gameCurrency === "CDN") {
        const number = NP.times(gameprice2 / 1.3249).toFixed(2);
        
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
        game.price_overview = Number(number);
      } else if (gameCurrency === "Mex") {
        const number = NP.times(gamePrice / 17.12).toFixed(2);
        game.price_overview = Number(number);
      }
      return game;
    });

    return res.status(200).json(gamesWithModifiedPrice);
  
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { allGames };
