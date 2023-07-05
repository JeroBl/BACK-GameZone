
// const axios = require('axios');
// const { Games, Platforms, Genres, Publishers, Developers, Languages, Categories, Images, Videos } = require('../db.js');
// require('dotenv').config();
// const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

// const saveGames = async (req, res) => {
//   try {
//     //[105450, 1017900, 813780, 209000, 208650, 200260, 35140, 1817070, 1817190]
//     const gameIds = [813780];
//     const gamesData = [];

//     for (const gameId of gameIds) {
//       const response = await axios.get(`${gameUrl}${gameId}`);
//       const gameData = response.data[gameId].data;

//       const gameDb = {
//         id: gameData.steam_appid,
//         name: gameData.name,
//         type: gameData.type || 'Unknown',
//         required_age: gameData.required_age || 0,
//         is_free: gameData.is_free,
//         detailed_description: gameData.detailed_description || 'No description available',
//         release_date: gameData.release_date.date,
//         coming_soon: gameData.release_date.coming_soon,
//         currency: gameData.price_overview ? gameData.price_overview.currency : 'the currency does not exist',
//         price_overview: gameData.price_overview ? gameData.price_overview.final_formatted : "Free",
//         capsule_image: gameData.capsule_image,
//         header_image: gameData.header_image,
//         controller_support: gameData.controller_support ? gameData.controller_support : null,
//         ban: false,
//         pc_requirements: gameData.pc_requirements || 'No requirements available',
//         discounted: false,
//         discount_percent: 0
//       };

//       gamesData.push(gameDb);

//       const games = await Games.create(gamesData);

//       // Platforms
//       const platformsSet = new Set();
//       if (gameData.platforms) {
//         const platforms = gameData.platforms;
//         if (platforms.windows) platformsSet.add('windows');
//         if (platforms.mac) platformsSet.add('mac');
//         if (platforms.linux) platformsSet.add('linux');
//       }

//       for (const platform of platformsSet) {
//         const platformLowerCase = platform.toLowerCase();
//         const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platformLowerCase } });
//         await games[0].addPlatforms(relationPlatforms[0]);
//       }

//       // Genres
//       const genresSet = new Set();
//       if (gameData.genres) {
//         const genres = gameData.genres;
//         genres.map(genre => genresSet.add(genre.description));
//       }

//       for (const genre of genresSet) {
//         const relationGenres = await Genres.findOrCreate({ where: { genre: genre } });
//         await games[0].addGenres(relationGenres[0]);
//       }

//       // Publishers
//       const publishersSet = new Set();
//       if (gameData.publishers) {
//         const publishers = gameData.publishers;
//         publishers.map(publisher => publishersSet.add(publisher));
//       }

//       for (const publisher of publishersSet) {
//         if (publisher !== "") {
//           const relationPublisher = await Publishers.findOrCreate({ where: { publisher: publisher } });
//           await games[0].addPublishers(relationPublisher[0]);
//         }
//       }

//       // Developers
//       const developersSet = new Set();
//       if (gameData.developers) {
//         const developers = gameData.developers;
//         developers.map(developer => developersSet.add(developer));
//       }

//       for (const developer of developersSet) {
//         const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
//         await games[0].addDevelopers(relationDeveloper[0]);
//       }

//       // Supported Languages
//       const languagesSet = new Set();
//       if (gameData.supported_languages) {
//         const languages = gameData.supported_languages.split(', ');
//         languages.map(language => {
//           if (/^[a-zA-Z\s-]+$/.test(language)) {
//             languagesSet.add(language);
//           }
//         });
//       }

//       for (const language of languagesSet) {
//         const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
//         await games[0].addLanguages(relationLanguage[0]);
//       }

//       // Categories
//       const categoriesSet = new Set();
//       if (gameData.categories) {
//         const categories = gameData.categories;
//         categories.map(category => categoriesSet.add(category.description));
//       }

//       for (const category of categoriesSet) {
//         const relationCategory = await Categories.findOrCreate({ where: { category: category } });
//         await games[0].addCategories(relationCategory[0]);
//       }

//       // Images
//       const imagesSet = new Set();
//       if (gameData.screenshots) {
//         const images = gameData.screenshots;
//         images.map(image => imagesSet.add(image.path_full));
//       }

//       for (const image of imagesSet) {
//         const relationImage = await Images.findOrCreate({ where: { image: image } });
//         await games[0].addImages(relationImage[0]);
//       }

//       // Videos
//       const videoSet = new Set();
//       if (gameData.movies) {
//         const videos = gameData.movies;
//         videos.map(video => videoSet.add(video.mp4["480"]));
//       }

//       for (const video of videoSet) {
//         const relationVideo = await Videos.findOrCreate({ where: { video: video } });
//         await games[0].addVideos(relationVideo[0]);
//       }
//     }
//     return res.status(200).json("Juegos guardados");
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = saveGames;


// const axios = require('axios');
// const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories, Videos, Images } = require('../db.js');
// require('dotenv').config();
// const { URL } = process.env;
// const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

// const saveGames = async (req, res) => {
//   try {
//     const { data: appList } = await axios.get(URL);
//     const idGames = appList.applist.apps.filter(app => app.name.length > 0); 

//     let i = idGames.length - 1;
//     let gamesSaved = 0;

//     do {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const { data } = await axios.get(`${gameUrl}${idGames[i].appid}`);
//       const info = data[idGames[i].appid.toString()].data;
//       if (info ) {
//         const existingGame = await Games.findOne({ where: { name: info.name } });
//         if (existingGame) {
//           continue;
//         }
        
//         const newGame = {
//           id: info.steam_appid,
//           name: info.name || 'Unknown',
//           type: info.type || 'Unknown',
//           required_age: info.required_age || 0,
//           is_free: info.is_free,
//           detailed_description: info.detailed_description || 'No description available',
//           release_date: info.release_date.date,
//           coming_soon: info.release_date.coming_soon,
//           currency: info.price_overview ? info.price_overview.currency : 'the currency does not exist',
//           price_overview: info.price_overview ? info.price_overview.final_formatted : "Free",
//           capsule_image: info.capsule_image,
//           header_image: info.header_image,
//           controller_support: info.controller_support? info.controller_support: null,
//           ban: false,
//           pc_requirements: info.pc_requirements || 'No requirements available',
//         };

//         const game = await Games.create(newGame);

//         const platformsSet = new Set();

//         if (info && info.platforms) {
//           const platforms = info.platforms;
//           if (platforms.windows) platformsSet.add('windows');
//           if (platforms.mac) platformsSet.add('mac');
//           if (platforms.linux) platformsSet.add('linux');
//         }
        
//         for (const platform of platformsSet) {
//           const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platform } });
//           await game.addPlatforms(relationPlatforms[0]);
//         }
        
//         const genresSet = new Set();
        
//         if (info && info.genres) {
//           const genres = info.genres;
//           genres.map(genre => genresSet.add(genre.description));
//         }
        
//         for (const genre of genresSet) {
//           const relationGenres = await Genres.findOrCreate({ where: { genre: genre } });
//           await game.addGenres(relationGenres[0]);
//         }
        
//         const publishersSet = new Set();
        
//         if (info && info.publishers) {
//           const publishers = info.publishers;
//           publishers.map(publisher => publishersSet.add(publisher));
//         }
        
//         for (const publisher of publishersSet) {
//           if(publisher !== ""){
//           const relationPublisher = await Publishers.findOrCreate({ where: { publisher: publisher } });
//           await game.addPublishers(relationPublisher[0]);
//           }
//         }
        
//         const developersSet = new Set();
        
//         if (info && info.developers) {
//           const developers = info.developers;
//           developers.map(developer => developersSet.add(developer));
//         }
        
//         for (const developer of developersSet) {
//           const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
//           await game.addDevelopers(relationDeveloper[0]);
//         }
        
//         const languagesSet = new Set();
        
//         if (info && info.supported_languages) {
//           const languages = info.supported_languages.split(', ');
//           languages.map(language => { if (/^[a-zA-Z\s-]+$/.test(language)) { languagesSet.add(language);
//             }
//           });
//         }
        
//         for (const language of languagesSet) {
//           const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
//           await game.addLanguages(relationLanguage[0]);
//         }
        
//         const categoriesSet = new Set();
        
//         if (info && info.categories) {
//           const categories = info.categories;
//           categories.map(category => categoriesSet.add(category.description));
//         }
        
//         for (const category of categoriesSet) {
//           const relationCategory = await Categories.findOrCreate({ where: { category: category } });
//           await game.addCategories(relationCategory[0]);
//         }

//         const imagesSet = new Set()

//         if(info && info.screenshots) {
//           const images = info.screenshots;
//           images.map(images => imagesSet.add(images.path_full))
//         }

//         for(const image of imagesSet) {
//           const relationImage = await Images.findOrCreate({where: { image: image}})
//           await game.addImages(relationImage[0])
//         }
        
//         const videoSet = new Set()

//         if(info && info.movies) {
//           const videos = info.movies;
//           videos.map(video => videoSet.add(video.mp4["480"]))
//         }

//         for(const video of videoSet) {
//           const relationVideo = await Videos.findOrCreate({where: { video: video}})
//           await game.addVideos(relationVideo[0])
//         }

//         gamesSaved++;
//       }

//       // Incrementar el contador
//       i--;
//     } while (gamesSaved <= 20);

//     return res.status(200).json("¡Juegos guardados exitosamente!");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = saveGames;

// const axios = require('axios');
// const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories, Videos, Images } = require('../db.js');
// require('dotenv').config();
// const { URL } = process.env;
// const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

// const saveGames = async (req, res) => {
//   try {
//     const { data: appList } = await axios.get(URL);
//     const idGames = appList.applist.apps.filter(app => app.name.length > 0); 

//     // let i = idGames.length - 1;;
//     // let gamesSaved = 0;
// let i = 0
// let gamesSaved = 0

//     do {
//       // await new Promise(resolve => setTimeout(resolve, 1000));
//       const { data } = await axios.get(`${gameUrl}${idGames[i].appid}`);
//       const info = data[idGames[i].appid.toString()].data;
//       if (info ) {
//         const existingGame = await Games.findOne({ where: { name: info.name } });
//         if (existingGame) {
//           continue;
//         }
        
//         const newGame = {
//           id: info.steam_appid,
//           name: info.name || 'Unknown',
//           type: info.type || 'Unknown',
//           required_age: info.required_age || 0,
//           is_free: info.is_free,
//           detailed_description: info.detailed_description || 'No description available',
//           release_date: info.release_date.date,
//           coming_soon: info.release_date.coming_soon,
//           currency: info.price_overview ? info.price_overview.currency : 'the currency does not exist',
//           price_overview: info.price_overview ? info.price_overview.final_formatted : "Free",
//           capsule_image: info.capsule_image,
//           header_image: info.header_image,
//           controller_support: info.controller_support? info.controller_support: null,
//           ban: false,
//           pc_requirements: info.pc_requirements || 'No requirements available',
//         };

//         const game = await Games.create(newGame);

//         const platformsSet = new Set();

//         if (info && info.platforms) {
//           const platforms = info.platforms;
//           if (platforms.windows) platformsSet.add('windows');
//           if (platforms.mac) platformsSet.add('mac');
//           if (platforms.linux) platformsSet.add('linux');
//         }
        
//         for (const platform of platformsSet) {
//           const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platform } });
//           await game.addPlatforms(relationPlatforms[0]);
//         }
        
//         const genresSet = new Set();
        
//         if (info && info.genres) {
//           const genres = info.genres;
//           genres.map(genre => genresSet.add(genre.description));
//         }
        
//         for (const genre of genresSet) {
//           const relationGenres = await Genres.findOrCreate({ where: { genre: genre } });
//           await game.addGenres(relationGenres[0]);
//         }
        
//         const publishersSet = new Set();
        
//         if (info && info.publishers) {
//           const publishers = info.publishers;
//           publishers.map(publisher => publishersSet.add(publisher));
//         }
        
//         for (const publisher of publishersSet) {
//           if(publisher !== ""){
//           const relationPublisher = await Publishers.findOrCreate({ where: { publisher: publisher } });
//           await game.addPublishers(relationPublisher[0]);
//           }
//         }
        
//         const developersSet = new Set();
        
//         if (info && info.developers) {
//           const developers = info.developers;
//           developers.map(developer => developersSet.add(developer));
//         }
        
//         for (const developer of developersSet) {
//           const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
//           await game.addDevelopers(relationDeveloper[0]);
//         }
        
//         const languagesSet = new Set();
        
//         if (info && info.supported_languages) {
//           const languages = info.supported_languages.split(', ');
//           languages.map(language => { if (/^[a-zA-Z\s-]+$/.test(language)) { languagesSet.add(language);
//             }
//           });
//         }
        
//         for (const language of languagesSet) {
//           const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
//           await game.addLanguages(relationLanguage[0]);
//         }
        
//         const categoriesSet = new Set();
        
//         if (info && info.categories) {
//           const categories = info.categories;
//           categories.map(category => categoriesSet.add(category.description));
//         }
        
//         for (const category of categoriesSet) {
//           const relationCategory = await Categories.findOrCreate({ where: { category: category } });
//           await game.addCategories(relationCategory[0]);
//         }

//         const imagesSet = new Set()

//         if(info && info.screenshots) {
//           const images = info.screenshots;
//           images.map(images => imagesSet.add(images.path_full))
//         }

//         for(const image of imagesSet) {
//           const relationImage = await Images.findOrCreate({where: { image: image}})
//           await game.addImages(relationImage[0])
//         }
        
//         const videoSet = new Set()

//         if(info && info.movies) {
//           const videos = info.movies;
//           videos.map(video => videoSet.add(video.mp4["480"]))
//         }

//         for(const video of videoSet) {
//           const relationVideo = await Videos.findOrCreate({where: { video: video}})
//           await game.addVideos(relationVideo[0])
//         }

//         gamesSaved++;
//       }

//       // Incrementar el contador
//       i++;
//     } while (gamesSaved <= 20);

//     return res.status(200).json("¡Juegos guardados exitosamente!");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = saveGames;


const axios = require('axios');
const { Games, Platforms, Genres, Publishers, Developers, Languages, Categories, Images, Videos } = require('../db.js');
require('dotenv').config();
const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

const saveGames = async (req, res) => {
  try {
    //[105450, 1017900, 813780, 209000, 208650, 200260, 35140, 1817070, 1817190]
    const gameIds = [2231770];
    const gamesData = [];

    for (const gameId of gameIds) {
      const response = await axios.get(`${gameUrl}${gameId}`);
      const gameData = response.data[gameId].data;

      const gameDb = {
        id: gameData.steam_appid,
        name: gameData.name,
        type: gameData.type || 'Unknown',
        required_age: gameData.required_age || 0,
        is_free: gameData.is_free,
        detailed_description: gameData.detailed_description || 'No description available',
        release_date: gameData.release_date.date,
        coming_soon: gameData.release_date.coming_soon,
        currency: gameData.price_overview ? gameData.price_overview.currency : 'the currency does not exist',
        price_overview: gameData.price_overview ? gameData.price_overview.final_formatted : "Free",
        capsule_image: gameData.capsule_image,
        header_image: gameData.header_image,
        controller_support: gameData.controller_support ? gameData.controller_support : null,
        ban: false,
        pc_requirements: gameData.pc_requirements || 'No requirements available',
        discounted: false,
        discount_percent: 0
      };

      gamesData.push(gameDb);

      const games = await Games.bulkCreate(gamesData);

      // Platforms
      const platformsSet = new Set();
      if (gameData.platforms) {
        const platforms = gameData.platforms;
        if (platforms.windows) platformsSet.add('windows');
        if (platforms.mac) platformsSet.add('mac');
        if (platforms.linux) platformsSet.add('linux');
      }

      for (const platform of platformsSet) {
        const platformLowerCase = platform.toLowerCase();
        const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platformLowerCase } });
        await games[0].addPlatforms(relationPlatforms[0]);
      }

      // Genres
      const genresSet = new Set();
      if (gameData.genres) {
        const genres = gameData.genres;
        genres.map(genre => genresSet.add(genre.description));
      }

      for (const genre of genresSet) {
        const relationGenres = await Genres.findOrCreate({ where: { genre: genre } });
        await games[0].addGenres(relationGenres[0]);
      }

      // Publishers
      const publishersSet = new Set();
      if (gameData.publishers) {
        const publishers = gameData.publishers;
        publishers.map(publisher => publishersSet.add(publisher));
      }

      for (const publisher of publishersSet) {
        if (publisher !== "") {
          const relationPublisher = await Publishers.findOrCreate({ where: { publisher: publisher } });
          await games[0].addPublishers(relationPublisher[0]);
        }
      }

      // Developers
      const developersSet = new Set();
      if (gameData.developers) {
        const developers = gameData.developers;
        developers.map(developer => developersSet.add(developer));
      }

      for (const developer of developersSet) {
        const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
        await games[0].addDevelopers(relationDeveloper[0]);
      }

      // Supported Languages
      const languagesSet = new Set();
      if (gameData.supported_languages) {
        const languages = gameData.supported_languages.split(', ');
        languages.map(language => {
          if (/^[a-zA-Z\s-]+$/.test(language)) {
            languagesSet.add(language);
          }
        });
      }

      for (const language of languagesSet) {
        const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
        await games[0].addLanguages(relationLanguage[0]);
      }

      // Categories
      const categoriesSet = new Set();
      if (gameData.categories) {
        const categories = gameData.categories;
        categories.map(category => categoriesSet.add(category.description));
      }

      for (const category of categoriesSet) {
        const relationCategory = await Categories.findOrCreate({ where: { category: category } });
        await games[0].addCategories(relationCategory[0]);
      }

      // Images
      const imagesSet = new Set();
      if (gameData.screenshots) {
        const images = gameData.screenshots;
        images.map(image => imagesSet.add(image.path_full));
      }

      for (const image of imagesSet) {
        const relationImage = await Images.findOrCreate({ where: { image: image } });
        await games[0].addImages(relationImage[0]);
      }

      // Videos
      const videoSet = new Set();
      if (gameData.movies) {
        const videos = gameData.movies;
        videos.map(video => videoSet.add(video.mp4["480"]));
      }

      for (const video of videoSet) {
        const relationVideo = await Videos.findOrCreate({ where: { video: video } });
        await games[0].addVideos(relationVideo[0]);
      }
    }
    return res.status(200).json("Juegos guardados");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = saveGames;