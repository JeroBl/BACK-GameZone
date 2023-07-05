const {Languages} = require("../db");


const languagesGames = async (req, res) => {
  try {

    const dbGames = await Languages.findAll({});
    
    return res.status(200).json(dbGames);

  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
    languagesGames
};