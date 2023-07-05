require('dotenv').config();
const { Sequelize } = require('sequelize');

// const RecipeModel = require('./models/Recipe');
// const DietsModel = require('./models/Diets');



const fs = require('fs');
const path = require('path');
const gameScreenshots = require('./models/Images');
const {
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST,
  DB_NAME,
  DB_RAILWAY,
  DB_RENDER,
  DB_RENDER2
} = process.env;

//  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
//    logging: false, // set to console.log to see the raw SQL queries
//    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//  });



// const sequelize = new Sequelize(DB_RAILWAY, {
//  logging: false, // set to console.log to see the raw SQL queries
//  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// })


const sequelize = new Sequelize(DB_RENDER, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      require: true,
    }
  }
});



const basename = path.basename(__filename);

const modelDefiners = [];


// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Games, Users, Categories, Languages, Developers, Genres, Platforms, Publishers, Videos, Images, Reviews} = sequelize.models;

Games.belongsToMany(Users, {through: "UserGame", foreignKey: 'gamesId', otherKey: 'usersId'});
Users.belongsToMany(Games, {through: "UserGame", foreignKey: 'usersId', otherKey: 'gamesId'});

Games.belongsToMany(Categories, {through: "CategoryGame", foreignKey: 'gamesId', otherKey: 'categoriesId'});
Categories.belongsToMany(Games, {through: "CategoryGame", foreignKey: 'categoriesId', otherKey: 'gamesId'});

Games.belongsToMany(Languages, {through: "LanguageGame", foreignKey: 'gamesId', otherKey: 'languagesId'});
Languages.belongsToMany(Games, {through: "LanguageGame", foreignKey: 'languagesId', otherKey: 'gamesId'});

Games.belongsToMany(Platforms, {through: "PlatformGame", foreignKey: 'gamesId', otherKey: 'platformsId'})
Platforms.belongsToMany(Games, {through: "PlatformGame", foreignKey: 'platformsId', otherKey: 'gamesId'})

Games.belongsToMany(Genres, {through: "GenreGame", foreignKey: 'gamesId', otherKey: 'genreId'})
Genres.belongsToMany(Games, {through: "GenreGame", foreignKey: 'genreId', otherKey: 'gamesId'})

Games.belongsToMany(Developers, {through: "DeveloperGame", foreignKey: 'gamesId', otherKey: 'developersId'})
Developers.belongsToMany(Games, {through: "DeveloperGame", foreignKey: 'developersId', otherKey: 'gamesId'})

Games.belongsToMany(Publishers, {through: "PublisherGame", foreignKey: 'gamesId', otherKey: 'publishersId'})
Publishers.belongsToMany(Games, {through: "PublisherGame", foreignKey: 'publishersId', otherKey: 'gamesId'})

Games.belongsToMany(Images, {through: "ImagesGame", foreignKey: 'gamesId', otherKey: 'imagesId'})
Images.belongsToMany(Games, {through: "ImagesGame", foreignKey: 'imagesId', otherKey: 'gamesId'})

Games.belongsToMany(Videos, {through: "Videos_Game", foreignKey: 'gamesId', otherKey: 'videosId'})
Videos.belongsToMany(Games, {through: "Videos_Game", foreignKey: 'videosId', otherKey: 'gamesId'})

Users.belongsToMany(Reviews, {through: "UsersReviews", foreignKey: 'usersId', otherKey: 'reviewsId'})
Reviews.belongsToMany(Users, {through: "UsersReviews", foreignKey: 'reviewsId', otherKey: 'usersId'})

Games.belongsToMany(Reviews, {through: "GameReviews", foreignKey: 'gamesId', otherKey: 'reviewsId'})
Reviews.belongsToMany(Games, {through: "GameReviews", foreignKey: 'reviewsId', otherKey: 'gamesId'})

module.exports = {
  ...sequelize.models, 
  conn: sequelize,
};
