const { Games} = require("../db");
require('dotenv').config();

const allGamesAdmin = async (req, res) => {
    try {
        
    //   const page = parseInt(req.query.page) || 1;
    //   const limit = parseInt(req.query.limit) || 10;
  
      const dbGames = await Games.findAll({
        attributes: ["id", "name", "price_overview"],
        // offset: (page - 1) * limit,
        // limit: limit
      });
  
      const gameNames = dbGames.map(dbGame => dbGame.name);
      console.log(gameNames);
  
      const gamesWithModifiedPrice = dbGames.map(game => {
        const gameCurrency = game.price_overview.slice(0, 3);
        const gameCurrency01 = game.price_overview.slice(0, 1);
        const gameCurrency02 = game.price_overview.includes("₫");
        const gameCurrency03 = game.price_overview.slice(0, 1);
        const gamePrice = game.price_overview.slice(5, 20);
        const gamePrice01 = game.price_overview.slice(2, 20);
        const gamePrice02 = game.price_overview.replace(/\D/g, '');
        const gamePrice03 = game.price_overview.slice(2, 20);
        const gamePrice04 = game.price_overview.slice(5, 20);
        console.log(gameCurrency)
        console.log(gamePrice)
        if (game.price_overview === "Free") {
          game.price_overview = 0;
          console.log(game.price_overview)
        }
        else if(gameCurrency === "COL"){
          const currencyPrice = parseFloat(gamePrice).toFixed(3)
          const currencyPrice01 = currencyPrice.replace('.', ''); 
          game.price_overview = (currencyPrice01 * 0.00024).toFixed(2)
          console.log(game.price_overview)
        }
        else if(gameCurrency === "CDN"){
          const currencyPrice = parseFloat(gamePrice).toFixed(2)
          game.price_overview = (currencyPrice * 0.76).toFixed(2)
          console.log(game.price_overview)
        }
        else if(gameCurrency01 === "¥"){
          const currencyPrice = parseFloat(gamePrice01).toFixed(2)
          game.price_overview = (currencyPrice * 0.0069).toFixed(2)
          console.log(game.price_overview)
        }
        else if(gameCurrency02 === true){
          game.price_overview = (gamePrice02 * 0.000042).toFixed(2)
          console.log(game.price_overview)
        }
        else if(gameCurrency03 === "₹"){
          game.price_overview = (gamePrice03 * 0.012).toFixed(2)
          console.log(game.price_overview)
        }
        else if(gameCurrency === "ARS"){
          const currencyPrice = gamePrice04.replace(/[,.]/g, '');
          game.price_overview = (currencyPrice * 0.0039).toFixed(2);
          console.log(game.price_overview);
        }
        else if(gameCurrency === "Mex"){
          const currencyPrice = parseFloat(gamePrice).toFixed(3)
          game.price_overview = (currencyPrice * 0.059).toFixed(2)
          console.log(game.price_overview)
        }
        return game;
      });
  
      return res.status(200).json(gamesWithModifiedPrice);
    
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  
  module.exports = {
    allGamesAdmin
  };
  