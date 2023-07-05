const NP = require('number-precision');
const {Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos} = require("../db")
const Sequelize = require('sequelize');
require('dotenv').config();


const nameGames = async (req, res) => {

const { name } = req.query;

try {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

        const dbGames = await Games.findAll({
            where: {name: {[Sequelize.Op.iLike]: `%${name}%`}},
            include: [
                { model: Developers, attributes: ['developer'], through: { attributes: [] } },
                { model: Languages, attributes: ['language'], through: { attributes: [] } },
                { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
                { model: Genres, attributes: ['genre'], through: { attributes: [] } },
                { model: Categories, attributes: ['category'], through: { attributes: [] } },
                { model: Images, attributes: ['image'], through: { attributes: [] } },
                { model: Videos, attributes: ['video'], through: { attributes: [] } },
            ],
            offset: (page - 1) * limit,
            limit: limit
        }
    );

    const gamesWithModifiedPrice = dbGames.map(game => {
      const gameCurrency = game.price_overview.slice(0, 3);
      const gamePrice = game.price_overview.slice(5).replace('.', '').replace(',', '.');
      console.log(game.price_overview)
      if (game.price_overview === "Free") {
        game.price_overview = 0;
      } else if (gameCurrency === "COL") {
        const number = NP.times(gamePrice / 4177.5).toFixed(2);
        console.log(number)
        game.price_overview = Number(number);
      } else if (gameCurrency === "CDN") {
        const number = NP.times(gamePrice, 0.76).toFixed(2);
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
        console.log(number)
        game.price_overview = Number(number);
      } else if (gameCurrency === "Mex") {
        const number = NP.times(gamePrice, 0.059).toFixed(2);
        game.price_overview = Number(number);
      }
      return game;
    });

    return res.status(200).json(gamesWithModifiedPrice);

  } catch (error) {
    res.status(404).send(error.message);
  }
};
module.exports = {
    nameGames
}